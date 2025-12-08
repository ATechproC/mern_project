import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../components/AdminSideBar'
import { toast } from 'react-toastify';
import axios from "axios"
import { useDoctor } from '../../providers/DoctorProvider';
import { FaCheck, FaTimes } from 'react-icons/fa';

const DoctorAppointments = () => {

    const [doctorAppointments, setDoctorAppointments] = useState([]);

    const { backendURL, dToken } = useDoctor();

    const fetchDoctorAppointments = async () => {
        try {
            if (!dToken) return toast.warn("Please Login in");

            const { data: { data } } = await axios.post(backendURL + "/api/v1/doctors/appointments", {}, {
                headers: {
                    Authorization: `Bearer ${dToken}`
                }
            })

            setDoctorAppointments(data);

        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    useEffect(() => {
        fetchDoctorAppointments();
    }, [])

    const cancelAppointment = async (id) => {
        if (!dToken) return toast.warn("Please Login");
        try {

            const { data: { message } } = await axios.post(backendURL + `/api/v1/doctors/cancel-appointment/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${dToken}`
                }
            })

            toast.success(message);
            await fetchDoctorAppointments();

        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    const calculateAge = (date) => {
        const today = new Date();
        const dateOfBirth = new Date(date);
        return today.getFullYear() - dateOfBirth.getFullYear();
    }

    const completedAppointment = async (id) => {
        try {
            if (!dToken) toast.warn("Please log in");
            const { data: { message } } = await axios.post(backendURL + `/api/v1/doctors/complete-appointment/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${dToken}`
                }
            })
            toast.success(message);
        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    return <>
        <table className='w-[80%] absolute right-8 border-[2px] border-gray-500 p-5'>
            <caption className='font-semibold text-start p-2 text-[25px]'>
                All Appointments
            </caption>
            <thead className='bg-gray-500 p-5 w-[100%]'>
                <tr>
                    <th>#</th>
                    <th>Age</th>
                    <th>Date & Time</th>
                    <th>Doctor</th>
                    <th>Fees</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    (doctorAppointments && doctorAppointments.length > 0) && doctorAppointments.map((item, index) => {
                        return <tr key={index} className='text-center border-b-2 border-black'>
                            <td> {index + 1} </td>
                            <td className='gap-2 flex-center'>
                                <div className='w-[80px] h-[80px] overflow-hidden rounded-full'>
                                    <img
                                        className='object-contain w-full h-full'
                                        src={item.doctorData.image} draggable={false} />
                                </div>
                                <p> {item.doctorData.name} </p>
                            </td>
                            <td> {calculateAge(item.userData.birthday)} </td>
                            <td>24th July, 2024, 10:AM</td>
                            <td>${item.amount}</td>
                            <td className='relative'>
                                <div className='absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2'>
                                    {
                                        !item.cancelled ?
                                            <FaTimes
                                                onClick={() => cancelAppointment(item._id)}
                                                className=' text-red-500 text-[20px] cursor-pointer' />
                                            : <span className='absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-red-500 font-bold'>cancelled</span>
                                    }
                                </div>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>
}

//  <span className='absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-red-500'>cancelled</span>


export default DoctorAppointments