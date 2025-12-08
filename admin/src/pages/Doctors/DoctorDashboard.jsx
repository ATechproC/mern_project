import React from 'react'

import { FaCalendarAlt, FaHome } from 'react-icons/fa';
import { MdOutlineAddBox } from 'react-icons/md';
import { HiUserGroup } from "react-icons/hi2";
import { FaUserDoctor } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useState } from 'react';
import { useDoctor } from '../../providers/DoctorProvider';
import { toast } from 'react-toastify'
import { useEffect } from 'react';
import axios from "axios"

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

const DoctorDashboard = () => {

    const [dashData, setDashData] = useState({});

    const [latestAppointments, setLatestAppointments] = useState([]);

    const { dToken, backendURL } = useDoctor();

    const fetchDashData = async () => {
        try {

            if (!dToken) return toast.warn("Please login");

            const { data: { data } } = await axios.post(backendURL + "/api/v1/doctors/get-dashData", {}, {
                headers: {
                    Authorization: `Bearer ${dToken}`
                }
            })
            setDashData(data);
            setLatestAppointments(data.latestAppointments);
            console.log(data);

        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    useEffect(() => {
        fetchDashData();
    }, [])

    return <div className=''>
        <div className='w-[85%] absolute right-0 p-4'>
            {
                dashData && <div className='justify-center gap-5 flex-items'>
                    <Box number={dashData.earings} type="Earings" />
                    <Box number={dashData.appointments} type="Appointments" />
                    <Box number={dashData.patients} type="Patients" />
                </div>
            }
            <div className='p-10'>
                <h2 className='font-bold text-[25px] pb-2'>Latest Appointments</h2>
                < div className='gap-3 flex-column' >
                    {
                        (latestAppointments && latestAppointments.length > 0) && latestAppointments.map((item, index) => {
                            return < div key={index} className='relative flex-items gap-2 p-3 bg-gray-300 rounded-[10px] '>
                                {
                                    !item.cancelled ? <FaTimes
                                        onClick={() => cancelAppointment(item._id)}
                                        className='absolute right-5 top-[50%] text-[20px] cursor-pointer text-main-color' />
                                        : <button
                                            className='absolute right-5 top-[50%] text-red-500 font-semibold'>
                                            Cancelled
                                        </button>
                                }
                                <div className='w-[100px] h-[100px] overflow-hidden rounded-full'>
                                    <img
                                        className='object-contain w-full h-full'
                                        src={item.doctorData.image} draggable={false} />
                                </div>
                                <div className='gap-2 flex-column'>
                                    <p>Dr. {item.doctorData.name}</p>
                                    <p>Booking on 24th July, 2024</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div >
    </div >
}

export default DoctorDashboard