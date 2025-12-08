import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useApp } from '../../providers/AppProvider';

const ResetPassword = () => {

    const { backendURL, token, setToken } = useApp();

    const navigate = useNavigate();

    useEffect(() => {
        token && navigate("/");
    }, [token]);

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
                const { data: { token } } = await axios.put(backendURL + "/api/v1/auth/reset-Password", { email, newPassword, passwordConfirm });
                setToken(token);
                localStorage.setItem("token", token);
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
        <p className='font-bold text-[25px] mx-auto mb-5 text-center'>Change Password</p>
        <div className='gap-3 flex-column'>
            <div className='gap-1 flex-column'>
                <label htmlFor='email'>Email : </label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email' value={email}
                    className='input-style' id='email' type='email' name='email' required={true} />
            </div>
            <div className='gap-1 flex-column'>
                <label htmlFor='new-password'>New Password : </label>
                <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='New Password' value={newPassword}
                    className='input-style' id='new-password' type='password' name='new-password' required={true} />
            </div>
            <div className='gap-1 flex-column'>
                <label htmlFor='passwordConfirm'>Password Confirmation : </label>
                <input
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder='Password Confirmation' value={passwordConfirm}
                    className='input-style' id='passwordConfirm' type='password' name='new-password' required={true} />
            </div>
            <button
                className='px-2 py-1 font-semibold text-white bg-blue-500 rounded-[8px]'
                type='submit'>Change Password</button>
        </div>
    </form>
}

export default ResetPassword