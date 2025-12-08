import React, { useEffect } from 'react'
import { useApp } from '../providers/AppProvider'
import axios from "axios"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { useChangeSpeciality } from '../providers/ChangeSpecialityProvider'
// import { useDoctors } from '../providers/DoctorsPorvider'

const BoxOfCards = () => {

    const navigate = useNavigate();

    const { backendURL } = useApp();

    const { doctors, setDoctors } = useChangeSpeciality();

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
    }, []);

    return doctors && <div className='grid-cols-4 md:grid gap-7 flex-column'>
        {
            doctors.map(({ _id, name, specialty, image, available }) => {
                return <div
                    key={_id} className='border-gray-300 border-[1px] rounded-xl overflow-hidden hover:-translate-y-1 transition duration-300'>
                    <div onClick={() => {
                        navigate(`/appointments/${_id}`);
                        scrollTo(0, 0);
                    }} className='bg-secondary-color h-[300px] cursor-pointer'>
                        <img src={image} draggable={false} className='w-full h-full object-fit' />
                    </div>
                    <div className='p-3 bg-white'>
                        <div className='flex-items gap-2 text-left'>
                            <div className={`w-[10px] h-[10px] rounded-full ${available ? "bg-green-600" : "bg-red-600"}`} />
                            <label htmlFor='availablity' className={`font-bold ${available ? "text-green-600" : "text-red-600"}`}>Availablity</label>
                        </div>
                        <p className='font-bold text-[25px] text-center'>{name}</p>
                        <p className='text-[15px] text-gray-500 text-center'>{specialty}</p>
                    </div>
                </div>
            })
        }
    </div>
}

export default BoxOfCards