import React, { useEffect, useState } from "react";
import styles from "./LiveChatModal.module.css";
import ReactDOM from "react-dom";
import TopBar from "../TopBar/TopBar";
import ChatText from "../ChatText/ChatText";
import ChatInput from "../ChatInput/ChatInput";
import { v4 as uuidv4 } from "uuid";
import openSocket from "socket.io-client";
import { socket } from "../../../socket";

function LiveChatModal(props) {
  const [chatsText, setChatsText] = useState([]);
  useEffect(() => {
    function getMessageFromServer(value) {
      const roomId = localStorage.getItem("roomId") || null;
      if (roomId && roomId === value.roomId) {
        if (value.type === "end") {
          setChatsText((prev) => {
            const updatedList = [...prev];
            updatedList.push({ from: "end" });
            return updatedList;
          });
          localStorage.removeItem("roomId");
        } else {
          setChatsText((prev) => {
            const updatedList = [...prev];
            updatedList.push(value.message);
            return updatedList;
          });
        }
      }
    }
    socket.on("chat", getMessageFromServer);

    return () => {
      socket.off("chat", getMessageFromServer);
    };
  }, []);

  const handleSubmitChat = (message) => {
    const socket = openSocket("http://localhost:5000");
    const roomChatId = localStorage.getItem("roomId");
    let objMess;
    if (roomChatId) {
      if (message === "/end") {
        objMess = {
          type: "end",
          roomId: roomChatId,
        };
      } else {
        objMess = {
          type: "update",
          roomId: roomChatId,
          message: { from: "client", text: message },
        };
      }
    } else {
      const newId = uuidv4();
      localStorage.setItem("roomId", newId);
      objMess = {
        type: "new",
        roomId: newId,
        message: { from: "client", text: message },
      };
    }

    socket.emit("chat", objMess);
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <ChatText chatsText={chatsText} />
      <div className={`${styles["chat-input"]}`}>
        <ChatInput onSubmitChat={handleSubmitChat} />
      </div>
    </div>
  );
}

function ModalLiveChatContainer(props) {
  return ReactDOM.createPortal(
    <LiveChatModal />,
    document.getElementById("root-modal")
  );
}

export default ModalLiveChatContainer;
