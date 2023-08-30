import React from "react";
import styles from "./ChatText.module.css";

function ChatText(props) {
  const { chatsText } = props;
  return (
    <div className={`${styles.container}`}>
      {chatsText.length === 0 && <p>Start your chat with supporter</p>}
      {chatsText.length > 0 && (
        <>
          {chatsText.map((objMess, index) => {
            if (objMess.from === "client") {
              return (
                <div key={index} className={styles.guest}>
                  <p>{objMess.text}</p>
                </div>
              );
            } else if (objMess.from === "end") {
              return (
                <div key={index}>
                  <p className={styles.end}>
                    You was ended consultation session
                  </p>
                </div>
              );
            } else {
              return (
                <div key={index} className={styles.admin}>
                  <i className="fa-regular fa-circle-user fa-2xl"></i>
                  <p>{objMess.text}</p>
                </div>
              );
            }
          })}
        </>
      )}
    </div>
  );
}

export default ChatText;
