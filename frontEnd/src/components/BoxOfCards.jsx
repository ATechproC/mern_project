import React, { useEffect, useState } from 'react'
import { useApp } from '../providers/AppProvider'
import axios from "axios"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const BoxOfCards = () => {

    const navigate = useNavigate();

    const { backendURL } = useApp();

    const [doctors, setDoctors] = useState([]);

    const getAllDoctors = async () => {
        try {
            const { data: { data } } = await axios.get(backendURL + "/api/v1/doctors");
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
    }, [])

    if (doctors.length > 0)
        return <div className='grid-cols-4 md:grid gap-7 flex-column'>
            {
                doctors.map(({ _id, name, speciality, image }) => {
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
                    </div>
                })
            }
        </div>

    return <></>;
}

export default BoxOfCards