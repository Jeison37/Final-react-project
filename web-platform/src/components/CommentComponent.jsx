import { CONST } from "../utils/constants";
import { formatDate } from "../utils/formatDate";

export const CommentComponent = ({ comment, author, setRefresh }) => {
  
  let tag = "";
  let colorUsername = " text-white";
  let bgTag = "";

    // Revisamos si el id del autor del ticket es el mismo del autor del comentario
    if (author === comment.usuario._id) {
        tag = "Autor";
        colorUsername = " text-[#7ED0FF]";
        bgTag = " bg-[#7ED0FF]";
    } else if (comment.usuario.rol === CONST.ROL.TECHNICIAN) {
        tag = "Técnico";
        colorUsername = " text-[#00cc6d]";
        bgTag = " bg-[#00cc6d]";
    }

    const {formattedDate, formattedTime} = formatDate(comment.createdAt);
    

  return (
    <>
      <div className="comment" key={comment._id}>
        <div className="flex items-start">
          <div className="flex items-center gap-x-1 pt-1">
            <div className="picture">
              <div className="md:size-10 size-8 rounded-full flex-shrink-0 overflow-hidden bg-white">
              <img
                className="size-full"
                src={
                  comment.usuario.imagen
                    ?? "http://localhost:3000/images/users/profiles/default.webp"
                    
                }
                alt=""
              />
              </div>
            </div>

            <div className="triangle w-5 h-7 md:w-6 md:h-8"></div>
          </div>
        </div>

        <div className="content bg-[#1b3d5a] md:text-[16px] text-[12px]">
          <div className="content__head">
            <div className=" px-3 py-2 w-full flex justify-between ">
              <div className="user-info flex items-center gap-3 md:gap-5">
                <h2 className={"font-bold" + colorUsername}>{comment.usuario.username}</h2>

                <span className={"tag-author sm:text-[16px] text-[10px] px-2 py-1 sm:px-1 sm:py-0.5 " + bgTag}>
                  { tag }
                </span>

                <div className="flex flex-col">
                  <span className="text-gray-400">{formattedDate}</span>

                  <span className="text-gray-400">{formattedTime}</span>
                </div>
              </div>

              <button className="text-white font-semibold">Editar</button>
            </div>
          </div>

          <div className="pt-2 px-4 pb-6 text-white ">
            <p className="">{comment.contenido}</p>
          </div>
        </div>
      </div>
    </>
  );
};
