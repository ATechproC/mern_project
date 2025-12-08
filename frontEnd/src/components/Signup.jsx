import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useApp } from '../providers/AppProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Signup = () => {

    const [state, setState] = useState("signup");

    const { backendURL, token, setToken } = useApp();

    const navigate = useNavigate();

    useEffect(() => {
        token && navigate("/");
    }, [token]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    useEffect(() => {
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
    }, [state])

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            if (state === "signup") {
                const { data: { token } } = await axios.post(backendURL + "/api/v1/auth/signup", { name, email, password, passwordConfirm });
                setToken(token);
                localStorage.setItem("token", token);
            } else {
                const { data: { token } } = await axios.post(backendURL + "/api/v1/auth/login", { email, password, passwordConfirm });
                setToken(token);
                localStorage.setItem("token", token);
            }
        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    return <form
        onSubmit={handleSubmitForm}
        className=' w-[30%] center-element-absolute rounded-[10px] p-10 shadow-[0_0_5px_5px_rgba(0,0,0,0.1)]'>
        <p className='font-bold text-[25px] mx-auto mb-5 text-center'>{state === "signup" ? "Create Account" : "Login"}</p>
        <div className='gap-3 flex-column'>
            {
                state === "signup" &&
                <div className='gap-1 flex-column'>
                    <label htmlFor='fullName'>Full Name : </label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Full Name' value={name}
                        className='input-style' id='fullName' type='text' name='fullName' required={true} />
                </div>
            }
            <div className='gap-1 flex-column'>
                <label htmlFor='email'>Email : </label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email' value={email}
                    className='input-style' id='email' type='email' name='email' required={true} />
            </div>
            <div className='gap-1 flex-column'>
                <label htmlFor='password'>Password : </label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='password' value={password}
                    className='input-style' id='password' type='password' name='password' required={true} />
            </div>
            <div className='gap-1 flex-column'>
                <label htmlFor='passwordConfirm'>Password Confirmation : </label>
                <input
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder='password Confirmation' value={passwordConfirm}
                    className='input-style' id='passwordConfirm' type='password' name='password' required={true} />
            </div>
            <button
                className='px-2 py-1 font-semibold text-white bg-blue-500 rounded-[8px]'
                type='submit'>{state === "signup" ? "Create Account" : "Login"}</button>
        </div>
        {
            state !== "signup" && <div
                onClick={() => navigate("/forgot-password")}
                className='my-1 text-sm font-bold cursor-pointer text-main-color'>Forgot password?</div>
        }
        <div className='gap-1 flex-items'>
            <p className='text-[15px] text-gray-500'> {state === "signup" ? "Already have an account" : "Do not you have an account "} </p>
            <p
                onClick={() => setState(prev => prev === "signup" ? "login" : "signup")}
                className='text-[15px] text-blue-500 underline cursor-pointer'> {state === "signup" ? " Login here" : "Signup here"}</p>
        </div>
    </form>
}

export default Signup