import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
      <div className="pt-16 pb-28 min-h-screen">
        <Outlet />
      </div>
    );
  };