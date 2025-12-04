import React from 'react'
// import GetIcon from '../../utils/GetIcon';
// import assets from "../../assets/assets_frontend/assets";

import { FaCalendarAlt, FaHome } from 'react-icons/fa';
import { MdOutlineAddBox } from 'react-icons/md';
import { HiUserGroup } from "react-icons/hi2";
import { FaUserDoctor } from "react-icons/fa6";
import { assets } from '../../assets/assets_admin/assets';
import { FaTimes } from "react-icons/fa";
import AdminSideBar from '../../components/AdminSideBar';

const GetIcon = ({ id }) => {
    switch (id) {
        case "1": return <FaHome />
        case "2": return <FaCalendarAlt />
        case "3": return <MdOutlineAddBox />
        case "4": return <HiUserGroup />
        default:
            return null;
    }
}

const Box = ({ icon, number, type }) => {
    return <div className='flex-items gap-2  w-[200px] justify-evenly p-3 bg-main-color rounded-[10px] cursor-default'>
        <FaUserDoctor className='w-[30px] h-[30px] text-white' />
        <div className='gap-2 font-semibold flex-column'>
            <p>  {number} </p>
            <p> {type} </p>
        </div>
    </div>
}

const AllAppointments = () => {

    return <div className=''>
        <AdminSideBar />
        <div className='w-[85%] absolute right-0 p-4'>
            <div className='justify-center gap-5 flex-items'>
                <Box number="14" type="Doctors" />
                <Box number="2" type="Appointments" />
                <Box number="5" type="Patients" />
            </div>
            <div className='p-10'>
                <h2 className='font-bold text-[25px] pb-2'>Latest Appointment</h2>
                <div className='relative flex-items gap-2 p-3 bg-gray-300 rounded-[10px] '>
                    <FaTimes className='absolute right-5 top-[50%] text-[20px] cursor-pointer text-main-color' />
                    <div className='w-[100px] h-[100px] overflow-hidden rounded-full'>
                        <img
                            className='object-contain w-full h-full'
                            src={assets.profile_pic} draggable={false} />
                    </div>
                    <div className='gap-2 flex-column'>
                        <p>Dr. Richard James</p>
                        <p>Booking on 24th July, 2024</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AllAppointments