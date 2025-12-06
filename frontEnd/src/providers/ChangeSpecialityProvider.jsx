import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { useApp } from "./AppProvider";
// import { useDoctors } from "./DoctorsPorvider";

const ChangeSpecialityContext = createContext({});

const ChangeSpecialityProvider = ({ children }) => {

    const [speciality, setSpeciality] = useState("");

    const [doctors, setDoctors] = useState([]);

    const { backendURL } = useApp();

    const fetchDoctorBasedOnSpacility = async () => {
        try {

            const { data: { data } } = await axios.get(backendURL + `/api/v1/doctors?specialty=${speciality}`);

            setDoctors(data)

        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    useEffect(() => {
        fetchDoctorBasedOnSpacility();
    }, [speciality])

    return <ChangeSpecialityContext.Provider value={{ speciality, setSpeciality, doctors, setDoctors }}>
        {children}
    </ChangeSpecialityContext.Provider>
}

export default ChangeSpecialityProvider;

export const useChangeSpeciality = () => useContext(ChangeSpecialityContext);