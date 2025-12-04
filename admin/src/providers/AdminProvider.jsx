import React, { createContext, useContext, useState } from 'react'

const AdminContext = createContext({})

const AdminProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const value = { aToken, setAToken, backendURL };
    return <AdminContext.Provider value={value}>
        {children}
    </AdminContext.Provider>
}

export default AdminProvider

export const useAdmin = () => useContext(AdminContext);