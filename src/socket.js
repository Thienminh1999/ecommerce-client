import { io } from "socket.io-client";
import { BASE_URL } from "./stores/variables";
export const socket = io(BASE_URL);
