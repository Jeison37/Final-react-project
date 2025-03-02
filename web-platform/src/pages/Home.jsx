import axios from "axios";
import { useEffect, useState } from "react";
import { CONSTANTS } from "../utils/constants";

const Home = () => {
    const [tickets, setTickets] = useState([]);
    const API_URL = "http://localhost:3000/api/tickets/main";
    // eslint-disable-next-line no-unused-vars
    const [refresh, setRefresh] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(()=>{
        const fecthTickets = async()=>{
          try{
            const response = await axios.get(API_URL,
              {
                headers:{
                  'authorization': token
                }
              }
            );
            if( response.status === 200){
              setTickets(response.data.docs);
            }
          }catch(error){
            console.log(error)
          }
        };
        fecthTickets()
      },[refresh]) 

    return ( 
        <>
      <div className="min-h-screen w-full text-white">

      <div className="py-9">

        <h1 className="text-4xl font-bold text-center">Tickets</h1>

      </div>
      
        <table className="size-full">
            <thead>
                <tr>
                    <th>Estado</th>
                    <th>Título</th>
                    <th>Técnico</th>
                    <th>Informante</th>
                </tr>
            </thead>
            
            <tbody>

{ tickets && tickets.map(ticket => {

  const estado = CONSTANTS.ESTADOS[ticket.estado]
    
    if (ticket.visibilidad) return (

                <tr key={ticket._id}>
                    <td>{estado}</td>
                    <td>{ticket.titulo}</td>
                    <td>{ticket.id_tecnico && ticket.id_tecnico.nombre + " " + ticket.id_tecnico.apellido}</td>
                    <td>{ticket.id_usuario.nombre + " " + ticket.id_usuario.apellido} </td>
                </tr>

    ) }
  )}

            </tbody>

          </table>
        
      </div>
        
        </>
     );
}
 
export default Home;