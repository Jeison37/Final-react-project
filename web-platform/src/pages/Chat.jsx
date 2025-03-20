// pages/Chat.jsx
import { useContext, useEffect, useRef, useState } from "react";
import { WebSocketContext } from "../context/WebSocketContext";

const Chat = () => {
  const { socket, isReady } = useContext(WebSocketContext);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isReady && socket) {
      const handleMessage = ({ data }) => {
        setMessages(prev => [...prev, data]);
      };

      socket.addEventListener("message", handleMessage);

      return () => {
        socket.removeEventListener("message", handleMessage);
      };
    }
  }, [isReady, socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputRef.current.value && isReady && socket) {
      socket.send(inputRef.current.value);
      inputRef.current.value = "";
    }
    inputRef.current.focus();
  };

  const createChat = async e  =>  {
    console.log("Creando");
    const res = await axios.post("http://localhost:3000/api/chats", {},
      {
        headers: {
          authorization: token,
        },
      }
    )
  }

  const addTechnician = async e  =>  {
    const res = await axios.put("http://localhost:3000/api/chats")
    const data = {type: CONST.WS.CREATE_CHAT, id_chat: res.data._id}
    socket.current.send(JSON.stringify(data));

  }


  if (!isReady) {
    return <div>Conectando al chat...</div>;
  }

  return (
    <div className="w-full text-white">
      <form onSubmit={sendMessage}>
        <input
          ref={inputRef}
          className="text-black"
          type="text"
          placeholder="Escribe un mensaje"
        />
        <button>Enviar</button>
      </form>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;