import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify"
import axios from "axios";
import { useEffect } from "react";

const AppContext = createContext({});

const AppProvider = ({ children }) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");

    const [userData, setUserData] = useState({
        image: "",
        name: "",
        phone: "",
        address: "",
        gender: "",
        birthday: ""
    });

    const getLoggedUserData = async () => {

        try {

            const { data: { data } } = await axios.get(backendURL + "/api/v1/users/get-logged-user-data", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserData({
                image: data.image ? data.image : "",
                name: data.name ? data.name : "",
                phone: data.phone ? data.phone : "",
                address: data.address ? data.address : "",
                gender: data.gender ? data.gender : "",
                birthday: data.birthday ? data.birthday : ""
            })
            console.log(data);
        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    useEffect(() => {
        getLoggedUserData();
    }, [])

    return <AppContext.Provider value={{ backendURL, token, setToken, userData, setUserData, getLoggedUserData }}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;

export const useApp = () => useContext(AppContext);