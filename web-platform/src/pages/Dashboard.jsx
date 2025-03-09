import AdminDashboard from "../components/AdminDashboard";
import TechnicianDashboard from "../components/TechnicianDashboard";
import { getCookie } from "../utils/cookie";
import { CONST } from "../utils/constants";

const Dashboard = () => {
  /*   Funcionalidades para administradores.

  Estadísticas.
  El administrador podrá ver cuantos técnicos hay a disposición, podrá también observar quien es el técnico que mas problemas a resuelto, y quien es el técnico que menos a resuelto. 
  
   Funcionalidades para técnicos.
  - Estadísticas.
      - Un técnico podrá ver cuantos reportes hay, cuantos reportes ha resuelto, cuantos reportes no ha resuelto. */

  const rol = getCookie("rol");
  if (rol == CONST.ROL.ADMIN) {
    return <AdminDashboard />;
  } else if (rol == CONST.ROL.TECHNICAL) {
    return <TechnicianDashboard />;
  }
};

export default Dashboard;
