import environment from "@/config/environment";
import { io } from "socket.io-client";

export const socket = io(environment.SOCKET_URL, {
	autoConnect: true,
	transports: ["websocket"],
});