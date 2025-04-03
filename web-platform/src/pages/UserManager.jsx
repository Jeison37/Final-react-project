import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import axios from "axios";
import { CONST } from "../utils/constants";
import { Link } from "react-router-dom";

const UserManager = () => {
  const [users, setUsers] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [userFilter, setUserFilter] = useState(CONST.ROL.USER);

  const deleteAccount = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/users/${id}`,
        {
          headers: {
            authorization: getCookie("token"),
          },
        }
      );
      if (response.status === 200) {
        setRefresh(!refresh);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/", {
          headers: {
            authorization: getCookie("token"),
          },
        });
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [refresh, userFilter]);
  return (
    <>
      <div className="flex flex-col pt-5 items-center w-full">

        <div className="flex justify-center p-1">

          <div className="flex gap-3 text-white text-xl">
            <button onClick={() => setUserFilter(CONST.ROL.USER)} className="rounded-full">
              Usuarios
            </button>
            <button onClick={() => setUserFilter(CONST.ROL.TECHNICIAN)} className="rounded-full">
              Tecnicos
            </button>
          </div>

        </div>
            <div className="py-5">
              <Link onClick={() => localStorage.clear() } className="px-2 py-1 gradient-gb rounded-full text-white" to={`/account`}>Crear cuenta</Link>

            </div>
        <div className="w-4/5 pt-1  bg-[#1b3d5a] rounded-lg shadow-2xl shadow-blue-950">
          <table className="size-full text-white">
            <thead>
              <tr className="h-10 border-[#E7E7E7] border-b border-solid">
                <th>Nombre de usuario</th>

                <th>Acciones</th>
              </tr>
            </thead>

            <tbody className="tbody text-center">
              {users &&
                users.map( account => {
                  if (account.rol === userFilter) return (

                      <tr
                        key={account._id}
                        className="h-10 row"
                      >
                        <td className="px-2 py-1">{account.username}</td>

                        <td className="px-2 py-1 flex gap-2">

                <Link onClick={() => localStorage.setItem("edit_account", JSON.stringify(account))} to={`/account`}>Editar</Link>

                <button className="" onClick={() => deleteAccount(account._id)}>Eliminar</button>

                <Link  to={`/bills/user/${account._id}`}>Ver pagos</Link>

                        </td>
                      </tr>

                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserManager;
