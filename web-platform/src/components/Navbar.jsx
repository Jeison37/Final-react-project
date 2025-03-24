import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { deleteCookies, getCookie } from "../utils/cookie";
import { useRef, useState, useEffect } from "react";
import { CONST } from "../utils/constants";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const refMenu = useRef(null);
  const navigate = useNavigate();
  const rol = getCookie("rol");
  const location = useLocation();

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleOutClick = (e) => {
    if (refMenu.current && !refMenu.current.contains(e.target)) {
      setOpen(false);
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
      <nav className="h-16 flex justify-between shadow-lg shadow-[#0007]  bg-[#1B3D5A] fixed top-0 left-0 right-0">
        <div className="hidden md:block h-full w-fit text-white ">
          <ul className="h-full w-fit font-medium flex  text-lg">
            <li className={"w-fit h-full px-5 flex items-center " + (location.pathname == "/" && " gradient-gb")}>
              <Link to="/">Home</Link>
            </li>

            <li className={"w-fit h-full px-5 flex items-center " + (location.pathname == "/ticket/create" && " gradient-gb")}>
              <Link to="/ticket/create">Agregar ticket</Link>
            </li>
            {rol != CONST.ROL.USER && (

              <>
              <li className={"w-fit h-full px-5 flex items-center " + (location.pathname == "/dashboard"  && " gradient-gb")}>    
                <Link to="/dashboard">Estadisticas</Link>
              </li> 
              <li className={"w-fit h-full px-5 flex items-center " + (location.pathname == "/chats"  && " gradient-gb")}>    
                <Link to="/chats">Solicitudes de chats</Link>
              </li> 
              </>

             )}

            {rol == CONST.ROL.USER && (
              <li className={"w-fit h-full px-5 flex items-center " + (location.pathname == "/chat" && " gradient-gb")}>
                <Link to="/chat">Area de chat en vivo</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="flex items-center ps-7 text-white">
          <button className="md:hidden block text-lg gradient-gb px-5 py-2 h-fit rounded-full font-semibold overflow-hidden w-fit">
              Menu
          </button>
        </div>

        <div className="h-full w-fit flex items-center">
          <div
            ref={refMenu}
            onClick={toggleMenu}
            className="size-fit relative cursor-pointer rounded-full  pe-7"
          >
            <div className="size-11 rounded-full overflow-hidden bg-white">
              <img
                className="size-full"
                src={
                  getCookie("imagen") === "null"
                    ? "http://localhost:3000/images/users/profiles/default.webp"
                    : getCookie("imagen")
                }
                alt=""
              />
            </div>

            {open && (
              <div className="p-3 mt-1 w-fit space-y-3 absolute drop font-bold rounded-lg right-0 bg-white ">
                <div className="">
                  <Link to="/profile" className="">
                    Perfil
                  </Link>
                </div>
                <div className="">
                  <Link to="/profile" className="">
                    Pagos
                  </Link>
                </div>
                <button
                  onClick={() => {
                    deleteCookies();
                    navigate("/login");
                  }}
                  className="text-nowrap"
                >
                  Cerrar sesion
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
