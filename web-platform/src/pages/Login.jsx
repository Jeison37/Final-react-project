import {CONST} from "../utils/constants";
import SignForm from "../components/SignForm";
import SignInput from "../components/SignInput";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createCookie } from "../utils/cookie";

const Login = () => {
  // variables de estado de los inputs
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const API_URL = "http://localhost:3000/api/users/login";

  const navigate = useNavigate();

  const [warn, setWarn] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    for ( const key in data) {
      if (data[key] === "") {
        setWarn("Todos los campos son obligatorios");
        return
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        setWarn("Por favor, ingrese un email válido.");
        return;
    }

    try{
      const res = await axios.post(API_URL, data);
      if(res.status === 200){
        setData({
          email: "",
          password: "",
        });

        const info = res.data;
        console.log(info);
        
        createCookie("token=" + info.token, 365);
        createCookie("imagen=" + info.imagen, 365);
        createCookie("rol=" + info.rol, 365);

        navigate("/");
      }
    }catch(error){

      setWarn(error.response.data.message);

      console.log(error);
    }
    
  }

  const handleInputChange = (e) => {
    if (warn) setWarn("");
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <SignForm type={CONST.LOGIN}>
      <span className="text-red-600 w-full px-10 text-center">{warn}</span>
        <form className="px-12 w-full" onSubmit={handleSubmit}>
          <div className="w-full space-y-3">

            <SignInput label={"Email"} Name={"email"} OnChangeVar={handleInputChange} />

            <SignInput label={"Contraseña"} Name={"password"} type="password" OnChangeVar={handleInputChange} />

          </div>

          <div className="w-full">

          </div>

          <div className="flex justify-center w-full py-8">

            <button className="bg-[#1B3D5A] py-2 px-4 rounded-full font-semibold overflow-hidden w-fit">Login</button>

          </div>
        </form>
      </SignForm>
    </>
  );
};

export default Login;
