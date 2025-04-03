export const MessageComponent = ({ idu, idm, userData, content = ""}) => {
  return (
    <>
      <div
        className={
          "flex w-full " + (idm == idu ? "justify-end" : "justify-start")
        }
      >
        <div className={"flex px-2 pt-2 md:max-w-3xl max-w-xs " + (idm == idu ? "justify-end" : "justify-start") }>

            <div className={"flex gap-x-2 " + (idm == idu ? " flex-row-reverse" : "") }>
                <div className="flex flex-shrink-0 h-full items-end pt-1">
                    <div className="picture">
                    <div className="md:size-10 size-8 rounded-full  overflow-hidden bg-white">
                        <img
                        className="size-full"
                        src={
                            userData.imagen ??
                            "http://localhost:3000/images/users/profiles/default.webp"
                        }
                        alt=""
                        />
                    </div>
                    </div>
                </div>
                <div className={"flex px-2 pt-2 pb-4  break-words " +
                (idm == idu ? "secondary-bg" : "primary-bg")}>
                    <p className=" text-pretty whitespace-normal">{content}</p>
                </div>
            </div>

            
        </div>
      </div>
    </>
  );
};
