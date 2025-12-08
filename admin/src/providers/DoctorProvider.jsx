import React, { createContext, useContext, useState } from 'react'

const DoctorContext = createContext({})

const DoctorProvider = ({ children }) => {

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "");

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const value = {
        dToken,
        setDToken,
        backendURL
    }

    return <DoctorContext.Provider value={value}>
        {children}
    </DoctorContext.Provider>
}

export default DoctorProvider

export const useDoctor = () => useContext(DoctorContext);