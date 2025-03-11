import axios from "axios";
import { useCallback, useState } from "react";
import { getCookie } from "../utils/cookie";
import { useDropzone } from "react-dropzone";

const CreateTicket = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        titulo: "",
        descripcion: "",
        visibilidad: "",
        imagen: null
    })

    const onDrop = useCallback((acceptedFiles) => {
      // Verificar si se ha subido un archivo
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.type.startsWith("image/")) {
          // Leer la imagen y mostrarla como vista previa
          const reader = new FileReader();
          reader.onload = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          alert("Por favor, sube solo imágenes.");
        }
      }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: "image/*", 
    });
   

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const token = getCookie("token");
        
        try{
            const formData = new FormData();
            formData.append("pathname", "users/tickets");
        
            for (const key in data) {
              formData.append(key, data[key]);
            }
            
            if (image) {
              formData.append("imagen", image);
            }

            const res = await axios.post("http://localhost:3000/api/tickets/", 
                formData,
                {
                    headers:{
                        "Content-Type": "multipart/form-data",
                        authorization: token
                    }
                }
            );
            console.log('res.data :>> ', res.data);

        }catch(error){
            console.log('error :>> ', error);
        }

    }

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };




    return ( 
        <>
      <div className="min-h-screen w-full">

      <div className="md:px-20 px-5 text-white ">
      <form className="flex items-center flex-col gap-5 pt-5 " onSubmit={handleSubmit} action=""
        encType="multipart/form-data">


        <div className="flex md:flex-row flex-col w-full gap-5 ">

          <div className="flex-grow field">

            <input className="bg-input rounded-xl" type="text" name="titulo" id="titulo" onChange={handleInputChange}/>

          </div>

          <div className="field">

            <select className="bg-input rounded-xl py-2 px-4 "  name="visibilidad" id="visibilidad" onChange={handleInputChange}>
                    <option value="">Visibilidad</option>
                    <option value="1">Público</option>
                    <option value="0">Privado</option>
            </select>

          </div>


        </div>


        <textarea rows="10" className="bg-input description py-3"  type="text" name="descripcion" id="descripcion" onChange={handleInputChange} ></textarea>

        <div {...getRootProps()} className="sm:text-[16px] md:w-4/5 w-3/5 md:py-10 text-xs img-inp">
        <input {...getInputProps()} />
Arrastra y suelta o da click para cargar una imagen
        </div>

        {image && (
        <div>
          <h3>Vista previa:</h3>
          <img
            src={image}
          />
        </div>
      )}

        <button type="submit">Enviar</button>
      </form>

    </div>

      </div>
        </>
     );
}
 
export default CreateTicket;