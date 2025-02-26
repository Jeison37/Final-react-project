import axios from "axios";
import { useState } from "react";

const CreateTicket = () => {
    const [data, setdata] = useState({
        titulo: "",
        descripcion: "",
        visibilidad: "",
        imagen: null
    })


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const token = localStorage.getItem("token");

        try{
            const res = await axios.post("http:localhost:3000/api/tickets", 
                {
                    ...data,
                    headers:{
                        authorization: token
                    }
                }
            );
            const info = res.data;
        }catch(error){
            console.log('error :>> ', error);
        }






    }

    return ( 
        <>
        <form className="" onSubmit={handleSubmit} action="">

            <input type="text" name="titulo" id="titulo" value={data.titulo} />

            <input type="text" name="descripcion" id="descripcion" value={data.descripcion} />

            <select name="visibilidad" id="visibilidad" value={data.visibilidad}>
                <option value="">Visibilidad</option>
                <option value="0">Público</option>
                <option value="">Privado</option>
            </select>

            <input type="text" name="visibilidad" id="visibilidad" />

        </form>
        </>
     );
}
 
export default CreateTicket;