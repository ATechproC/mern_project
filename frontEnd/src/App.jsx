import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminForm from "./components/AdminForm";
import DoctorForm from "./components/DoctorForm";
import Appointment from "./pages/Appointment";
import NotFound from "./components/NotFound";
import MyProfile from "./components/MyProfile";
import Signup from "./components/Signup";
// import Login from "./components/Login";
import Appointments from "./components/Appointments";
// import AdminPaned1 from "./pages/Admin/AdminPaned1";
// import AdminPanel2 from "./pages/Admin/AdminPanel2";
import ChangeSpecialityProvider from "./providers/ChangeSpecialityProvider";
import AppProvider from "./providers/AppProvider";
import { ToastContainer } from 'react-toastify';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="doctors/:specialty" element={<Doctors />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="appointments/:doctorId" element={<Appointment />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="/my-profile" element={<MyProfile />} />
          {/* <Route path="/admin1" element={<AdminPaned1 />} /> */}
          {/* <Route path="/admin2" element={<AdminPanel2 />} /> */}
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminForm />} />
        <Route path="/doctor-login" element={<DoctorForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <div className="w-[80%] m-auto mt-[10px] overflow-hidden">
      <AppProvider>
        <ChangeSpecialityProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </ChangeSpecialityProvider>
      </AppProvider>
    </div>
  )
}

export default App