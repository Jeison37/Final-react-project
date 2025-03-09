// eslint-disable-next-line react/prop-types
const SignInput = ({label = "", Name, OnChangeVar, typeVar}) => {

    const pholder = label.toLowerCase();
    Name ??= pholder;

    return ( 
        <>
        
        <div className="w-full space-y-1">
            <div className="input w-full space-y-2">
              <label htmlFor="email" className="text-md">
                {label}
              </label>
              <div className="w-full h-10" >
                <input
                onChange={OnChangeVar}
                id={Name} name={Name}
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