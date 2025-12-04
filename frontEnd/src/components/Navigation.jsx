import React from "react";
import { Outlet } from "react-router";
// import SideBar from "./SideBar";
import NavBar from "./NavBar";


const Navigation = () => {
    return <>
        <NavBar />
        {/* <SideBar /> */}
        <Outlet />
    </>
};

export default Navigation;
