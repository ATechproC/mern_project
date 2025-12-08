import React from 'react'
import { toast } from "react-toastify"
import { useApp } from '../../providers/AppProvider';
import axios from "axios"
import { useNavigate } from 'react-router';

const ForgotPassword = () => {

    const { backendURL, email, setEmail } = useApp();

    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await axios.post(backendURL + "/api/v1/auth/forgot-password", { email });
            navigate("/verify-resetCode")
            setEmail("")
        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    return <form
        onSubmit={onSubmitHandler}
        className=' w-[80%] md:w-[35%] center-element-absolute rounded-[10px] p-10 shadow-[0_0_5px_5px_rgba(0,0,0,0.1)]'>
        <div className='gap-4 flex-column'>
            <h1 className='text-[25px] font-bold'>Forgot password</h1>
            <div>
                <input
                    className='w-full input-style'
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} value={email} type='email' required />
            </div>
            <p className='text-center text-gray-500'>We’ll send a verification code to this email if it matches an existing Prescripto account.</p>
            <div className='items-center gap-3 flex-column'>
                <button
                    className='font-semibold text-white bg-main-color w-[80%] py-3 rounded-full'
                    type='submit'>Next</button>
                <button
                    onClick={() => window.history.back()}
                    className='font-semibold text-white bg-black w-[80%] py-3 rounded-full'
                >Back</button>
            </div>
        </div>
    </form>
}

export default ForgotPassword