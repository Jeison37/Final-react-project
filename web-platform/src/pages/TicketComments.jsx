import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../utils/cookie";
import Ticket from "../components/Ticket";
import { formatDate } from "../utils/formatDate";
import { CONST } from "../utils/constants";
import { CommentComponent } from "../components/CommentComponent";

const TicketComments = () => {
  let params = useParams();
  const [ticket, setTicket] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [refresh, setRefresh] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
  const token = getCookie("token");
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/tickets/main/${params.id}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (response.status === 200) {
        setUser(response.data.user);
        console.log('response.data.user :>> ', response.data.user);
          // console.log('response :>> ', response);
          setTicket(response.data.ticket);
          setLiked(response.data.liked);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTicket();
  }, [refresh]);

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

      setLiked(!liked);
      setRefresh(!refresh);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const changeStatus = async (ticketId, estado) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/tickets/status",
        { id_ticket: ticketId, estado },
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


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/comments",
        {
          id_ticket: ticket._id,
          contenido: newComment,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      setNewComment("");
      setRefresh(!refresh);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const render = () => {
    if (!ticket.informante) return null;
    const { formattedDate, formattedTime } = formatDate(ticket.createdAt);
    const estado = CONST.ESTADOS[ticket.estado];
    console.log('user :>> ', user, ticket.id_usuario);
    return (
      <>
        <div className="md:px-20 px-5 pt-20 space-y-6">
          <div className="ticket w-full max-w-[1000px] mx-auto md:text-[16px] text-[12px]">
            <div className="ticket__head">
              <div className=" px-3 py-2 w-full flex justify-between ">
                <div className="user-info flex items-center gap-2 md:gap-5">
                  <div className="size-10 rounded-full flex-shrink-0 overflow-hidden bg-white">
                    <img
                      className="size-full"
                      src={
                        ticket.informante.imagen ??
                        "http://localhost:3000/images/users/profiles/default.webp"
                      }
                      alt=""
                    />
                  </div>
                  <h2 className="text-[#7ED0FF] md:max-w-[160px] max-w-[130px] font-bold username">
                    {ticket.informante.username}
                  </h2>
                  <span className="tag-author bg-[#7ED0FF] sm:text-[16px] text-[10px] px-2 py-1 sm:px-1 sm:py-0.5">Autor</span>
                  <div className="flex flex-col text-[10px] sm:text-sm">
                    <span className="text-gray-400">{formattedDate} </span>
                    <span className="text-gray-400">{formattedTime}</span>
                  </div>
                </div>
                              <button  className={"text-white font-semibold " +  (ticket.id_usuario == user ? "" : "hidden")}
                onClick={() =>
                  sessionStorage.setItem("edit_ticket", JSON.stringify(ticket))
                }
              >
                <Link to={`/ticket/${ticket._id}/update`}>Editar</Link>
              </button>
              </div>
              <div className="w-full flex items-center py-2 px-3">
                <p className="text-white font-semibold text-pretty">
                  <span
                    className={
                      "text-black font-bold px-2 w-fit rounded-lg me-2" +
                      (estado === "Resuelto" ? " resuelto" : " pendiente")
                    }
                  >
                    {estado}
                  </span>
                  {ticket.titulo}
                </p>
              </div>
            </div>
            <div className="ticket__body text-white">
              <div className="py-2 px-4">
                <p className="text-pretty">{ticket.descripcion}</p>
                <div className="py-6">
                  <img src={ticket.imagen} alt="" />
                </div>
              <div className="actions w-full flex justify-between">
                <div className="flex gap-x-4 ps-7 pb-2 text-[14px] font-semibold">
                  <button
                  onClick={() => toggleLike(ticket._id)}
                  className={
                    "flex items-center" + (liked ? " text-green-600" : " text-white")
                  }
                >
                  <span> {ticket.likes.length} </span>
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
                  <span>{ticket.comentarios.length} Comentarios</span>
                </Link></div>
                <div className={ticket.id_usuario == user ? "" : "hidden"}>
                  <button
                    className="text-red-600 font-semibold"
                    onClick={async () => {
                      try {
                        const res = axios.delete(
                          `http://localhost:3000/api/tickets/${ticket._id}`,
                          {
                            headers: {
                              authorization: getCookie("token"),
                            },
                          }
                        );
                        setRefresh(refresh => !refresh);
                      } catch (error) {
                        console.log("error :>> ", error);
                      }
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              </div>
              
            </div>
          </div>
          
          <form onSubmit={handleCommentSubmit} className="max-w-[1000px] mx-auto  ">
            <div className="flex gap-x-2 h-10">
            <textarea
              className=" flex-grow px-2 py-2 rounded-xl resize-none bg-black"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
            ></textarea>
            <button type="submit" className="w-fit rounded-full gradient-gb px-3  py-1 ">
              Enviar 
            </button>

            </div>
          </form>
          <h3>Comentarios:</h3>
          <div className="comments space-y-8 px-0 lg:px-36">
            {ticket.comentarios &&
              ticket.comentarios.map((comment) => (
                <>
                  <CommentComponent key={comment._id} comment={comment} />
                </>
              ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className=" w-full text-white">

        {ticket.informante && render()}
        
      </div>
    </>
  );
};

export default TicketComments;
