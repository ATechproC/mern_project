import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useAdmin } from '../providers/AdminProvider';
import { toast } from 'react-toastify';
import { useDoctor } from '../providers/DoctorProvider';
import { useApp } from '../providers/AppProvider';

const Login = () => {

    const { backendURL, setAToken } = useAdmin();

    const { setDToken } = useDoctor();

    const { loginState, setLoginState } = useApp();

    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (loginState === "Admin") {
                const { data: { token } } = await axios.post(backendURL + "/api/v1/admin/login", inputValues);
                localStorage.setItem("aToken", token);
                setAToken(token);
                console.log(token)
            } else {
                const { data: { token } } = await axios.post(backendURL + "/api/v1/doctors/login", inputValues);
                localStorage.setItem("dToken", token);
                setDToken(token);
                console.log(token)
            }
        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    useEffect(() => {
        setInputValues({
            email: "",
            password: "",
            passwordConfirm: ""
        })
    }, [loginState])

    return <form onSubmit={handleSubmit} className=' w-[30%] center-element-absolute rounded-[10px] p-10 shadow-[0_0_5px_5px_rgba(0,0,0,0.1)]'>
        <p className='font-bold text-[25px] mx-auto mb-5 text-center'><span className='capitalize'>{loginState}</span> Login</p>
        <div className='gap-3 flex-column'>
            <div className='gap-1 flex-column'>
                <label htmlFor='email'>Email : </label>
                <input
                    onChange={(e) => setInputValues({ ...inputValues, email: e.target.value })}
                    className='input-style' value={inputValues.email} placeholder='Email' id='email' type='email' name='email' required={true} />
            </div>
            <div className='gap-1 flex-column'>
                <label htmlFor='password'>Password : </label>
                <input
                    onChange={(e) => setInputValues({ ...inputValues, password: e.target.value })}
                    placeholder='password' value={inputValues.password} className='input-style' id='password' type='password' name='password' required={true} />
            </div>
            <div className='gap-1 flex-column'>
                <label htmlFor='password-confirmation'>password Confirmation : </label>
                <input
                    onChange={(e) => setInputValues({ ...inputValues, passwordConfirm: e.target.value })}
                    placeholder='password confirmation' value={inputValues.passwordConfirm} className='input-style' id='password-confirmation' type='password' name='password' required={true} />
            </div>
            <button
                className='px-2 py-1 font-semibold text-white bg-blue-500 rounded-[8px]'
                type='submit'>Login</button>
        </div>
        <div className='gap-1 mt-3 flex-items'>
            <p className='text-[15px] text-gray-500'> <span className='capitalize'> {loginState === "Admin" ? "doctor" : "admin"} </span> Login ?</p>
            <p
                onClick={() => setLoginState(prev => prev == "Admin" ? "Doctor" : "Admin")}
                className='text-[15px] text-blue-500 underline cursor-pointer'>Click here</p>
        </div>
    </form>
}

export default Login