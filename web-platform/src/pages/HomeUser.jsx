import axios from "axios";
import { useEffect, useState } from "react";
import { CONST } from "../utils/constants";
import { getCookie } from "../utils/cookie";
import Pages from "../components/Pages";
import { Link } from "react-router-dom";
import Ticket from "../components/Ticket";

const HomeUser = () => {
  const [tickets, setTickets] = useState({});
  const API_URL = "http://localhost:3000/api/tickets/main";
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [likes, setLikes] = useState({});
  const token = getCookie("token");

  useEffect(() => {
    const fecthTickets = async () => {
      try {
        const response = await axios.post(
          API_URL,
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
          // console.log('Hola desde response de tickets :>> ', );
          // tickets.docs && console.log('tickets :>> ', tickets);
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

  const onPageChange = (page) => {
    console.log(page);

    setRefresh(!refresh);
  };

  return (
    <>
      <div className="min-h-screen w-full text-white">
        <div className="py-9">
          <h1 className="text-4xl font-bold text-center">Tickets</h1>
        </div>
        <div className="md:px-20 px-5 gap-y-10 flex flex-col items-center w-full">
          {tickets.docs &&
            tickets.docs.map((ticket) => {
              if (ticket.visibilidad)
                return (
                  <Ticket
                    key={ticket._id}
                    ticket={ticket}
                    toggleLike={toggleLike}
                    changeStatus={changeStatus}
                    assignTechnician={assignTechnician}
                    likes={likes}
                  />
                );
            })}

          {tickets.docs && (
            <Pages
              totalPages={tickets.totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

/* 
const verifyVisibility = entries =>{
    const entry = entries[0];
    console.log(entry.isIntersecting)
}

const observer = new IntersectionObserver(verifyVisibility)

// observer.observe(caja3)
*/

export default HomeUser;
