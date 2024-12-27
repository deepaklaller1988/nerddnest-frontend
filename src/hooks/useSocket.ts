import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const url = process.env.NEXT_PUBLIC_WEB_URL || 'ws://localhost:5000';

const useSocket = ({ options = {} }: { options?: any }): Socket | null => {
    const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
    const socketRef = useRef<Socket | null>(null);  // Ref to persist socket across renders
  const token= typeof window !== "undefined" && localStorage.getItem("accessToken")
    useEffect(() => {
        // Only create socket if it doesn't already exist
        if (!socketRef.current) {
            socketRef.current = io(url, {extraHeaders: {
                authorization:`${token}`
              }})

            socketRef.current.on('connect', () => {
                console.log('Connected to server');
            });

            socketRef.current.on('connect_error', (error: Error) => {
                console.log('Connection Error:', error);
            });

            setSocketInstance(socketRef.current);  // Set the socket instance once
        }

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, []);  // Empty dependency array means effect runs only on mount and unmount

    return socketInstance;  // Return the socket instance
};

export default useSocket;
