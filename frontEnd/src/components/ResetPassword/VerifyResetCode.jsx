import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useApp } from '../../providers/AppProvider';
import { useNavigate } from 'react-router';

const VerifyResetCode = () => {

    const [resetCode, setResetCode] = useState("");

    const { backendURL, email } = useApp();

    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await axios.post(backendURL + "/api/v1/auth/verify-reset-code", { resetCode });
            navigate("/reset-password");
        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    const resendCode = async () => {
        try {

            const { data : { message }} = await axios.post(backendURL + "/api/v1/auth/forgot-password", { email });
            toast.success(message);
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
            <h1 className='text-[25px] font-bold'>Enter the 8-digit code</h1>
            <div>
                <input
                    className='w-full input-style'
                    placeholder='8-digit code'
                    onChange={(e) => setResetCode(e.target.value)} value={resetCode} type='text' required />
            </div>
            <div
                onClick={resendCode}
                className='my-1 text-sm font-bold cursor-pointer text-main-color'>Resend code</div>
                <button
                    className='font-semibold text-white bg-main-color w-[80%] py-3 rounded-full mx-auto'
                    type='submit'>Submit</button>
        </div>
    </form>
}

export default VerifyResetCode