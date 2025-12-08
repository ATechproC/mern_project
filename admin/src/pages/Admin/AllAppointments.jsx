


import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../components/AdminSideBar'
import { assets } from '../../assets/assets_admin/assets'
import { useAdmin } from '../../providers/AdminProvider';
import { toast } from 'react-toastify';
import axios from "axios"

const AllAppointments = () => {

    const [appointments, setAppointments] = useState([]);

    const { backendURL, aToken } = useAdmin();

    const fetchAllAppointments = async () => {
        try {
            if (!aToken) return toast.warn("Please Login in");

            const { data: { data } } = await axios.get(backendURL + "/api/v1/admin/appointments", {
                headers: {
                    Authorization: `Bearer ${aToken}`
                }
            })

            setAppointments(data);
            console.log(data);

        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    useEffect(() => {
        fetchAllAppointments();
    }, [])

    const cancelAppointment = async (id) => {
        if (!aToken) return toast.warn("Please Login");
        try {

            const { data: { message } } = await axios.post(backendURL + `/api/v1/admin/cancel-appointment/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${aToken}`
                }
            })

            toast.success(message);
            await fetchAllAppointments();

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

    return <>
        <AdminSideBar />
        <table className='w-[80%] absolute right-8 border-[2px] border-gray-500 p-5'>
            <caption className='font-semibold text-start p-2 text-[25px]'>
                All Appointments
            </caption>
            <thead className='bg-gray-500 p-5 w-[100%]'>
                <tr>
                    <th>#</th>
                    <th>Patient</th>
                    <th>Department</th>
                    <th>Age</th>
                    <th>Date & Time</th>
                    <th>Doctor</th>
                    <th>Fees</th>
                </tr>
            </thead>
            <tbody>
                {
                    (appointments && appointments.length > 0) && appointments.map((item, index) => {
                        return <tr key={index} className='text-center border-b-2 border-black'>
                            <td> {index + 1} </td>
                            <td className='gap-2 flex-center'>
                                <div className='w-[80px] h-[80px] overflow-hidden rounded-full'>
                                    <img
                                        className='object-contain w-full h-full'
                                        src={item.userData.image} draggable={false} />
                                </div>
                                <p>{item.userData.name}</p>
                            </td>
                            <td>Youtube username</td>
                            <td> {calculateAge(item.userData.birthday)} </td>
                            <td>24th July, 2024, 10:AM</td>
                            <td className='gap-2 flex-center'>
                                <div className='w-[80px] h-[80px] overflow-hidden rounded-full'>
                                    <img
                                        className='object-contain w-full h-full'
                                        src={item.doctorData.image} draggable={false} />
                                </div>
                                <p> {item.doctorData.name} </p>
                            </td>
                            <td>${item.amount}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>
}


export default AllAppointments