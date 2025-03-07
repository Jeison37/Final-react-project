import DashboardCard from "./DashboardCard";

const TechnicalDashboard = () => {
    return (
        <>
          <div className="min-h-screen w-full text-white">
            <div className="py-9">
              <h1 className="text-4xl font-bold text-center"></h1>
    
            </div>

            <DashboardCard label="Reportes" value="10" color="#317bf3" />
            <DashboardCard label="Reportes resueltos" value="5" color="#00cc6d" />
            <DashboardCard label="Reportes no resueltos" value="5" color="#fdac3c" />
    
          </div>
        </>
      );
}
 
export default TechnicalDashboard;