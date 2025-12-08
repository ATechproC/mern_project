import React from 'react'
import { assets } from "../../assets/assets_admin/assets"
import { useDoctor } from "../../providers/DoctorProvider"
import axios from "axios"
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from "react-toastify"

const DoctorProfile = () => {

    const { backendURL, dToken } = useDoctor();

    const [doctorProfileData, setDoctorProfileData] = useState({});

    const fetchDoctorProfileData = async () => {
        try {

            if (!dToken) toast.warn("Please login to get access to this resource");

            const { data: { data } } = await axios.post(backendURL + "/api/v1/doctors/profile", {}, {
                headers: {
                    Authorization: `Bearer ${dToken}`
                }
            })

            setDoctorProfileData(data);

        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    useEffect(() => {
        fetchDoctorProfileData();
    }, [])

    const change_availability = async () => {
        try {
            await axios.put(backendURL + `/api/v1/doctors/change-availability`, {}, {
                headers: {
                    Authorization: `Bearer ${dToken}`
                }
            })
            fetchDoctorProfileData();
            toast.success("Availability changed");
        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    return doctorProfileData &&
        <div className='w-[85%] absolute right-0 p-4'>
            <div className='gap-3 flex-items'>
                <div className='w-[200px] h-[200px] bg-secondary-color'>
                    <img
                        className='object-contain w-full h-full'
                        src={doctorProfileData.image} draggable={false} />
                </div>
                <div className='gap-2 flex-column'>
                    <p className='font-semibold text-[20px]'>Dr.{doctorProfileData.name}</p>
                    <p>{doctorProfileData.specialty}</p>
                    <p>Address</p>
                    <p>
                        {doctorProfileData.address}
                    </p>
                </div>
            </div>
            <div className='flex gap-5 p-3 font-bold text-center text-[20px]'>
                <input onChange={() => change_availability()} type='checkbox' checked={doctorProfileData.available} className='cursor-pointer' />
                <p>available</p>
            </div>
        </div>
}

export default DoctorProfile