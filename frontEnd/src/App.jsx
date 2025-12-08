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
import Appointment from "./pages/Appointment";
import NotFound from "./components/NotFound";
import MyProfile from "./components/MyProfile";
import Signup from "./components/Signup";
import Appointments from "./components/Appointments";
import ChangeSpecialityProvider from "./providers/ChangeSpecialityProvider";
import AppProvider from "./providers/AppProvider";
import { ToastContainer } from 'react-toastify';
import ForgotPassword from "./components/ResetPassword/ForgotPassword";
import VerifyResetCode from "./components/ResetPassword/VerifyResetCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";

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
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-resetCode" element={<VerifyResetCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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