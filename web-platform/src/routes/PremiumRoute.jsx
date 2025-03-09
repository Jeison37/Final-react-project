import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { getCookie } from "../utils/cookie";

export function PrivateRoute() {
  const [tokenValido, setTokenValido] = useState(null);
  useEffect(()=>{
    const token = getCookie("token");
    const validarSesion = async ()=>{
      try{
        const res = await axios.get('http://localhost:3000/api/users/auth',{
          headers:{
            'authorization': token
          }
        });
        const info = res.data;

        setTokenValido(true);
      }catch(error){
        setTokenValido(false);
        console.log(error);
      }
    };
    validarSesion();
  },[]);
  
  if(tokenValido === null){
    return <div>Cargando...</div>
  }

  return(tokenValido ? <Outlet/> : <Navigate to="/login"/>);
};