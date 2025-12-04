import React, { useState } from 'react'
// import Form from './Form'
import { useNavigate } from 'react-router';

const AdminForm = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/doctor-login")
    }

    const [inputValues, setInputValues] = useState({
        email: "",
        password: ""
    });

    return <form className=' w-[30%] center-element-absolute rounded-[10px] p-10 shadow-[0_0_5px_5px_rgba(0,0,0,0.1)]'>
        <p className='font-bold text-[25px] mx-auto mb-5 text-center'>Admin Login</p>
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
            <button
                className='px-2 py-1 font-semibold text-white bg-blue-500 rounded-[8px]'
                type='submit'>Login</button>
        </div>
        <div className='gap-1 mt-3 flex-items'>
            <p className='text-[15px] text-gray-500'> Doctor Login ?</p>
            <p
                onClick={() => {
                    handleClick()
                }}
                className='text-[15px] text-blue-500 underline cursor-pointer'>Click here</p>
        </div>
    </form>
}

export default AdminForm