import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import DashboardCard from "./DashboardCard";
import axios from "axios";

const AdminDashboard = () => {
  const [count, setCount] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const token = getCookie("token");
// El administrador podrá ver cuantos técnicos hay a disposición, podrá también observar quien es el técnico que mas problemas a resuelto, y quien es el técnico que menos a resuelto. 
  useEffect(() => {
    const fecthUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/tickets/dashboard/admin",
          {
            headers: {
              authorization: token,
            },
          }
        );
        // console.log("response.data :>> ", response.data);
        if (response.status === 200) {
          setCount(response.data);
       
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecthUsers();
  }, [refresh]);

    return (
        <>
{ count && (
  
          <div className=" w-full text-white">
            <div className="py-9">
              <h1 className="text-4xl font-bold text-center"></h1>
    
            </div>
    
        
                <div className="card-box w-full">

                  {console.log('count :>> ', count)}

                <div>
                  <DashboardCard label="Técnicos a dispocisión" value={count.technicianCount}  bgc="bg-[#317bf3]" />
                </div>

                <div>
                  <DashboardCard label="Técnicos con mas tickets resueltos" value={count.bestTechnician.username} bgc="bg-[#00cc6d]" />
                </div>

                <div>
                  <DashboardCard label="Técnicos con menos tickets resueltos" value={count.worstTechnician.username}  bgc="bg-[#fdac3c]" />
                </div>
              </div>

        <div className="flex flex-col pt-5 items-center w-full">
          <div className="w-4/5 pt-1  bg-[#1b3d5a] rounded-lg shadow-2xl shadow-blue-950">
            <table className="size-full">
              <thead>
                <tr className="h-10 border-[#E7E7E7] border-b border-solid">
                  <th>Tecnico</th>

                  <th>Nª de soluciones</th>
                </tr>
              </thead>

              <tbody className="tbody-tickets text-center">

        { count && count.technicianList.map(technician => {
            
        
       return (
          <>
          <tr key={technician._id} className="h-10 border-[#E7E7E7] border-b border-solid">

                <td className="px-2 py-1">{technician.username}</td>
                <td className="px-2 py-1">{technician.total}</td>

                </tr>
          </>
        )})}

              </tbody>
            </table>
          </div>

        </div>
          
            
          </div>

  )}
          
        </>
      );
}
 
export default AdminDashboard;