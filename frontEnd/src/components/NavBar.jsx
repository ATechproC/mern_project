import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets';
import { Link } from 'react-router';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router';
import { useApp } from '../providers/AppProvider';

const NavBar = () => {

    const { token, setToken, userData } = useApp();

    const navigate = useNavigate();

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

    const [isHovered, setIsHovered] = useState(false)

    const whileMouseHovered = (status) => {
        status === "enter" ? setIsHovered(true) : setIsHovered(false);
    }

    const logOut = () => {
        setToken("");
        localStorage.removeItem("token");
    }

    return <nav className="relative px-5 flex-between">
        <div
            onClick={() => {
                navigate("/");
                scrollTo(0, 0);
            }}
            className="cursor-pointer w-[180px] overflow-hidden">
            <img
                className="object-contain w-full"
                src={assets.logo}
                draggable={false}
            />
        </div>
        <ul className="gap-5 text-md flex-between">
            {
                linksState.map(({ id, to, pageName, isCurrentPage }) => {
                    return <Link
                        onClick={() => changeLinksState(id)}
                        className={`${isCurrentPage ? "border-b-2 border-blue-500" : ""}`}
                        key={id} to={to}>{pageName}</Link>
                })
            }
            <button
                // onClick={() => {
                //     navigate("/admin")
                // }}
                className="border-gray-400 border-[1px] text-sm rounded-2xl py-[2px] px-[10px]">Admin panel</button>
        </ul>
        {
            token && <div className="h-full gap-3 pb-3 flex-items"
                onMouseEnter={() => whileMouseHovered("enter")}
                onMouseLeave={() => whileMouseHovered("leave")}
            >
                <div
                    onClick={() => navigate("/my-profile")}
                    className="w-[45px] h-[45px] rounded-full overflow-hidden cursor-pointer">
                    <img
                        className="w-full h-full"
                        src={userData.image ? userData.image : assets.upload_area}
                        draggable={false}
                    />
                </div>
                <IoIosArrowDown className="cursor-pointer" />
            </div>
        }
        {
            !token ? <button
                onClick={() => navigate("/signup")}
                className='px-4 py-1 text-white bg-main-color rounded-[10px] font-semibold'>Create Account</button>
                : <div
                    style={{ display: isHovered ? "block" : "none" }}
                    onMouseEnter={() => whileMouseHovered("enter")}
                    onMouseLeave={() => whileMouseHovered("leave")}
                    className="absolute w-[200px] bg-[#f4f4f4] flex-column gap-3 top-14 right-0 p-3 rounded-[5px] hidden">
                    <p
                        onClick={() => {
                            navigate('/my-profile')
                        }}
                        className="transition duration-300 cursor-pointer hover:text-blue-500">My Profile</p>
                    <p
                        onClick={() => {
                            navigate('/appointments')
                        }}
                        className="transition duration-300 cursor-pointer hover:text-blue-500">My Appointments </p>
                    <button
                        onClick={logOut}
                        className='transition duration-300 cursor-pointer hover:text-blue-500'>Log out</button>
                </div>
        }
    </nav>
}

export default NavBar