import React from 'react'

const SectionHeader = ({title, description}) => {
    return <>
        <div className='w-full mx-auto text-center mb-7'>
            <h2 className='text-[30px] font-bold'> {title} </h2>
            <p className='md:w-[35%] mx-auto'> {description} </p>
        </div>
    </>
}

export default SectionHeader