const ProfileRow = ({label = "", valueVar = "", idVar, changeVar}) => {
    idVar ??= label.toLocaleLowerCase();
    return ( 
        <>
          <div className=" px-4 py-8 sm:px-6 lg:px-8 ">
            <div className="">
              <h2 className="font-bold text-lg">{ label }</h2>

            </div>

            <div className="h-9 max-w-80">
              <input className="bg-[#000] size-full px-2 py-1 border-solid rounded-lg border-black  border-2" type="text" name={idVar} id={idVar} value={valueVar} onChange={changeVar} />
            </div>
          </div>
        </>
     );
}
 
export default ProfileRow;