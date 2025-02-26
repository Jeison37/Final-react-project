import { CONSTANTS } from "../utils/constants";
import SignForm from "../components/SignForm";
import SignInput from "../components/SignInput";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  // Estado inicial como un objeto
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    direccion: "",
    password: "",
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos del formulario al servidor
      const res = await axios.post(
        "http://localhost:3000/api/users/signup",
        data
      );
      if (res.status === 200) {
        alert("Usuario registrado con éxito");
        setData({
          nombre: "",
          apellido: "",
          username: "",
          email: "",
          direccion: "",
          password: "",
        }); // Reiniciar el estado

        const info = res.data;
        console.log(info);
        localStorage.setItem("token", info.token);

        navigate("/home"); // Redirigir al usuario a la página de login
      }
    } catch (error) {
      console.log(error);
      alert("Error al registrar el usuario");
    }
  };

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <SignForm type={CONSTANTS.SIGNUP}>
        <form className="px-14 w-full" onSubmit={handleSubmit}>
          <div className="w-full space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <SignInput
                label={"Nombre"}
                OnChangeVar={handleInputChange} // Usar data.nombre
              />
              <SignInput
                label={"Apellido"}
                OnChangeVar={handleInputChange} // Usar data.apellido
              />
            </div>
            <SignInput
              label={"Nombre de usuario"}
              Name={"username"}
              OnChangeVar={handleInputChange} // Usar data.userName
            />
            <SignInput
              label={"Email"}
              OnChangeVar={handleInputChange} // Usar data.email
            />
            <SignInput
              label={"Direccion"}
              OnChangeVar={handleInputChange} // Usar data.direccion
            />
            <SignInput
              label={"Contraseña"}
              Name={"password"}
              OnChangeVar={handleInputChange} // Usar data.password
            />
          </div>

          <div className="flex justify-center w-full py-8">
            <button
              type="submit"
              className="bg-[#1B3D5A] py-2 px-4 rounded-full font-semibold overflow-hidden w-fit"
            >
              Registrarse
            </button>
          </div>
        </form>
      </SignForm>
    </>
  );
};

export default SignUp;
