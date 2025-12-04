import React from "react";
import Booking from "../components/Booking"
import Speciality from "../components/Speciality";
import TopDoctors from "../components/TopDoctors";
import CreateAccount from "../components/CreateAccount";
import Footer from "../components/Footer";

const Home = () => {
  return <>
    <Booking />
    <Speciality />
    <TopDoctors />
    <CreateAccount />
    <Footer />
  </>
}

export default Home