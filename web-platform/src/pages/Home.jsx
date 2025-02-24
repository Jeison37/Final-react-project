const Home = () => {
    const [users, setUsers] = useState([]);
    const API_URL = "http://127.0.0.1:7500/users";
    const [refresh, setRefresh] = useState(false);

    return ( 
        <>

        { tickets && tickets.map(ticket => {
            
            if (ticket.visibilidad) return (
            <tr key={ticket.id}>
                <td>{ticket.estado}</td>
                <td>{ticket.titulo}</td>
                <td>{ticket.tecnico.nombre + " " + ticket.tecnico.apellido}</td>
                <td>{ticket.informante + " " + ticket.informante.apellido} </td>
            </tr>
            ) }
        )}
        
        
        </>
     );
}
 
export default Home;