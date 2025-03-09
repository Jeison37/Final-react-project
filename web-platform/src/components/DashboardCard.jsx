const DashboardCard = ({label = "", value = "", color, bgc = ""}) => {
  return (
    <>
      <div className=" flex rounded-xl overflow-hidden">

        <div className={ bgc +  "  flex-shrink-0 size-28"}></div>

        <div className="flex-grow bg-[#23282d] ">

          <div className="flex flex-col h-full justify-between py-3 px-4">

            <p className="text-[#aaa] text-end">{label}</p>

            <span className="text-end text-white text-2xl">{value} </span>

          </div>

        </div>

      </div>
    </>
  );
};

export default DashboardCard;
