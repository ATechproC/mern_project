import React from 'react'
import SectionHeader from '../utils/SectionHeader'
import { specialityData } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router'
import slugify from 'slugify'


const Speciality = () => {

    const navigate = useNavigate();

    return <div className='my-20'>
        <SectionHeader
            title="Find by Speciality"
            description="Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free."
        />
        <div
            className='gap-5 mx-auto md:gap-10 flex-column md:flex-row md:flex-items w-fit'>
            {
                specialityData.map(({ speciality, image }, index) => {
                    return <div
                        onClick={() => {
                            navigate(`/doctors/${slugify(speciality)}`);
                            scrollTo(0, 0);
                        }}
                        key={index} className='gap-3 transition duration-300 cursor-pointer flex-column hover:-translate-y-1'>
                        <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                            <img
                                className='w-full h-full'
                                src={image} draggable={false} />
                        </div>
                        <p> {speciality} </p>
                    </div>
                })
            }
        </div>
    </div>
}

export default Speciality