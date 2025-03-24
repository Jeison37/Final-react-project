import { useContext, useEffect, useRef, useState } from "react";
import { getCookie } from "../utils/cookie";
import axios from "axios";
import { CONST } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { WebSocketContext } from "../context/WebSocketContext";


const ChatRequests = () => {
  const { socket, isReady } = useContext(WebSocketContext);
  const [refresh, setRefresh] = useState(false);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const token = getCookie("token");

  useEffect(() => {

    if (socket && isReady) {
      
      console.log('socket :>> ', socket);
  
      socket.addEventListener("message", ({ data }) => {
        console.log('data :>> ', data);
        const mes = JSON.parse(data)

        if (mes.type === CONST.WS.TECHNICIAN_CONNECTED){



        }

      });
      
    }

    // return () => {
    //   if (socket.current) {
    //     socket.current.close();
    //   }
    // };
  }, []);

  useEffect(() => {
    const fecthChats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/chats", {
          headers: {
            authorization: token,
          },
        });
        if (res.status === 200) {
          setChats(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecthChats();
  }, [refresh]);

  const addTechnician = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/chats`, {id_chat: id}, {
        headers: {
          authorization: token,
        },
      });
      if (res.status === 200) {

        const data = {type: CONST.WS.TECHNICIAN_CONNECTED, id_chat: res.data._id, token};
        socket.send(JSON.stringify(data));

        setRefresh(!refresh);
        sessionStorage.setItem("id_chat", res.data._id);
        navigate("/chat/space");

      }
    } catch (error) {
      console.log(error);
    }

  };

  const render = () =>{
    if (chats.length > 0) {
      return <>

        <div className="flex flex-col items-center w-full">
          <div className="w-4/5 pt-1  bg-[#1b3d5a] rounded-lg shadow-2xl shadow-blue-950">
            <table className="size-full">
              <thead>
                <tr className="h-10 border-[#E7E7E7] border-b border-solid">
                  <th>Solicitante</th>
                  <th>Email</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="tbody-tickets text-center">

        { chats && chats.map((chat) => {
            const { formattedDate, formattedTime } = formatDate(chat.createdAt);
        
       return (
          <>
          <tr key={chat._id} className="h-10 border-[#E7E7E7] border-b border-solid">
                  <td>{chat.id_usuario.nombre + " " + chat.id_usuario.apellido}</td>
                  <td>{chat.id_usuario.email}</td>
                  <td>{formattedDate}</td>
                  <td>{formattedTime}</td>
                  <td>
                    <button onClick={() => addTechnician(chat._id)}>Unirse</button>
                  </td>
                </tr>
          </>
        )})}

              </tbody>
            </table>
          </div>

        </div>

    </>
    } else {
      return <h3 className="text-xl font-bold text-center">Sin solicitudes de chats actualmente</h3>
      
    }
  }

    return ( 
    <>
      <div className=" w-full text-white">
        <div className="py-9">
          <h1 className="text-4xl font-bold text-center">Solicitudes de chats</h1>
        </div>

        { chats && render() }

      </div>
    </>
     );
}
 
export default ChatRequests;