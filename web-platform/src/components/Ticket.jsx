import { Link } from "react-router-dom";
import { CONST } from "../utils/constants";
import { formatDate } from "../utils/formatDate";
import { memo } from "react";

const Ticket = memo(({
  ticket,
  setRefresh,
  likes,
  toggleLike,
  changeStatus,
  assignTechnician,
}) => {

  const estado = CONST.ESTADOS[ticket.estado];
  
  const {formattedDate, formattedTime} = formatDate(ticket.createdAt);

  return (
    <>
      <div className="ticket w-full max-w-[900px] md:text-[16px] text-[12px]">
        <div className="ticket__head">
          <div className=" px-3 py-2 w-full flex justify-between ">
            <div className="user-info flex items-center gap-3 md:gap-5">
              <div className="size-10 rounded-full flex-shrink-0 overflow-hidden bg-white">
              <img
                className="size-full"
                src={
                  ticket.id_usuario.imagen
                    ?? "http://localhost:3000/images/users/profiles/default.webp"
                    
                }
                alt=""
              />
              </div>

              <h2 className="text-[#7ED0FF] md:max-w-[160px] max-w-[110px] font-bold username">
              {ticket.id_usuario.username}
              </h2>

              {/* <span className="tag-author">Autor</span> */}

              <div className="flex flex-col">
                <span className="text-gray-400">{formattedDate} </span>

                <span className="text-gray-400">{formattedTime}</span>
              </div>
            </div>

            <button className="text-white font-semibold">Editar</button>
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
          </div>

          <div className="actions flex gap-x-4 ps-7 pb-2 text-[14px] font-semibold">
            <button
              onClick={() => toggleLike(ticket._id)}
              className={
                "flex items-center" +
                (likes[ticket._id]?.liked ? " text-green-600" : " text-white")
              }
            >
              <span> {likes && likes[ticket._id]?.count} </span>
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
              <span>{ticket.commentsCount} Comentarios</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
)
export default Ticket;
