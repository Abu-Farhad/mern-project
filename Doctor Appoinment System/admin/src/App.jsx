import React, { useContext } from "react";
import Login from "./pages/Login";
// import { AppContext } from './context/AppContext'
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";


export default function App() {
  const { atoken } = useContext(AdminContext);
  return (
    <>
      {" "}
      {atoken ? (
        <div className="bg-[#F8F9FD]">
          <Navbar/>
          <ToastContainer/>
          
          <div className="flex items-start">
            <Sidebar/>
            <Routes>
              <Route path="/" element={<></>}/>
              <Route path="/admin-dashboard" element={<Dashboard/>}/>
              <Route path="/all-appointments" element={<AllAppointments/>}/>
              <Route path="/add-doctor" element={<AddDoctor/>}/>
              <Route path="/doctor-list" element={<DoctorsList/>}/>
            </Routes>
          </div>
        </div>
      ) : (
        <div>
          <Login />
          
        </div>
      )}
    </>
  );
}
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";

// export default App;
