import SwitchButton from "./SwitchButton";

// eslint-disable-next-line react/prop-types
const SignForm = ({children,type}) => {
    // alexico rogadain (fb)
    return ( 
        <>
<div className="w-screen h-screen bg-white flex justify-center items-center">
    <div className="max-w-[1312px] shadow-2xl shadow-black text-white w-full max-h-[812px] h-full grid grid-cols-2">
        <div className="left-side gradient-gb flex flex-col justify-center items-center">

            <div className="flex flex-col ">

            <h1 className="text-4xl font-bold text-center">Gestión de problemas y <br/> soluciones</h1>

            </div>

        </div>

        <div className="right-side flex items-center relative bg-[#1d2a3d] ">

            <SwitchButton type={type}/>

            {children}
            

        </div>
    
    </div>
</div>
        </>
     );
}
 
export default SignForm;