import React from "react";
import ShapeSection from "../utils/ShapeSection";
import { assets } from "../assets/assets_frontend/assets";

const Booking = () => {
    return <ShapeSection
        desc1="Book Appointment"
        desc2="With Trusted Doctors"
        section="booking"
    >
        <div className='gap-2 flex-column md:flex-items md:w-[90%] mx-auto'>
            <div className='md:w-[50%]'>
                <img src={assets.group_profiles} draggable={false} />
            </div>
            <p className='text-[#fff]  w-[150%] md:w-[100%] text-center -ml-10'>
                Simply browse through our extensive list of trusted doctors,
                schedule your appointment hassle-free.
            </p>
        </div>
    </ShapeSection>
}

export default Booking