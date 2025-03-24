// pages/Chat.jsx
import { useContext, useEffect, useRef, useState } from "react";
import { WebSocketContext } from "../context/WebSocketContext";
import axios from "axios";
import { getCookie } from "../utils/cookie";
import { CONST } from "../utils/constants"
import { MessageComponent } from "../components/MessageComponent";
const ChatSpace = () => {
  const { socket, isReady } = useContext(WebSocketContext);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const id_chat = sessionStorage.getItem("id_chat");
  const [chatData, setChatData] = useState(null);
  const token = getCookie("token")
  let userData
  let idu;

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/chats/${id_chat}`, {
          headers: {
            authorization: token,
          },
        });
        if (res.status === 200) {
          setChatData(res.data.chat);
          idu = res.data.idu;
          userData =
            {
              [res.data.chat.id_usuario._id]: res.data.chat.id_usuario,
              [res.data.chat.id_tecnico._id]: res.data.chat.id_tecnico
            }
          
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchChat()
  }, []);

  useEffect(() => {
    if (isReady && socket) {
      const handleMessage = ({ data }) => {
        console.log('data :>> ', data);
        const mes = JSON.parse(data)
        if (mes.type === CONST.WS.MESSAGE){
          const idm = mes.user;

          console.log('userData[mes.user] :>> ', userData[mes.user]);
          console.log('userData[mes.user]?.username :>> ', userData[mes.user]?.username);
          // setMessages(prev => [...prev, mes.text_message + ` de ${userData[mes.user].username}`]);

          const message = (
            <>
            <MessageComponent idm={idm} idu={idu} userData={userData[idm]} content={mes.text_message} />
            </>
          )

          setMessages(prev => [...prev, message]);
          
        }
      };

      socket.addEventListener("message", handleMessage);

      return () => {
        socket.removeEventListener("message", handleMessage);
      };
    }
  }, [isReady, socket]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const id_chat = sessionStorage.getItem("id_chat");
    if (inputRef.current.value && isReady && socket) {
      const data = {type: CONST.WS.MESSAGE, id_chat , text_message: inputRef.current.value, token}
      socket.send(JSON.stringify(data));
      inputRef.current.value = "";
    }
    inputRef.current.focus();
  };


  if (!isReady) {
    return <div>Conectando al chat...</div>;
  }

  const message_row = () => {
    return (
      <>
      
      </>
    )
  }

  const chat_users = () =>{
    return <div className="h-full flex items-center">
      <h1 className="md:text-2xl fixed text-lg text-center w-full">
        Chat en vivo entre el tecnico {chatData.id_tecnico.username} y el usuario {chatData.id_usuario.username}
      </h1>
    </div>
  }

  return (
    <div className="w-full flex flex-1 flex-col text-white">
      <div className="h-16 py-3 bg-slate-800">
        { chatData && chat_users()}
      </div>

      <div className="w-full flex flex-1 flex-col">

        <div className="w-full flex flex-1 flex-col overflow-y-auto">
          <ul>
            {messages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center w-full px-3">

          <form onSubmit={sendMessage} className="w-[1000px] pt-4 max-w-[1000px] ">
            <div className="flex gap-x-2 h-10">
            <textarea
              className=" flex-grow px-2 py-2 rounded-xl resize-none outline-none bg-black"
              ref={inputRef}
              placeholder="Escribe un comentario..."
            ></textarea>
            <button type="submit" className="w-fit rounded-full gradient-gb px-3  py-1 ">
              Enviar 
            </button>

            </div>
          </form>
        </div>

      </div>
    </div>

  );
};

export default ChatSpace;