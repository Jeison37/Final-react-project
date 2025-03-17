import { useEffect, useRef } from "react";

export const useWebSocket = onMessage => {
    const socket = useRef(null);

    useEffect(() => {
        socket.current = new WebSocket("ws://localhost:8080");
        
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            onMessage(message);
        };

        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, [onMessage]);

    return socket;
};