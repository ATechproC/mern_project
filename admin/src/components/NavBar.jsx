import React from 'react'
import { assets } from '../assets/assets_admin/assets'
import { useAdmin } from "../providers/AdminProvider";
import { Outlet } from 'react-router';;
import AdminSideBar from './AdminSideBar';
import { useDoctor } from '../providers/DoctorProvider';
import DoctorSideBar from './DoctorSideBar';
import { useApp } from '../providers/AppProvider';

const NavBar = () => {

    const { aToken, setAToken } = useAdmin();
    const { dToken, setDToken } = useDoctor();

    const { loginState } = useApp();

    const handleLogOut = () => {
        if (aToken) {
            setAToken("");
            localStorage.removeItem("aToken");
        } else {
            setDToken("");
            localStorage.removeItem("dToken");
        }
    }

    if (aToken)
        return <>
            <AdminSideBar />
            <div className="flex-between w-[96%] mx-auto pt-3">
                <div className='gap-2 flex-items'>
                    <img className='w-[60%] object-fit' src={assets.logo} draggable={false} />
                    <p className='text-[15px] font-bold border-[1px] rounded-full px-3 cursor-default border-black'>Admin </p>
                </div>
                <button onClick={handleLogOut} className='px-3 font-semibold text-white rounded-full bg-main-color py-[2px]'>
                    {aToken ? "Log out" : "Login"}
                </button>
            </div>
            <Outlet />
        </>

    if (dToken)
        return <>
            <DoctorSideBar />
            <div className="flex-between w-[96%] mx-auto pt-3">
                <div className='gap-2 flex-items'>
                    <img className='w-[60%] object-fit' src={assets.logo} draggable={false} />
                    <p className='text-[15px] font-bold border-[1px] rounded-full px-3 cursor-default border-black'>Doctor</p>
                </div>
                <button onClick={handleLogOut} className='px-3 font-semibold text-white rounded-full bg-main-color py-[2px]'>{dToken ? "Log out" : "Login"}
                </button>
            </div>
            <Outlet />
        </>
}

export default NavBar