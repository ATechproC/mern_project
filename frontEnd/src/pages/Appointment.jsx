import React, { useEffect, useState } from 'react'
import { doctors } from '../assets/assets_frontend/assets'
import BoxOfCards from '../components/BoxOfCards'
import SectionHeader from '../utils/SectionHeader';
import { useParams } from 'react-router';
import BookingSlots from '../components/BookingSlots';
import { useApp } from '../providers/AppProvider';
import { toast } from "react-toastify";
import axios from "axios"

const Appointment = () => {

    const { backendURL} = useApp();

    const { doctorId } = useParams();

    const [doctorData, setDoctorData] = useState([]);

    useEffect(() => {
        fetchDoctorData(doctorId);
    }, [doctorId])

    const fetchDoctorData = async () => {
        try {

            const { data : { data } } = await axios.get(backendURL + `/api/v1/doctors/${doctorId}`)
            setDoctorData(data);
        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }


    const [relatedDoctors, setRelatedDoctors] = useState([]);

    const getRelatedDoctors = () => {
        const relatedOnes = [];

        doctors.forEach(doctor => {
            if (doctor.speciality === doctorData.speciality && doctor._id !== doctorData._id) {
                relatedOnes.push(doctor);
            }
        })

        setRelatedDoctors(relatedOnes);
    }

    useEffect(() => {
        getRelatedDoctors();
    }, [doctorData])


    return doctorData &&
        <div className='mt-7'>
            <div className='flex gap-3'>
                <div className='w-[200px] bg-main-color rounded-[8px] overflow-hidden'>
                    <img className='w-[200px] h-full object-contain' src={doctorData.image} draggable={false} />
                </div>
                <div className='border-gray-600 border-[2px] p-5 flex-column gap-2 rounded-[8px]'>
                    <p className='text-[30px] front-bold'>{doctorData.speciality}</p>
                    <p className='font-semibold text-gray-600'>{doctorData.degree}</p>
                    <p>About</p>
                    <p className='text-[15px] text-gray-400'> {doctorData.about}</p>
                    <p>{doctorData.fees}</p>
                </div>
            </div>
            <BookingSlots doctorData={doctorData} doctorId={doctorId} />
            <div className='py-10'>
                <SectionHeader
                    title="Related Doctors"
                    description="Simply browse through our extensive list of trusted doctors."
                />
                <BoxOfCards doctors={relatedDoctors} />
            </div>
        </div>
}

export default Appointment