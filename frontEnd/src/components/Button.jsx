import React from 'react'
import { useChangeSpeciality } from '../providers/ChangeSpecialityProvider'
import { useNavigate } from 'react-router';
import slugify from 'slugify';

const Button = ({ speciality }) => {

    const { speciality: sp } = useChangeSpeciality();
    const navigate = useNavigate();

    return <div
        onClick={() => navigate(`/doctors/${slugify(speciality)}`)}
        className={`whitespace-nowrap capitalize px-3 py-1 mx-auto hover:bg-green-500 min-w-[170px] border-[1px] rounded-[3px] border-gray-500 cursor-pointer transition-all duration-300 bg-secondary-color text-main-color font-semibold hover:text-white ${speciality === sp ? "bg-green-500 text-white" : ""}`}>
        {speciality === "general-physician" ? "general physician": speciality }
    </div>
}

export default Button