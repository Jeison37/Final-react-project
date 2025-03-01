import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <>
  <nav className="h-16 flex justify-between px-7 bg-[#1B3D5A]">

<div className="h-full w-fit text-white ">

  <ul className="h-full w-fit font-medium flex space-x-7 text-lg">
    <li className="w-fit h-full flex items-center ">
      <Link to="/">
        Home
      </Link>
    </li>

    <li className="w-fit h-full flex items-center ">
      <Link to="ticket/create">
        Agregar ticket
      </Link>
    </li>

    <li className="w-fit h-full flex items-center ">
      <Link to="/dashboard">
        Estadisticas
      </Link>
    </li>

    <li className="w-fit h-full flex items-center ">
      <Link to="/chat">
        Area de chat en vivo
      </Link>
    </li>

  </ul>

</div>

<div className="h-full w-fit flex items-center">

  <div className="h-11 w-11 rounded-full bg-white">

  </div>

</div>
</nav>
        </>
     );
}
 
export default Navbar;