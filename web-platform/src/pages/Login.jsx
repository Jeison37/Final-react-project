import {CONSTANTS} from "../utils/constants";
import SignForm from "../components/SignForm";
import SignInput from "../components/SignInput";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// import SwitchButton from "../components/SwitchButton";

const Login = () => {
  // variables de estado de los inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = "http://localhost:3002/api/users";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post(API_URL, {
        email,
        password
      });
      if(res.status === 200){
        alert("Usuario creado con exito");
        setEmail("");
        setPassword("");

        const response = await axios.post(
          "http://localhost:3002/api/login",
          {email, password}
        );
        
        const info = response.data;
        console.log(info);
        localStorage.setItem("token", info.token);

        navigate("/home");
      }
    }catch(error){
      console.log(error);
    }
    
  }

  return (
    <>
      <SignForm type={CONSTANTS.LOGIN}>
        <form className="px-12 w-full" onSubmit={handleSubmit}>
          <div className="w-full space-y-3">

            <SignInput label={"Email"} Name={"email"} valueVar={email} />

            <SignInput label={"Contraseña"} Name={"password"} valueVar={password} />

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
