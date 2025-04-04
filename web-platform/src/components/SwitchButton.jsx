import {CONST}  from "../utils/constants";
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const SwitchButton = ({type}) => {

    if (type === CONST.LOGIN) {
        return (
            <>
            <Link to="/signup" className="switch-btn absolute top-8 right-6 text-lg flex rounded-full font-semibold overflow-hidden w-fit">
                <div className="bg-[#1B3D5A] py-2 px-4 ">
                    Signup
                </div>
                <div className="gradient-gb py-2 px-4 ">
                    Login
                </div>
            </Link>
            
            </>
        );
    } else if (type === CONST.SIGNUP) {
        return (
            <Link to="/login" className="switch-btn absolute top-8 right-6 text-lg flex rounded-full font-semibold overflow-hidden w-fit">
                <div className="gradient-gb py-2 px-4 ">
                    Signup
                </div>
                <div className="bg-[#1B3D5A] py-2 px-4 ">
                    Login
                </div>
            </Link>
            
        );
    }
}
 
export default SwitchButton;