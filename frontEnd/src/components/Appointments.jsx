import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useApp } from '../providers/AppProvider'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Appointments = () => {

    const { backendURL, token } = useApp();

    const [appointments, setAppointments] = useState([]);

    const fetchUserAppointments = async () => {
        try {
            const { data: { data } } = await axios.post(backendURL + "/api/v1/users/my-appointments", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAppointments(data);
        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    useEffect(() => {
        fetchUserAppointments();
    }, []);


    return <div className='relative'>
        <p className='text-[25px] font-semibold py-5'>My appointments</p>
        <div className='border-[2px] border-gray-400'>
            <div className=' flex-items gap-3'>
                <div className='w-[200px] h-[200px] bg-secondary-color'>
                    <img
                        className='w-full h-full object-contain'
                        src={assets.doc1} draggable={false} />
                </div>
                <div className='flex-column gap-2'>
                    <p className='font-semibold text-[20px]'>Dr. Richard James</p>
                    <p>General physician</p>
                    <p>Address</p>
                    <p>
                        57th Cross, Richmond
                        Circle, Church Road, London
                    </p>
                    <p>Date & Time: 25, July, 2024 |  8:30 PM</p>
                </div>
            </div>
            <div className='absolute bottom-5 right-8 flex-column gap-2'>
                <button className=' bg-main-color px-3 py-1 rounded-[20px] text-white'>Pay here</button>
                <button className=' border-[1px] border-black px-3 py-1 rounded-[20px]'>Cancel appointment</button>
            </div>
        </div>

    </div>
}

export default Appointments