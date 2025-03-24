import editIcon from '../assets/edit.svg'
import { useEffect, useState } from "react";
import { createCookie, getCookie } from "../utils/cookie";
import axios from "axios";
import ProfileRow from "../components/ProfileRow";
import { Spinner } from '../components/Spinner';

const Profile = () => {
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [imagen, setImagen] = useState(null);
  const token = getCookie("token");

  useEffect(() => {
    const fecthUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/profile", {
          headers: {
            authorization: token,
          },
        });
        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecthUser();
  }, [refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("pathname", "users/profiles");
  
      for (const key in user) {
        formData.append(key, user[key]);
      }
      
      if (imagen) {
        formData.append("imagen", imagen);
      }
  
      const res = await axios.put("http://localhost:3000/api/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: token,
        }

      });

      if (res.status === 200) {
        createCookie("imagen=" + res.data.imagen, 1);
        location.reload();
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
      <div className=" w-full text-white">
        <div className="w-full px-24">
          <div className="py-9">
            <h1 className="text-4xl font-bold ps-4 ">Perfil</h1>
          </div>
          
          <form action="" className="" onSubmit={handleSubmit} encType="multipart/form-data">
            
            <div className="grid md:grid-cols-2 grid-cols-1">
              <div className="">
                <ProfileRow label="Nombre" valueVar={user.nombre} changeVar={handleInputChange} />
                <ProfileRow label="Apellido" valueVar={user.apellido} changeVar={handleInputChange} />
                <div className="space-y-3 px-4 py-8 sm:px-6 lg:px-8 ">
                  <div className="">
                    <h2 className="font-bold text-lg">Imagen</h2>
                  </div>
                  <div className="">
                    <label htmlFor="imagen" className="rounded-full size-fit block relative cursor-pointer">
                      <div className="size-16 rounded-full overflow-hidden bg-white">
                                  <img
                          className="size-full"
                          src={ user.imagen ?? "http://localhost:3000/images/users/profiles/default.webp"}
                          alt=""
                        />
                      </div>
                      <div className="absolute bottom-0 left-0">
                        <img src={editIcon} alt="" />
                      </div>
                    </label>
                  </div>
                  <div className="">
                    <input className="bg-black" hidden type="file" name="imagen" id="imagen" onChange={(e) => setImagen(e.target.files[0])} />
                  </div>
                </div>
              </div>
              
              <div className="">
                <ProfileRow label="Nombre de usuario" idVar="username" valueVar={user.username} changeVar={handleInputChange} />
                <ProfileRow label="Email"  valueVar={user.email} changeVar={handleInputChange} />
                <ProfileRow label="Dirección" idVar="direccion" valueVar={user.direccion} changeVar={handleInputChange} />
              </div>
            </div>



              <button className="gradient-gb py-2 px-6 rounded-full" type="submit">Actualizar</button>

          </form>


        </div>
      </div>
    </>
  );
};

export default Profile;
