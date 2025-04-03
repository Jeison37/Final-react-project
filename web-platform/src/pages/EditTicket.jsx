import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import { useDropzone } from "react-dropzone";
import { Navigate, useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";

const CreateTicket = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const token = getCookie("token");
  const [warn, setWarn] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let oldTicket;

  if (sessionStorage.getItem("edit_ticket")){
      oldTicket = JSON.parse( sessionStorage.getItem("edit_ticket") )

    }else{
        return <Navigate to="/" />
    }
    
    const [data, setData] = useState({
        titulo: oldTicket.titulo,
        descripcion: oldTicket.descripcion,
        visibilidad: oldTicket.visibilidad,
        imagen: oldTicket.imagen,
    });

  const onDrop = useCallback((acceptedFiles) => {
    // Verificar si se ha subido un archivo
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type.startsWith("image/")) {
        // Leer la imagen y mostrarla como vista previa
        const reader = new FileReader();
        reader.onload = () => {
          setImage({file,imagePreview: reader.result});
        };
        reader.readAsDataURL(file);
      } else {
        setWarn("Por favor, sube solo imágenes.");
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('image :>> ', image);
    setIsLoading(true)

    for ( const key in data) {
      if (key === "imagen") continue
      if (data[key] === "") {
        setWarn("Todos los campos son obligatorios");
        setIsLoading(false)
        return
      }
    }

    try {
      const formData = new FormData();
      formData.append("pathname", "users/tickets");

      console.log('data :>> ', data);

      for (const key in data) {
        formData.append(key, data[key]);
      }

      if (image) {
        formData.append("imagen", image.file);
      }

      const res = await axios.put(
        "http://localhost:3000/api/tickets/" + oldTicket._id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: token,
          },
        }
      );

      navigate("/")
      sessionStorage.clear()
      
      console.log("res.data :>> ", res.data);
    } catch (error) {
      setIsLoading(false)
      console.log("error :>> ", error);
    }
  };

  const handleInputChange = (e) => {
    if (warn) setWarn("");
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className=" w-full">
        <div className="md:px-20 px-5 pt-3 text-white ">
          <form
            className="flex items-center flex-col gap-5 pt-5 "
            onSubmit={handleSubmit}
            action=""
            encType="multipart/form-data"
          >
            <span className="text-red-600 w-full px-10 text-center">{warn}</span>
            <div className="flex md:flex-row flex-col w-full gap-5 ">
              <div className="flex-grow field">
                <input
                defaultValue={oldTicket.titulo}
                  className="bg-input rounded-xl"
                  placeholder="Título"
                  type="text"
                  name="titulo"
                  id="titulo"
                  onChange={handleInputChange}
                />
              </div>

              <div className="field">
                <select
                defaultValue={Number(oldTicket.visibilidad)}
                  className="bg-input rounded-xl py-2 px-4 "
                  name="visibilidad"
                  id="visibilidad"
                  onChange={handleInputChange}
                >
                  <option value="">Visibilidad</option>
                  <option value="1">Público</option>
                  <option value="0">Privado</option>
                </select>
              </div>
            </div>

            <textarea
            defaultValue={oldTicket.descripcion}
              rows="10"
              className="bg-input description py-3"
              type="text"
              placeholder="Descripción"
              name="descripcion"
              id="descripcion"
              onChange={handleInputChange}
            ></textarea>

            <div
              {...getRootProps()}
              className="sm:text-[16px] md:w-4/5 w-3/5 md:py-10 text-xs cursor-pointer img-inp"
            >
              <input {...getInputProps()} />
              Arrastra y suelta o da click para cargar una imagen
            </div>

            {image && (
              <div>
                <h3>Vista previa:</h3>
                <img src={image.imagePreview} />
              </div>
            )}

            <Spinner isLoading={isLoading} >

              <button className="gradient-gb py-2 px-6 rounded-full" type="submit">Enviar</button>
            </Spinner>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTicket;
