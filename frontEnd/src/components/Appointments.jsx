import React from 'react'
import { useApp } from '../providers/AppProvider'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

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
            console.log(data)
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

    const cancelAppointment = async (appointmentId) => {
        try {

            const { data: { message } } = await axios.post(backendURL + "/api/v1/users/cancel-appointment", { appointmentId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(message);
            await fetchUserAppointments();
        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) navigate("/signup");
    }, [token])


    return <div>
        <p className='text-[25px] font-semibold py-5'>My appointments</p>
        {
            appointments.length > 0 ? <div>
                {
                    appointments.map((item, index) => {
                        return <div key={index} className='border-[2px] border-gray-400 relative'>
                            <div className=' flex-items gap-3'>
                                <div className='w-[200px] h-[200px] bg-secondary-color'>
                                    <img
                                        className='w-full h-full object-contain'
                                        src={item.doctorData.image} draggable={false} />
                                </div>
                                <div className='flex-column gap-2'>
                                    <p className='font-semibold text-[20px]'>Dr.{item.doctorData.name}</p>
                                    <p>{item.doctorData.specialty}</p>
                                    <p>Address</p>
                                    <p>
                                        {item.doctorData.address}
                                    </p>
                                    <p>Date & Time: 25, July, 2024 |  8:30 PM</p>
                                </div>
                            </div>
                            <div className='absolute bottom-5 right-8 flex-column gap-2'>

                                {
                                    !(item.cancelled) ? <>
                                        <button className=' bg-main-color px-3 py-1 rounded-[20px] text-white'>
                                            Pay here
                                        </button>
                                        <button
                                            onClick={() => cancelAppointment(item._id)}
                                            className=' border-[1px] border-black px-3 py-1 rounded-[20px]'>
                                            Cancel appointment
                                        </button>
                                    </>
                                        : <button
                                            className=' border-[1px] text-red-600 border-black px-3 py-1 rounded-[20px]'>
                                            Appointment Cancelled
                                        </button>
                                }

                            </div>
                        </div>
                    })
                }
            </div>
                : <></>
        }

    </div>
}

export default Appointments