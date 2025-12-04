import React from 'react'
import { assets } from '../assets/assets_admin/assets'
import { useAdmin } from "../providers/AdminProvider";
import { Outlet } from 'react-router';;
import AdminSideBar from './AdminSideBar';

const NavBar = () => {

    const { aToken, setAToken } = useAdmin();

    const handleLogOut = () => {
        setAToken("");
        localStorage.removeItem("aToken");
    }

    return <>
        <AdminSideBar />
        <div className="flex-between w-[96%] mx-auto pt-3">
            <div className='gap-2 flex-items'>
                <img className='w-[60%] object-fit' src={assets.logo} draggable={false} />
                <p className='text-[15px] font-bold border-[1px] rounded-full px-3 cursor-default border-black'> {aToken ? "Admin" : "Doctor"} </p>
            </div>
            <button onClick={handleLogOut} className='px-3 font-semibold text-white rounded-full bg-main-color py-[2px]'> {aToken ? "Log out" : "Login"} </button>
        </div>
        <Outlet />
    </>
}

export default NavBar