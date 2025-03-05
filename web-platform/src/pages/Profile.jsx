import { useState } from "react";
import { getCookie } from "../utils/cookie";

const Profile = () => {
  const [user , setUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const token = getCookie("token");

  useEffect(()=>{
    const fecthTickets = async()=>{
      try{
        const res = await axios.get("http://localhost:3000/api/users/profile",
          {
            headers:{
              'authorization': token
            }
          }
        );
        if( res.status === 200){
          console.log('response.data :>> ', res.data);
          setUser(res.data);
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
          <h1 className="text-4xl font-bold ps-4 ">Area Premium</h1>
        </div>


      </div>
    </>
  );
};

export default Profile;
