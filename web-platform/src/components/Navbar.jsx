const Navbar = () => {
    return ( 
        <>
  <nav className="h-16 flex justify-between px-7 bg-[#1B3D5A]">

<div className="h-full w-fit text-white ">

  <ul className="h-full w-fit font-medium flex space-x-7 text-lg">
    <li className="w-fit h-full flex items-center ">
      <a href="">
        Home
      </a>
    </li>

    <li className="w-fit h-full flex items-center ">
      <a href="">
        Agregar ticket
      </a>
    </li>

    <li className="w-fit h-full flex items-center ">
      <a href="">
        Estadisticas
      </a>
    </li>

    <li className="w-fit h-full flex items-center ">
      <a href="">
        Area de chat en vivo
      </a>
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