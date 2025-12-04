import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { IoIosArrowDown } from 'react-icons/io';
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';
import { Link } from 'react-router';

import { FaTimes } from "react-icons/fa";


const SideBar = () => {

    const links = [
        {
            "id": 1,
            "to": "/home",
            "pageName": "Home",
            "isCurrentPage": true
        },
        {
            "id": 2,
            "to": "/doctors",
            "pageName": "Doctors",
            "isCurrentPage": false
        },
        {
            "id": 3,
            "to": "/about",
            "pageName": "About",
            "isCurrentPage": false
        },
        {
            "id": 4,
            "to": "/contact",
            "pageName": "Contact",
            "isCurrentPage": false
        }
    ]

    const [isOpen, setIsOpen] = useState(false);

    const [linksState, setLinksState] = useState(links);

    const changeLinksState = (id) => {

        const links = [...linksState];

        let newLinksState = [];
        for (let i = 0; i < links.length; i++) {
            if (i === id - 1) {
                newLinksState[newLinksState.length] = { ...links[i], isCurrentPage: true };
            } else {
                newLinksState[newLinksState.length] = { ...links[i], isCurrentPage: false };
            }
        }

        setLinksState(newLinksState);
    }

    return <nav className="w-full flex-between md:hidden">
        <div className="cursor-pointer w-[130px] md:w-[180px] overflow-hidden ">
            <img
                className="object-contain w-full"
                src={assets.logo}
                draggable={false}
            />
        </div>
        <div className={`fixed top-0 right-[100%] grid w-full h-full bg-white place-items-center ${isOpen ? "open" : "close"}`}>
            <FaTimes 
            onClick={() => {
                setIsOpen(false);
            }}
            className='absolute font-semibold top-5 right-5 text-[20px] cursor-pointer' 
            />
            <ul className="gap-2 flex-column w-[60%] h-[80%] text-center text-[25px] font-semibold pt-4">
                {
                    linksState.map(({ id, to, pageName, isCurrentPage }) => {
                        return <Link
                            onClick={() => changeLinksState(id)}
                            className={`${isCurrentPage ? "border-b-[3px] border-blue-500" : ""} w-[50%] mx-auto`}
                            key={id} to={to}>{pageName}</Link>
                    })
                }
            </ul>
        </div>
        <div className="h-full gap-3 pb-3 flex-items"
        >
            <div className="w-[40px] h-[40px] md:w-[45px] md:h-[45px] rounded-full overflow-hidden cursor-pointer">
                <img
                    className="w-full h-full"
                    src={assets.upload_area}
                    draggable={false}
                />
            </div>
            <IoIosArrowDown className="cursor-pointer" />
            <RxHamburgerMenu 
            onClick={() => {
                setIsOpen(true);
            }}
            className='md:hidden' 
            />
        </div>
        {/* <div
            // style={{ display: isHovered ? "block" : "none" }}
            className="absolute w-[200px] bg-[#f4f4f4] flex-column gap-3 top-14 right-0 p-3 rounded-[5px] hidden">
            <p className="transition duration-300 cursor-pointer hover:text-blue-500">My Profile</p>
            <p className="transition duration-300 cursor-pointer hover:text-blue-500">My Appointments </p>
        </div> */}
    </nav>
}

export default SideBar