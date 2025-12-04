import React from 'react'

import { FaCalendarAlt, FaHome } from 'react-icons/fa';
import { MdOutlineAddBox } from 'react-icons/md';
import { HiUserGroup } from "react-icons/hi2";


const GetIcon = ({ id }) => {
    switch (id) {
        case "1": return <FaHome />
        case "2": return <FaCalendarAlt />
        case "3": return <MdOutlineAddBox />
        case "4": return <HiUserGroup />
        default:
            return null;
    }
}

export default GetIcon