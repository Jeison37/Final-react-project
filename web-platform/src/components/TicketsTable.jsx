import axios from "axios";
import { useEffect, useState } from "react";
import { CONST } from "../utils/constants";
import { getCookie } from "../utils/cookie";
import Pages from "./Pages";
import { Link } from "react-router-dom";

const TicketsTable = ({url}) => {
    const [refresh, setRefresh] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [likes, setLikes] = useState({});
    const [tickets, setTickets] = useState({});
    const token = getCookie("token");
    const rol = getCookie("rol");



    useEffect(() => {
        const fecthTickets = async () => {
          try {
            const response = await axios.post(
              url,
              { page: currentPage },
              {
                headers: {
                  authorization: token,
                },
              }
            );
            // console.log("response.data :>> ", response.data);
            if (response.status === 200) {
              setTickets(response.data);
            }
          } catch (error) {
            console.log(error);
          }
        };
        fecthTickets();
      }, [refresh]);
    
      useEffect(() => {
        if (tickets.docs) {
          const newLikes = {};
          tickets.docs.forEach((ticket) => {
            if (ticket.likesCount !== undefined) {
              newLikes[ticket._id] = {
                count: ticket.likesCount,
                liked: ticket.userLiked,
              };
            }
          });
          setLikes(newLikes);
        }
      }, [tickets]);
    
      const toggleLike = async (ticketId) => {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/likes-ticket/",
            { id_ticket: ticketId },
            {
              headers: {
                authorization: token,
              },
            }
          );
    
          if (response.status === 200) {
            // Dislike realizado
            setLikes((prevLikes) => {
              const newLikes = { ...prevLikes };
              newLikes[ticketId] = {
                ...newLikes[ticketId],
                count: newLikes[ticketId].count - 1,
                liked: false,
              };
              return newLikes;
            });
          }
    
          if (response.status === 201) {
            // Like realizado
            setLikes((prevLikes) => ({
              ...prevLikes,
              [ticketId]: {
                count:
                  (prevLikes[ticketId]?.count ||
                    tickets.docs.find((t) => t._id === ticketId).likesCount) + 1,
                liked: true,
              },
            }));
          }
        } catch (error) {
          console.log("error :>> ", error);
        }
      };
    
      const changeStatus = async (ticketId, estado) => {
    
        try {
          const response = await axios.put(
            "http://localhost:3000/api/tickets/status",
            { id_ticket: ticketId , estado},
            {
              headers: {
                authorization: token,
              },
            }
          );
    
          if (response.status === 200) {
            setRefresh(!refresh);
    
          }
    
        } catch (error) {
          console.log("error :>> ", error);
        }
      };
    
      const assignTechnician = async (ticketId) => {
        console.log('hola :>> ', );
        try {
          const response = await axios.put(
            "http://localhost:3000/api/tickets/assign",
            { id_ticket: ticketId },
            {
              headers: {
                authorization: token,
              },
            }
          );
    
          if (response.status === 200) {
            setRefresh(!refresh);
    
          }
    
        } catch (error) {
          console.log("error :>> ", error);
        }
      };
    
      const onPageChange = (page) => {
        console.log(page);
    
        setRefresh(!refresh);
      };

    return ( 
        <>

<div className="flex flex-col items-center w-full">
          <div className="w-4/5 pt-1  bg-[#1b3d5a] rounded-lg shadow-2xl shadow-blue-950">
            <table className="size-full">
              <thead>
                <tr className="h-10 border-[#E7E7E7] border-b border-solid">
                  <th className="w-32 ">Estado</th>
                  <th>Título</th>
                  <th>Técnico</th>
                  <th>Informante</th>
                </tr>
              </thead>

              <tbody className="tbody-tickets text-center">
                {tickets.docs &&
                  likes &&
                  tickets.docs.map((ticket) => {
                    const estado = CONST.ESTADOS[ticket.estado];
                    if (ticket.visibilidad)
                      return (
                        <>
                          <tr key={ticket._id} className="h-12 px-2">
                            <td className="">
                              <div
                                className={
                                  "text-black font-bold px-2 w-fit rounded-lg mx-auto" +
                                  (estado === "Resuelto"
                                    ? " resuelto"
                                    : " pendiente")
                                }
                              >
                                {estado}
                              </div>
                            </td>
                            <td>{ticket.titulo}</td>
                            <td>{ticket.id_tecnico?.username}</td>
                            <td>{ticket.id_usuario.username} </td>
                          </tr>
                          <tr key={"1" + ticket._id} className="actions">
                            <td colSpan="4">
                              <div className="flex gap-x-4 px-5 py-1">
                                <button
                                  onClick={() => toggleLike(ticket._id)}
                                  className={
                                    "flex items-center" +
                                    (likes[ticket._id]?.liked
                                      ? " text-green-600"
                                      : " text-white")
                                  }
                                >
                                  {likes && likes[ticket._id]?.count}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 pb-1 w-6 "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="16 17 12 13 8 17" />
                                  </svg>
                                </button>
                                <Link to={`/ticket/${ticket._id}`}>
                                  <span>
                                    {ticket.commentsCount} Comentarios
                                  </span>
                                </Link>

                                {(rol == CONST.ROL.TECHNICAL) && (
                                  <>
                                    <button onClick={() => changeStatus(ticket._id, estado === "Resuelto"
                                    ? 0
                                    : 1)} className="">Cambiar estado</button>
                                    <button onClick={() => assignTechnician(ticket._id)} className="">Asignarse</button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                  })}
              </tbody>
            </table>
          </div>

          {tickets.docs && (
            <Pages
              totalPages={tickets.totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
        
        </>
     );
}
 
export default TicketsTable;