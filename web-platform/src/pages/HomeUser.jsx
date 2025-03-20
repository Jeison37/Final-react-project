import axios from "axios";
import {  useEffect, useRef, useState } from "react";
import { getCookie } from "../utils/cookie";
import Ticket from "../components/Ticket";

const HomeUser = () => {
  const ticketLoader = useRef(null);
  const [tickets, setTickets] = useState({});
  const API_URL = "http://localhost:3000/api/tickets/main";
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [likes, setLikes] = useState({});
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = getCookie("token");
  const [observerVar, setObserverVar] = useState(null)

  const fecthTickets = async (page) => {
    try {
      const response = await axios.post(
        API_URL,
        { page },
        {
          headers: {
            authorization: token,
          },
        }
      );
      // console.log("response.data :>> ", response.data);
      if (response.status === 200) {
        setTickets(response.data);
        setChildren(
          response.data.docs.map( ticket => {
            if (ticket.visibilidad){
              const newLikes = response.data.docs.reduce((acc, ticket) => {
                if (ticket.visibilidad && ticket.likesCount !== undefined) {
                  acc[ticket._id] = {
                    count: ticket.likesCount,
                    liked: ticket.userLiked,
                  };
                }
                return acc;
              }, {});
        
              setLikes(newLikes);
              
              return ticket};
          })
        );
        // console.log('Hola desde response de tickets :>> ', );
        // tickets.docs && console.log('tickets :>> ', tickets);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTickets = async (page) => {
    try {
      const response = await axios.post(API_URL, { page }, { headers: { authorization: token } });
  
      if (response.status === 200) {
        const newLikes = response.data.docs.reduce((acc, ticket) => {
          if (ticket.visibilidad && ticket.likesCount !== undefined) {
            acc[ticket._id] = {
              count: ticket.likesCount,
              liked: ticket.userLiked,
            };
          }
          return acc;
        }, {});
  
        setLikes(prev => ({ ...prev, ...newLikes }));
        
        const newTickets = response.data.docs
          .filter(ticket => ticket.visibilidad)
          .map(ticket => ticket);
  
        setChildren(prev => [...prev, ...newTickets]);
        setCurrentPage(prev => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyVisibility = async entries => {
    const entry = entries[0];
    // console.log('entry.isIntersecting, isLoading, children.length :>> ', entry.isIntersecting, isLoading, children.length);
    if (entry.isIntersecting && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        // console.log('desde el verify currentPage :>> ', currentPage);
        addTickets(currentPage + 1);
        setIsLoading(false);
      }, 1500);
    }
  };

  useEffect(() => {

    fecthTickets(currentPage);
  }, [])

// MARK: SET-OBSERVER
  useEffect(
    ()=>{
      // console.log('observer currentPage :>> ',  currentPage, children, observerVar);
      const observer = new IntersectionObserver(verifyVisibility);

      if (ticketLoader.current) observer.observe(ticketLoader.current)

      if (children.length > 0) {
        // console.log("Mayor que 0");

        setObserverVar( prevObserver =>{
          // console.log('prevObserver :>> ', prevObserver);
          prevObserver.unobserve(ticketLoader.current)

          return observer

          }
        )


        
      } else{
        // console.log("Set observer");
        setObserverVar(observer)

      }

      return () => {
        // console.log("Hello");
        // observerVar.unobserve(ticketLoader.current); 
       };
 

      // console.log('testing currentPage :>> ', currentPage, children);
    },[children]
  )

  // useEffect(() => {
  //   if (tickets.docs) {
  //     const newLikes = {};
  //     tickets.docs.forEach((ticket) => {
  //       if (ticket.likesCount !== undefined) {
  //         newLikes[ticket._id] = {
  //           count: ticket.likesCount,
  //           liked: ticket.userLiked,
  //         };
  //       }
  //     });
  //     setLikes(newLikes);
  //   }
  // }, [tickets]);

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
        // console.log('likes :>> ', likes);
        // Like realizado
        setLikes((prevLikes) => {
          return {
          ...prevLikes,
          [ticketId]: {
            count:
              (prevLikes[ticketId]?.count ||
                children.find((t) => t._id === ticketId).likesCount) + 1,
            liked: true,
          }
        }
        });
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

  return (
    <>
      <div className="min-h-screen w-full text-white">
        <div className="py-9">
          <h1 className="text-4xl font-bold text-center">Tickets <button onClick={() => console.log(children)}>Child</button></h1>
        </div>
        <div className="md:px-20 px-5 gap-y-10 flex flex-col items-center w-full">
          {children &&
            children.map((ticket) => {
              // console.log('likes :>> ', likes);
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

            {/* { children && children} */}



          <div ref={ticketLoader} className={"ticket max-w-[900px]  shadow p-4  w-full "  + (children.length === 0 && " hidden") } >

          <div className={"animate-pulse flex space-x-4"}>
            <div className="rounded-full bg-slate-800 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-800 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-800 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-800 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-800 rounded"></div>
              </div>
            </div>
          </div>
          </div>


          {/* {tickets.docs && (
            <Pages
              totalPages={tickets.totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
              setCurrentPage={setCurrentPage}
            />
          )} */}
        </div>
      </div>
    </>
  );
};

export default HomeUser;
