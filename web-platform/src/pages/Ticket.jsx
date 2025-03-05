import { useParams } from "react-router-dom";

const Ticket = () => {
    let params = useParams();
    const [comments, setComments] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [refresh, setRefresh] = useState(false);
    const token = getCookie("token");

    useEffect(()=>{
        const fecthTicket = async()=>{
          try{
            const response = await axios.get(`http://localhost:3000/api/tickets/main/${params.id}`,
              {
                headers:{
                  'authorization': token
                }
              }
            );
            if( response.status === 200){
                
            }
          }catch(error){
            console.log(error)
          }
        };
        fecthTicket()
      },[refresh]) 

    return ( 
        <>
        
            <div className="min-h-screen w-full">

            </div>

        </>
     );
}
 
export default Ticket;