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
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <SignForm type={CONST.LOGIN}>
        <form className="px-12 w-full" onSubmit={handleSubmit}>
          <div className="w-full space-y-3">

            <SignInput label={"Email"} Name={"email"} OnChangeVar={handleInputChange} />

            <SignInput label={"Contraseña"} Name={"password"} OnChangeVar={handleInputChange} />

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
