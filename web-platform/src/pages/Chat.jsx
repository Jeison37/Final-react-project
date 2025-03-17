import { useRef, useState, useEffect } from "react";
import { CONST } from "../utils/constants";
import axios from "axios";
import { getCookie } from "../utils/cookie";

const Chat = () => {
  const socket = useRef(null);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const token = getCookie("token");

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:8080');

    socket.current.addEventListener("message", ({ data }) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  const createChat = async e  =>  {
    console.log("Creando");
    const res = await axios.post("http://localhost:3000/api/chats", {},
      {
        headers: {
          authorization: token,
        },
      }
    )
    console.log('res :>> ', res);
    const data = {type: CONST.WS.CREATE_CHAT, id_chat: res.data._id}
    socket.current.send(JSON.stringify(data));

  }

  const addTechnician = async e  =>  {
    const res = await axios.put("http://localhost:3000/api/chats")
    socket.current = new WebSocket('ws://localhost:8080');
    const data = {type: CONST.WS.CREATE_CHAT, id_chat: res.data._id}
    socket.current.send(JSON.stringify(data));

  }

  function sendMessage(e) {
    e.preventDefault();
    if (inputRef.current.value) {
      socket.current.send(inputRef.current.value);
      inputRef.current.value = "";
    }
    inputRef.current.focus();
  }

  return (
    <>
      <div className=" w-full text-white">
        {/* <form onSubmit={sendMessage}>
          <input
            ref={inputRef}
            className="text-black"
            type="text"
            placeholder="Your message"
          />
          <button>Send</button>
        </form>
        <ul id="l">
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul> */}



        <button className="px-2" onClick={createChat}>
          Solicitar chat en vivo
        </button>
      </div>
    </>
  );
};

export default Chat;