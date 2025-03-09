import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../utils/cookie";

const TicketComments = () => {
  let params = useParams();
  const [ticket, setTicket] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [refresh, setRefresh] = useState(false);
  const [newComment, setNewComment] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    const fecthTicket = async () => {
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
          setTicket(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecthTicket();
  }, [refresh]);

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

  return (
    <>
      <div className="min-h-screen w-full text-white">
        {ticket && (
          <>
            <h2>TicketComments: {ticket.titulo}</h2>
            <p>Descripción: {ticket.descripcion}</p>
            <p>
              Usuario: {ticket.informante && ticket.informante.username}
            </p>
            <form onSubmit={handleCommentSubmit} className="flex flex-col">
              <textarea
                className="w-44 bg-black"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
              />
              <button type="submit" className="w-fit">
                Enviar comentario
              </button>
            </form>

            {/* {comments.map((comment) => (
              <li key={comment._id}>
                <p>{comment.contenido}</p>
                <p>Usuario: {comment.usuario.nombre}</p>
              </li>
            ))} */}

              {console.log('ticket :>> ', ticket)}
            <h3>Comentarios:</h3>
            <ul>
              {ticket.comentarios &&
                ticket.comentarios.map((comment) => (
                  <div key={comment._id}>
                    
                    <p><span>{comment.usuario.username}: </span>{comment.contenido}</p>
                  </div>
                ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default TicketComments;
