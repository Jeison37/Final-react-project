const ProfileRow = ({label = "", valueVar = "", idVar, changeVar}) => {
    idVar ??= label.toLocaleLowerCase();
    return ( 
        <>
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8 ">
            <div className="">
              <h2 className="font-bold text-lg">{ label }</h2>

            </div>

            <div className="">
              <input className="bg-[#000] px-2 py-1 border-solid rounded-lg border-black  border-2" type="text" name={idVar} id={idVar} value={valueVar} onChange={changeVar} />
            </div>
          </div>
        </>
     );
}
 
export default ProfileRow;