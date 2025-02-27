// eslint-disable-next-line react/prop-types
const SignInput = ({label = "", Name, valueVar}) => {

    const pholder = label.toLowerCase();
    Name ??= pholder;

    return ( 
        <>
        
        <div className=" w-full space-y-1">
            <div className="input w-full space-y-2">
              <label htmlFor="email" className="text-md">
                {label}
              </label>
              <div className="w-full h-10" id={Name} name={Name}>
                <input
                value={valueVar}
                  className=" size-full px-4 py-4 bg-black"
                  placeholder={"Ingresa tu " + pholder }
                />
              </div>
            </div>
        </div>
        
        </>
     );
}
 
export default SignInput;