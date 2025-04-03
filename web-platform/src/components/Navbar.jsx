import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { deleteCookies, getCookie } from "../utils/cookie";
import { useRef, useState, useEffect } from "react";
import { CONST } from "../utils/constants";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const refNavbar = useRef();
  const refNavbarBtn = useRef(null);
  const [navbar, setNavbarBtn] = useState(false);
  const refMenu = useRef(null);
  const navigate = useNavigate();
  const rol = getCookie("rol");
  const location = useLocation();

  console.log('rol :>> ', rol);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const toggleNavbarBtn = () => {
    setNavbarBtn(!navbar);
  };

  const handleOutClickNavbarBtn = (e) => {
    if (refNavbarBtn.current && !refNavbarBtn.current.contains(e.target) && !refNavbar.current.contains(e.target)) {
      setNavbarBtn(false);
    }
  };

  useEffect(() => {
    if (navbar) {
      document.addEventListener("mousedown", handleOutClickNavbarBtn);
    } else {
      document.removeEventListener("mousedown", handleOutClickNavbarBtn);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutClickNavbarBtn);
    };
  }, [navbar]);


  const handleOutClickOpen = (e) => {
    if (refMenu.current && !refMenu.current.contains(e.target)) {
      setOpen(false);

    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutClickOpen);
    } else {
      document.removeEventListener("mousedown", handleOutClickOpen);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutClickOpen);
    };
  }, [open]);

  return (
    <>
      { navbar && (
              <div ref={refNavbar} className="fixed top-0 bottom-0 bg-[#162841] z-10 min-w-64">
              <div className=" h-full w-full text-white ">
          <ul className="h-full w-full font-medium flex flex-col  text-lg" onClick={() => setNavbarBtn(false)}>
            <li className={"w-full h-fit flex items-center " + (location.pathname == "/" ? " gradient-gb" : "")}>
              <Link  className="size-full py-4 px-5" to="/">Home</Link>
            </li>

            <li className={"w-full h-fit flex items-center " + (location.pathname == "/ticket/create" ? " gradient-gb" : "")}>
              <Link className="size-full py-4 px-5" to="/ticket/create">Agregar ticket</Link>
            </li>
            {rol != CONST.ROL.USER && (

              <>
              <li className={"w-full h-fit flex items-center " + (location.pathname == "/dashboard"  ? " gradient-gb" : "")}>    
                <Link className="size-full py-4 px-5" to="/home">Tickets</Link>
              </li> 
              <li className={"w-full h-fit flex items-center " + (location.pathname == "/dashboard"  ? " gradient-gb" : "")}>    
                <Link className="size-full py-4 px-5" to="/dashboard">Estadísticas</Link>
              </li> 
              </>

             )}

            {rol == CONST.ROL.TECHNICIAN && (

              <>
              <li className={"w-full h-fit flex items-center " + (location.pathname == "/chats"  ? " gradient-gb" : "")}>    
                <Link className="size-full py-4 px-5" to="/chats">Solicitudes de chats</Link>
              </li> 
              </>

             )}


            {rol == CONST.ROL.ADMIN && (

              <>
              <li className={"w-full h-fit flex items-center " + (location.pathname == "/accounts"  ? " gradient-gb" : "")}>    
                <Link className="size-full py-4 px-5" to="/accounts">Gestion de cuentas</Link>
              </li> 

              </>

             )}


            {rol == CONST.ROL.USER && (
              <li className={"w-full h-fit  flex items-center " + (location.pathname == "/chat" ? " gradient-gb" : "")}>
                <Link className="size-full py-4 px-5" to="/chat">Area de chat en vivo</Link>
              </li>
            )}
          </ul>
        </div>
              </div>
      )}
      <nav className="h-16 flex justify-between shadow-lg shadow-[#0007]  bg-[#1B3D5A] fixed top-0 left-0 right-0">
        <div className="hidden lg:block h-full w-fit text-white ">
          <ul className="h-full w-fit font-medium flex  text-lg">
            <li className={"w-fit h-full px-5 flex items-center " + (location.pathname == "/" ? " gradient-gb" : "")}>
              <Link to="/">Home</Link>
            </li>

            <li className={"w-fit h-full px-5 flex items-center " + (location.pathname == "/ticket/create" ? " gradient-gb" : "")}>
              <Link to="/ticket/create">Agregar ticket</Link>
            </li>
            {rol != CONST.ROL.USER && (

              <>
              <li className={"w-fit h-full px-5 flex items-center " + (location.pathname == "/dashboard"  && " gradient-gb")}>    
                <Link to="/home">Tickets</Link>
              </li> 
              <li className={"w-fit h-full px-5 flex items-center " + (location.pathname == "/dashboard"  ? " gradient-gb" : "")}>    
                <Link to="/dashboard">Estadísticas</Link>
              </li> 
              </>

             )}

            {rol == CONST.ROL.TECHNICIAN && (

              <>
              <li className={"w-fit h-full px-5 flex items-center " + (location.pathname == "/chats"  ? " gradient-gb" : "")}>    
                <Link  to="/chats">Solicitudes de chats</Link>
              </li> 
              </>

             )}


            {rol == CONST.ROL.ADMIN && (

              <>
              <li className={"w-fit h-full px-5 flex items-center " + (location.pathname == "/accounts"  ? " gradient-gb" : "")}>    
                <Link  to="/accounts">Gestion de cuentas</Link>
              </li> 

              </>

             )}

            {rol == CONST.ROL.USER && (
              <li className={"w-fit h-full px-5 flex items-center " + (location.pathname == "/chat" ? " gradient-gb" : "")}>
                <Link to="/chat">Area de chat en vivo</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="lg:hidden flex items-center ps-7 text-white">
          <button ref={refNavbarBtn} onClick={toggleNavbarBtn} className=" text-lg gradient-gb px-5 py-2 h-fit rounded-full font-semibold overflow-hidden w-fit">
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
                  <Link to="/bills" className="">
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
