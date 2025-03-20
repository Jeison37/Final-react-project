// context/WebSocketContext.jsx
import { createContext, useRef, useEffect, useState } from "react";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const socket = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (!socket.current || socket.current.readyState === WebSocket.CLOSED) {
      const ws = new WebSocket('ws://localhost:8080');

      ws.onopen = () => {
        console.log('Conexión WebSocket establecida');
        socket.current = ws;
        setIsReady(true);
      };

      ws.onerror = (error) => {
        console.error('Error en WebSocket:', error);
        setIsReady(false);

        setTimeout(() => setRetry(prev => prev + 1), 3000);
      };

      ws.onclose = () => {
        console.log('Conexión WebSocket cerrada');
        setIsReady(false);
      };

      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      };
    }
  }, [retry]);

  return (
    <WebSocketContext.Provider value={{ socket: socket.current, isReady }}>
      {children}
    </WebSocketContext.Provider>
  );
};