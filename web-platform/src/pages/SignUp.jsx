import { CONST } from "../utils/constants";
import SignForm from "../components/SignForm";
import SignInput from "../components/SignInput";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createCookie } from "../utils/cookie";

const SignUp = () => {
  const navigate = useNavigate();

  
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    direccion: "",
    password: "",
    rol: 0
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const res = await axios.post(
        "http://localhost:3000/api/users/signup",
        data
      );
      console.log('res.status,res :>> ', res.status,res);
      if (res.status === 201) {
        alert("Usuario registrado con éxito");
        setData({
          nombre: "",
          apellido: "",
          username: "",
          email: "",
          direccion: "",
          password: "",
          rol: 0
        }); 

        const info = res.data;
        console.log(info);
        createCookie("token=" + info.token, 4);
        createCookie("imagen=" + info.imagen, 4);
        createCookie("rol=" + info.rol, 4);

        navigate("/"); 
      }
    } catch (error) {
      console.log(error);
      console.log('data :>> ', data);
      alert("Error al registrar el usuario");
    }
  };

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <SignForm type={CONST.SIGNUP}>
        <form className="px-14 w-full " onSubmit={handleSubmit}>
          <div className="w-full space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <SignInput
                label={"Nombre"}
                OnChangeVar={handleInputChange} 
              />
              <SignInput
                label={"Apellido"}
                OnChangeVar={handleInputChange} 
              />
            </div>
            <SignInput
              label={"Nombre de usuario"}
              Name={"username"}
              OnChangeVar={handleInputChange} 
            />
            <SignInput
              label={"Email"}
              OnChangeVar={handleInputChange} 
            />
            <SignInput
              label={"Direccion"}
              OnChangeVar={handleInputChange} 
            />
            <SignInput
              label={"Contraseña"}
              Name={"password"}
              OnChangeVar={handleInputChange} 
            />
          </div>

          <div className="flex justify-center w-full py-8">
            <button
              type="submit"
              className="bg-[#1B3D5A] py-2 px-4 rounded-full font-semibold overflow-hidden w-fit"
            >
              Registrarse
            </button>
          </div>
        </form>
      </SignForm>
    </>
  );
};

export default SignUp;
