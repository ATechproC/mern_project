import React from 'react'
import Login from './pages/Login'
import { useAdmin } from './providers/AdminProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import AdminDashboard from './pages/Admin/AdminDashboard'
import AddDoctor from './pages/Admin/AddDoctor';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorList from "./pages/Admin/DoctorList";

const App = () => {

  const { aToken } = useAdmin();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />} >
        <Route path='admin-dashboard' element={<AdminDashboard />} />
        <Route path='add-doctor' element={<AddDoctor />} />
        <Route path='all-appointments' element={<AllAppointments />} />
        <Route path='doctors-list' element={<DoctorList />} />
      </Route>
    )
  )

  return aToken
    ? <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
    : <>
      <Login />
      <ToastContainer />
    </>;
}

export default App