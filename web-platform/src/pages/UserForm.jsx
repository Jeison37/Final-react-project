import editIcon from '../assets/edit.svg'
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import axios from "axios";
import { CONST } from "../utils/constants";
import ProfileRow from "../components/ProfileRow";
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const token = getCookie("token");
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [imagen, setImagen] = useState(null);
    let oldAccount = {};

    useEffect(() => {
      if (localStorage.getItem("edit_account")){
          oldAccount = JSON.parse( localStorage.getItem("edit_account") )
          console.log('oldAccount :>> ', oldAccount);
        }
      
        setData({
            id: oldAccount._id ?? null,
            nombre: oldAccount.nombre ?? "",
            apellido: oldAccount.apellido ?? "",
            username: oldAccount.username ?? "",
            email: oldAccount.email ?? "",
            direccion: oldAccount.direccion ?? "",
            rol: oldAccount.rol ?? 0,
            imagen: oldAccount.imagen ?? null,
            password: "",
        });
      
    }, []);
  

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append("pathname", "users/profiles");
          console.log('oldAccount.password, oldAccount :>> ', oldAccount.password, oldAccount);
      
          for (const key in data) {
            formData.append(key, data[key]);
          }
          
          if (imagen) {
            formData.append("imagen", imagen);
          }

          let res;
            
            if (localStorage.getItem("edit_account")) {
               res = await axios.put(`http://localhost:3000/api/users/account/${data.id}/update`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  authorization: token,
                }
        
              });
              
            } else {
               res = await axios.put(`http://localhost:3000/api/users/account/create`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  authorization: token,
                }
        
              });
            }
    
          if (res.status === 200) {

            localStorage.removeItem("edit_account");

            navigate("/accounts");
            
          }
        }catch(error){
          console.log(error);
        }
        
      }

      const handleInputChange = (e) => {
        setData({
          ...data,
          [e.target.name]: e.target.value,
        });
      };
    

    return ( 
        <>
      <div className=" w-full text-white">
        <div className="w-full px-24">
          <div className="py-9">
            <h1 className="text-4xl font-bold ps-4 ">Cuenta</h1>
          </div>
          
          <form action="" className="" onSubmit={handleSubmit} encType="multipart/form-data">
            
            <div className="grid md:grid-cols-2 grid-cols-1">
              <div className="">
                <ProfileRow label="Nombre" valueVar={data.nombre} changeVar={handleInputChange} />
                <ProfileRow label="Apellido" valueVar={data.apellido} changeVar={handleInputChange} />
  
                <div className=" px-4 py-8 sm:px-6 lg:px-8 ">
                  <div className="">
                    <h2 className="font-bold text-lg">Rol</h2>

                  </div>

                  <div className="h-9 max-w-80">
                    <select defaultValue={data.rol} className="bg-[#000] size-full px-2 py-1 border-solid rounded-lg border-black  border-2" type="text" name="rol" id="rol"  value={data.rol} onChange={handleInputChange} >
                      <option value="">Seleccione un rol</option>
                      <option value={CONST.ROL.USER}>Usuario</option>
                      <option value={CONST.ROL.ADMIN}>Administrador</option>
                      <option value={CONST.ROL.TECHNICIAN}>Tecnico</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-3 px-4 py-8 sm:px-6 lg:px-8 ">
                  <div className="">
                    <h2 className="font-bold text-lg">Imagen</h2>
                  </div>
                  <div className="">
                    <label htmlFor="imagen" className="rounded-full size-fit block relative cursor-pointer">
                      <div className="size-16 rounded-full overflow-hidden bg-white">
                                  <img
                          className="size-full"
                          src={ data.imagen ?? "http://localhost:3000/images/users/profiles/default.webp"}
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
                <ProfileRow label="Nombre de usuario" idVar="username" valueVar={data.username} changeVar={handleInputChange} />
                <ProfileRow label="Email"  valueVar={data.email} changeVar={handleInputChange} />
                <ProfileRow label="Dirección" idVar="direccion" valueVar={data.direccion} changeVar={handleInputChange} />
                <ProfileRow label="Nueva contraseña" idVar="password" valueVar={data.password} changeVar={handleInputChange} />
              </div>
            </div>

              <button className="gradient-gb py-2 px-6 rounded-full" type="submit">{data.id ? "Guardar cambios" : "Crear cuenta"} </button>

          </form>


        </div>
      </div>
        </>
     );
}
 
export default UserForm;