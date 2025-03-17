import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import TicketsTable from "./TicketsTable";
import axios from "axios";
import { getCookie } from "../utils/cookie";

const TechnicianDashboard = () => {
  const [pathname, setPathname] = useState("all");
  const [refresh, setRefresh] = useState(false);
  const [count, setCount] = useState(null);
  const token = getCookie("token");

  const handleClick = path => {
    setPathname(path);
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fecthTickets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/tickets/dashboard",
          {
            headers: {
              authorization: token,
            },
          }
        );
        // console.log("response.data :>> ", response.data);
        if (response.status === 200) {
          setCount(response.data.count);
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecthTickets();
  }, [refresh]);

    return (
        <>
          <div className=" w-full text-white">
            <div className="py-9">
              <h1 className="text-4xl font-bold text-center">Dashboard</h1>
    
            </div>


            <div className="p-10">

              { count && (
                <div className="card-box w-full">

                  {console.log('count :>> ', count)}

                <div className="cursor-pointer"  onClick={() => handleClick("all")}>
                  <DashboardCard label="Reportes" value={count.all}  bgc="bg-[#317bf3]" />
                </div>

                <div className="cursor-pointer" onClick={() => handleClick("completed")}>
                  <DashboardCard label="Reportes resueltos" value={count.completed} bgc="bg-[#00cc6d]" />
                </div>

                <div className="cursor-pointer" onClick={() => handleClick("pending")}>
                  <DashboardCard label="Reportes no resueltos" value={count.pending}  bgc="bg-[#fdac3c]" />
                </div>
              </div>
              )}

            </div>

            <TicketsTable url={"http://localhost:3000/api/tickets/main/" + pathname}  refresh={refresh} setRefresh={setRefresh}/>

          </div>
        </>
      );
}
 
export default TechnicianDashboard;