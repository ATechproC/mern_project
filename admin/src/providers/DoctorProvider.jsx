import React, {createContext, useContext} from 'react'

const DoctorContext = createContext({})

const DoctorProvider = ({children}) => {

    const value={}

    return <DoctorContext.Provider value={value}>
        {children}
    </DoctorContext.Provider>
}

export default DoctorProvider

export const useDoctor = () => useContext(AdminContext);