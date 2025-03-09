import DashboardCard from "./DashboardCard";

const TechnicianDashboard = () => {
    return (
        <>
          <div className="min-h-screen w-full text-white">
            <div className="py-9">
              <h1 className="text-4xl font-bold text-center"></h1>
    
            </div>

            <div className="p-10">
              <div className="card-box w-full">
                <DashboardCard label="Reportes" value="10"  bgc="bg-[#317bf3]" />
                <DashboardCard label="Reportes resueltos" value="5" bgc="bg-[#00cc6d]" />
                <DashboardCard label="Reportes no resueltos" value="5"  bgc="bg-[#fdac3c]" />
              </div>
            </div>
    
          </div>
        </>
      );
}
 
export default TechnicianDashboard;