import axios from "axios";
import { useState } from "react";
import { getCookie } from "../utils/cookie";

const CreateTicket = () => {
    const [imagen, setImagen] = useState(null);
    const [data, setData] = useState({
        titulo: "",
        descripcion: "",
        visibilidad: "",
        imagen: null
    })


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const token = getCookie("token");

        
        
        try{
            const formData = new FormData();
            formData.append("pathname", "users/tickets");
        
            for (const key in data) {
              formData.append(key, data[key]);
            }
            
            if (imagen) {
              formData.append("imagen", imagen);
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

            <form className="flex gap-4 pt-5" onSubmit={handleSubmit} action="" encType="multipart/form-data">

                <input type="text" name="titulo" id="titulo" onChange={handleInputChange}/>

                <input type="text" name="descripcion" id="descripcion" onChange={handleInputChange}/>

                <select name="visibilidad" id="visibilidad" onChange={handleInputChange}>
                    <option value="">Visibilidad</option>
                    <option value="1">Público</option>
                    <option value="0">Privado</option>
                </select>

                <div className="">
                <input className="bg-black" type="file" name="imagen" id="imagen" onChange={(e) => setImagen(e.target.files[0])} />
              </div>

                <button type="submit">Enviar</button>
            </form>

      </div>
        </>
     );
}
 
export default CreateTicket;