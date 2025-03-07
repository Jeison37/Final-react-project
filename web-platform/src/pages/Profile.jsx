import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import axios from "axios";
import ProfileRow from "../components/ProfileRow";

const Profile = () => {
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [imagen, setImagen] = useState(null);
  const token = getCookie("token");

  useEffect(() => {
    const fecthTickets = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/profile", {
          headers: {
            authorization: token,
          },
        });
        if (res.status === 200) {
          console.log("response.data :>> ", res.data);
          await setUser(res.data);

          setImagen( user.imagen ?? "http://localhost:3000/images/users/profiles/default.webp");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecthTickets();
  }, [refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post(API_URL, data);
      if(res.status === 200){
        alert("Usuario logeado con exito");
        setData({
          email: "",
          password: "",
        });

        const info = res.data;
        console.log(info);
        
        createCookie("token=" + info.token, 1);
        createCookie("imagen=" + info.imagen, 1);
        createCookie("rol=" + info.rol, 1);

        navigate("/");
      }
    }catch(error){
      console.log(error);
    }
    
  }

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="min-h-screen w-full text-white">
        <div className="w-full px-24">
          <div className="py-9">
            <h1 className="text-4xl font-bold ps-4 ">Perfil</h1>
          </div>
          
          <form action="" className="">
            
            <ProfileRow label="Nombre" valueVar={user.nombre} changeVar={handleInputChange} />
            <ProfileRow label="Apellido" valueVar={user.apellido} changeVar={handleInputChange} />
            <ProfileRow label="Nombre de usuario" idVar="username" valueVar={user.username} changeVar={handleInputChange} />
            <ProfileRow label="Email"  valueVar={user.email} changeVar={handleInputChange} />
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8 ">
              <div className="">
                <h2 className="font-bold">Imagen</h2>
              </div>
              <div className="size-16 rounded-full overflow-hidden bg-white">
{imagen && (                <img
                  className="size-full"
                  src={imagen}
                  alt=""
                />)}
              </div>
              <div className="">
                <input className="bg-black" type="file" name="imagen" id="imagen" value={user.imagen} onChange={handleInputChange} />
              </div>
            </div>
            <ProfileRow label="Dirección" idVar="direccion" valueVar={user.direccion} changeVar={handleInputChange} />
          </form>


        </div>
      </div>
    </>
  );
};

export default Profile;
