import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
const Footer = () => {
    return <>
        <div className='mt-14 flex-between'>
            <div className='md:w-[45%] my-4 text-center md:text-left'>
                <div>
                    <img src={assets.logo} draggable={false} />
                </div>
                <p className='my-5 text-gray-500'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
            <div className='hidden gap-10 md:flex'>
                <div>
                    <h2 className='text-[20px] font-bold'>COMPANY</h2>
                    <ul>
                        <li className='text-gray-500 cursor-pointer text-md'>Home</li>
                        <li className='text-gray-500 cursor-pointer text-md'>About us</li>
                        <li className='text-gray-500 cursor-pointer text-md'>Delivery</li>
                        <li className='text-gray-500 cursor-pointer text-md'>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-[20px] font-bold mb-5 '>GET IN TOUCH</h2>
                    <p className='text-gray-500'>choraichianass@gmail.com</p>
                </div>
            </div>
        </div>
        <hr />
        <p className='m-3 text-center'>Copyright 2024 @ ATechproC.dev - All Right Reserved.</p>
    </>
}

export default Footer