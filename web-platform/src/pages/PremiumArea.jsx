import axios from "axios";
import { getCookie } from "../utils/cookie";

const PremiumArea = () => {
  const token = getCookie("token");


  const handleClick = async () => {
    try {
      console.log('token :>> ', token);
    const res = await axios.post('http://localhost:3000/api/paypal/create-order',
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log('res :>> ', res);
    window.location.replace(res.data.redirectUrl);

    } catch (error) {
      console.log(error);
    }
  }
    return ( 
        <>
      <div className=" flex justify-center items-center w-full text-white">
        <div className="flex-grow flex flex-col  justify-center items-center">
        <div className="py-8">
          <h1 className="text-4xl font-bold text-center">Area Premium</h1>
        </div>

            <div className="w-80  flex flex-col text-center px-2 py-9 gap-y-5 text-black items-center gradient-premium ">

              <div className="gap-y-3 flex flex-col items-center">
                
                  <p className="text-5xl textcenter w-fit font-semibold ">
                    5$
                  </p>
                  <p className="font-bold">Cada mes</p>
              </div>

              <hr className="border-black border-1 w-full" />

              <div className="flex flex-col gap-y-3 items-center ">

                <div className="mb-32">
                  <p className=" text-lg">Acceso a todas las funciones</p>
                  <p className=" text-lg">Chats en vivo</p>
                </div>


                <button onClick={ handleClick } className="bg-black py-2 px-4 rounded-lg active:bg-gray-700 text-white font-bold">Pagar con paypal</button>

                
              </div>

            </div>

        </div>

        
      </div>
        </>
     );
}
 
export default PremiumArea;