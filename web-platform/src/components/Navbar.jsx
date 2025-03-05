import { Link } from "react-router-dom";
import { getCookie } from "../utils/cookie";
import { useRef, useState, useEffect } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const refMenu = useRef(null);

  const toggleMenu = () => {
    setAbierto(!open);
  };

  const handleOutClick = (e) => {
    if (refMenu.current && !refMenu.current.contains(e.target)) {
      setAbierto(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutClick);
    } else {
      document.removeEventListener("mousedown", handleOutClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutClick);
    };
  }, [open]);

  return (
    <>
      <nav className="h-16 flex justify-between px-7 shadow-lg shadow-[#0007]  bg-[#1B3D5A]">
        <div className="h-full w-fit text-white ">
          <ul className="h-full w-fit font-medium flex space-x-7 text-lg">
            <li className="w-fit h-full flex items-center ">
              <Link to="/">Home</Link>
            </li>

            <li className="w-fit h-full flex items-center ">
              <Link to="ticket/create">Agregar ticket</Link>
            </li>

            <li className="w-fit h-full flex items-center ">
              <Link to="/dashboard">Estadisticas</Link>
            </li>

            <li className="w-fit h-full flex items-center ">
              <Link to="/chat">Area de chat en vivo</Link>
            </li>
          </ul>
        </div>

        <div className="h-full w-fit flex items-center">
          <div className="size-fit relative ">
            <div className="h-11 w-11 rounded-full overflow-hidden bg-white">

      <img className="size-full" src={getCookie("imagen") === "null" ?  "http://localhost:3000/images/users/profiles/default.webp" : getCookie("imagen")} alt="" />

            </div>

            <div className="p-3 mt-1 w-fit absolute hidden  drop font-bold rounded-lg right-0 bg-white ">
              <button className="">Perfil</button>
              <button className="text-nowrap">Cerrar sesion</button>
            </div>


          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;