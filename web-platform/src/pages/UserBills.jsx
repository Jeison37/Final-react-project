import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import axios from "axios";
import { BillComponent } from "../components/BillComponent";
import { useParams } from "react-router-dom";

const Bills = () => {
  const [bills, setBills] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/bills/${params.user}`, {
          headers: {
            authorization: getCookie("token"),
          },
        });
        if (res.status === 200) {
            console.log('res.data :>> ', res.data);
          setBills(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBills();
  }, []);

  return (
    <>
      <div className=" w-full text-white">
        <div className="py-9">
          <h1 className="text-4xl font-bold text-center">
            Facturas
          </h1>

          <div className="space-y-3">

            {bills?.facturas.map( bill => {

                return (
                <BillComponent key={bill._id} bill={bill}  name={bills.name} email={bills.email}/>
                        )
                }
                )

        
            }

          </div>
        </div>

        
      </div>
    </>
  );
};

export default Bills;
