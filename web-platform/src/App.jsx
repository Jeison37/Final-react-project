// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Login from './pages/Login';
import Signup from './pages/SignUp';
import NotFound from './pages/NotFound';
import { PrivateRoute } from './routes/PrivateRoute';
import { Routes, Route, useLocation } from "react-router-dom";
import CreateTicket from './pages/CreateTicket';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import TicketComments from './pages/TicketComments';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PremiumArea from './pages/PremiumArea';
import HomeUser from './pages/HomeUser';

function App() {
  const location = useLocation();

  //Definir las rutas en donde no quires que aparezca el navbar y el footer
  const hideNavbarFooter = ["/login", "/signup"];

  // Condicionar la visualizacion del navbar para que no aparesca en estas rutas
  // eslint-disable-next-line no-unused-vars
  const showNavbarFooter = !hideNavbarFooter.includes(location.pathname);
  return (
    <>
      {showNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />



        <Route element={<PrivateRoute />}>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomeUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ticket/create" element={<CreateTicket />} />
          <Route path="/ticket/:id" element={<TicketComments />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/area" element={<PremiumArea />} />


        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* {showNavbarFooter && <Footer />} */}
    </>
  );
}

export default App;


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
