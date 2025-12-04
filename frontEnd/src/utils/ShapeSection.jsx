import React from 'react'
import { MdArrowRightAlt } from 'react-icons/md'
import { assets } from '../assets/assets_frontend/assets'

const ShapeSection = ({ desc1, desc2, children, section }) => {
    return <div 
    style={{ marginTop : section === "booking" ? "0px" : "5px" }}
    className="w-full h-[500px] bg-main-color rounded-md">
        <div className='gap-5 p-7 md:flex-items w-[90%] h-full mx-auto'>
            <div className='p-3'>
                <div className='md:text-[35px] text-[20px] font-bold text-white w-fit mb-2'>
                    <h2> {desc1} </h2>
                    <h2> {desc2} </h2>
                </div>
                {children}
                <button className='px-4 py-2 mt-5 bg-white rounded-[20px] flex-items gap-1 text-md'>
                    Book Appointment
                    <MdArrowRightAlt className='text-2xl' />
                </button>
            </div>
            {
                section === "booking" ? <div className='w-[88%]'>
                    <img src={assets.header_img} draggable={false} />
                </div> : <div className='w-[50%] md:h-[90%] h-[60%] overflow-hidden mx-auto'>
                    <img
                        className='w-full h-full'
                        src={assets.appointment_img} draggable={false} />
                </div>
            }
        </div>
    </div>
}

export default ShapeSection