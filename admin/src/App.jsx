import React from 'react'
import Login from './pages/Login'
import { useAdmin } from './providers/AdminProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import AddDoctor from './pages/Admin/AddDoctor';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorList from "./pages/Admin/DoctorList";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { useDoctor } from './providers/DoctorProvider';
import DoctorAppointments from './pages/Doctors/DoctorAppointments';
import DoctorProfile from './pages/Doctors/DoctorProfile';
import DoctorDashboard from './pages/Doctors/DoctorDashboard';

const App = () => {

  const { aToken } = useAdmin();
  const { dToken } = useDoctor();

  const adminRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />} >

        <Route index element={<></>} />
        <Route path='admin-dashboard' element={<AdminDashboard />} />
        <Route path='add-doctor' element={<AddDoctor />} />
        <Route path='all-appointments' element={<AllAppointments />} />
        <Route path='doctors-list' element={<DoctorList />} />

      </Route>
    )
  )

  const doctorRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />} >
        <Route index element={<></>} />
        <Route path="doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="doctor-appointments" element={<DoctorAppointments />} />
        <Route path="doctor-profile" element={<DoctorProfile />} />

      </Route>
    )
  )

  if (aToken) {
    return <div>
      <ToastContainer />
      <RouterProvider router={adminRouter} />
    </div>
  } else if (dToken) {
    return <>
      <ToastContainer />
      <RouterProvider router={doctorRouter} />
    </>
  } else {
    return <>
      <Login />
      <ToastContainer />
    </>
  }
}

export default App