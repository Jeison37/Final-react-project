import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
    const [tickets, setTickets] = useState([]);
    const API_URL = "http://localhost:3000/api/tickets";
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
              setTickets(response.data);
            }
          }catch(error){
            console.log(error)
          }
        };
        fecthTickets()
      },[refresh]) 

    return ( 
        <>

        { tickets && tickets.map(ticket => {
            
            if (ticket.visibilidad) return (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Estado</th>
                                <th>Título</th>
                                <th>Técnico</th>
                                <th>Informante</th>
                            </tr>
                        </thead>
                        <tr key={ticket.id}>
                            <td>{ticket.estado}</td>
                            <td>{ticket.titulo}</td>
                            <td>{ticket.tecnico.nombre + " " + ticket.tecnico.apellido}</td>
                            <td>{ticket.informante.nombre + " " + ticket.informante.apellido} </td>
                        </tr>
                    </table>
                </>
            ) }
        )}
        
        
        </>
     );
}
 
export default Home;