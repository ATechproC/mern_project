import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAdmin } from "../providers/AdminProvider"
import axios from "axios"
import { toast } from "react-toastify"

const AllDoctor = () => {

    const { aToken, backendURL } = useAdmin();

    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);

    const getAllDoctors = async () => {
        try {
            const { data: { data } } = await axios.post(backendURL + "/api/v1/admin/all-doctors", {}, {
                headers: {
                    Authorization: `Bearer ${aToken}`
                }
            });
            setDoctors(data);
        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    useEffect(() => {
        getAllDoctors();
    }, []);

    const change_availability = async (_id) => {
        try {
            await axios.post(backendURL + `/admin/change-availability/${_id}`, {}, {
                headers: {
                    Authorization: `Bearer ${aToken}`
                }
            })
            getAllDoctors();
            toast.success("Availability changed");
        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    if (aToken && doctors.length > 0)
        return <div className='grid-cols-4 md:grid gap-7 flex-column w-[85%] absolute right-0 p-10'>
            {
                doctors.map(({ _id, name, speciality, image, available }) => {
                    return <div
                        key={_id} className='border-gray-300 border-[1px] rounded-xl overflow-hidden hover:-translate-y-1 transition duration-300'>
                        <div onClick={() => {
                            navigate(`/appointments/${_id}`);
                            scrollTo(0, 0);
                        }} className='bg-secondary-color h-[300px] cursor-pointer'>
                            <img src={image} draggable={false} className='w-full h-full object-fit' />
                        </div>
                        <div className='p-3 text-center bg-white'>
                            <p className='font-semibold text-[15px]'>{name}</p>
                            <p className='text-[13px] text-gray-400'>{speciality}</p>
                        </div>
                        <div className='flex gap-5 p-3 text-center'>
                            <input onChange={() => change_availability(_id)} type='checkbox' checked={available} className='cursor-pointer' />
                            <p>available</p>
                        </div>
                    </div>
                })
            }
        </div>
}

export default AllDoctor