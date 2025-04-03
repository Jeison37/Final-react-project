// pages/Chat.jsx
import { useContext, useEffect, useRef, useState } from "react";
import { WebSocketContext } from "../context/WebSocketContext";
import { CONST } from '../utils/constants';
import axios from "axios";
import { getCookie } from "../utils/cookie";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";

const Chat = () => {
  const { socket, isReady } = useContext(WebSocketContext);
  const [chat, setChat] = useState("");
  const token = getCookie("token");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log("Recargo");
    return console.log("Destruido");
  }, [] );

  useEffect(() => {
    if (isReady && socket) {
      const handleMessage = ({ data }) => {
        console.log('data :>> ', data);
        const mes = JSON.parse(data)

        if (mes.type === CONST.WS.TECHNICIAN_CONNECTED){

          navigate("/chat/space")

        }

      };

      socket.addEventListener("message", handleMessage);

      return () => {
        socket.removeEventListener("message", handleMessage);

        try {
          //  axios.delete("http://localhost:3000/api/chats",
          //   {id: chat},
          //   {
          //     headers: {
          //       authorization: token,
          //     },
          //   }
          // )
          // console.log('res :>> ', res);
        } catch (error) {
          console.log('error :>> ', error);
        }
        console.log("adios");
      };
    }
  }, [isReady, socket]);

  const createChat = async e  =>  {
    console.log("Creando");
    try {
      setIsLoading(true)
      const res = await axios.post("http://localhost:3000/api/chats", {},
        {
          headers: {
            authorization: token,
          },
        }
      )
      console.log('res :>> ', res);
      sessionStorage.setItem("id_chat", res.data._id);
      setChat(res.data._id)
      const data = {type: CONST.WS.CREATE_CHAT, id_chat: res.data._id, token}
      socket.send(JSON.stringify(data));

    } catch (error) {
      setIsLoading(false)
      console.log('error :>> ', error);
    }
  }

  const addTechnician = async e  =>  {
    console.log('token :>> ', token);
    const res = await axios.put("http://localhost:3000/api/chats")
    const data = {type: CONST.WS.CREATE_CHAT, id_chat: res.data._id, token}
    socket.current.send(JSON.stringify(data));

  }


  if (!isReady) {
    return     <div className="flex flex-1 items-center justify-center h-full w-full">

    <div className="">
      <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

  </div>;
  }

  return (
    <div className="flex flex-1 items-center justify-center h-full w-full text-white">

      <div className="flex gap-y-4 flex-col items-center">
        <Spinner isLoading={isLoading}>
          <button className="gradient-gb py-2 px-6 rounded-full" onClick={createChat}>Solicitar chat</button>
        </Spinner>

        {isLoading && (
          <>
            <div className="span">Espere a que un tecnico atienda su solicitud</div>
          </>
        )}
      </div>
      
    </div>
  );
};

export default Chat;