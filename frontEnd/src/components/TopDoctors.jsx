import React from 'react'
import SectionHeader from '../utils/SectionHeader'
import BoxOfCards from './BoxOfCards'

const TopDoctors = () => {


    return <div className='my-20 text-center'>
        <SectionHeader
            title="Top Doctors to Book"
            description="Simply browse through our extensive list of trusted doctors."
        />
        <BoxOfCards />
        <button className='px-10 py-2 mt-10 bg-secondary-color w-fit rounded-[10px] text-gray-500 mx-auto hover:-translate-y-[2px] transition duration-300'>more</button>
    </div>
}

export default TopDoctors