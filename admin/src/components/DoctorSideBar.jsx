import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router'

const DoctorSideBar = () => {

    const links = [
        {
            "id": 1,
            "name": "Dashboard",
            "link": "/doctor-dashboard"
        },
        {
            "id": 2,
            "name": "Appointments",
            "link": "/doctor-appointments"
        },
        {
            "id": 3,
            "name": "Profile",
            "link": "/doctor-profile"
        },
    ]

    return <nav className='flex-column gap-3 bg-secondary-color fixed w-[15%] h-[90%] left-0 bottom-0 right-0 p-3 border-[1px] border-gray-400'>
        {
            links.map(({ id, name, link }) => {
                return <div key={id}
                    className='gap-3 px-5 flex-items'
                >
                    <FaHome id={id} />
                    {/* <GetIcon id={id} /> */}
                    <Link to={link} > {name} </Link>
                </div>
            })
        }
    </nav>
}

export default DoctorSideBar