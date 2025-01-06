import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
const url = process.env.NEXT_PUBLIC_WEB_URL || 'ws://localhost:5000';

export const initializeSocket = (accessToken: string): Socket => {
  if (!socket) {
    socket = io(url, {
      extraHeaders: {
        authorization: `${accessToken}`,
      },
      reconnectionAttempts: 3, 
      reconnectionDelay: 1000,  
    });

    socket.on("connect", () => {
      console.log("Socket connected successfully", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.log("Connection error:", error);
    });
  }
  return socket;
};


export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected");
  }
};
