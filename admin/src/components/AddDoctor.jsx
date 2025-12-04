import React, { useState } from 'react'
import { assets } from "../assets/assets_admin/assets"
import { useAdmin } from '../providers/AdminProvider';
import axios from "axios"
import { toast } from "react-toastify"

const AddDoctor = () => {

    const { backendURL, aToken } = useAdmin();

    const [inputValues, setInputValues] = useState({
        image: false,
        name: "",
        password: "",
        passwordConfirm: "",
        email: "",
        fees: "",
        experience: "1 Year",
        specialty: "General physician",
        address: "",
        about: "",
        degree: ""
    })

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {

            if (!inputValues.image) return toast.error("Image not selected");

            const formData = new FormData();
            formData.append("image", inputValues.image)
            formData.append("name", inputValues.name)
            formData.append("email", inputValues.email)
            formData.append("password", inputValues.password)
            formData.append("passwordConfirm", inputValues.passwordConfirm)
            formData.append("experience", inputValues.experience);
            formData.append("specialty", inputValues.specialty);
            formData.append("address", inputValues.address)
            formData.append("about", inputValues.about)
            formData.append("fees", Number(inputValues.fees));
            formData.append("degree", inputValues.fees);

            await axios.post(backendURL + "/api/v1/admin/add-doctor", formData, {
                headers: {
                    Authorization: `Bearer ${aToken}`
                }
            })

            toast.success("Doctor Added");
            setInputValues({
                image: false,
                name: "",
                password: "",
                passwordConfirm: "",
                email: "",
                fees: "",
                experience: "1 Year",
                specialty: "General physician",
                address: "",
                about: "",
                degree: ""
            })

        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    return <form onSubmit={onSubmitHandler} className='w-[85%] absolute right-0 p-4'>
        <p className='text-lg font-bold'>Add Doctor</p>
        <div className='p-5 w-[80%] mx-auto'>
            <div className='gap-3 mb-3 flex-items'>
                <label htmlFor='doc-img'>
                    <div className='max-w-[100px] max-h-[100px] rounded-full cursor-pointer overflow-hidden'>
                        <img className='w-[100%) h-[100%]' src={inputValues.image ? URL.createObjectURL(inputValues.image) : assets.upload_area} draggable={false} />
                    </div>
                </label>
                <input onChange={(e) => setInputValues(prev => ({ ...prev, image: e.target.files[0] }))} id="doc-img" type='file' hidden={true} />
                <p className='font-medium text-gray-400'>Upload doctor picture</p>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <div>
                    <label htmlFor='name' className='block'>Doctor name</label>
                    <input value={inputValues.name} onChange={(e) => setInputValues(prev => ({ ...prev, name: e.target.value }))} className='px-3 py-1 border rounded-[10px] outline-none border-gray-500' id='name' type='text' placeholder='Name' required={true} />
                </div>
                <div>
                    <label htmlFor='email' className='block'>Doctor Email</label>
                    <input value={inputValues.email} onChange={(e) => setInputValues(prev => ({ ...prev, email: e.target.value }))} className='px-3 py-1 border rounded-[10px] outline-none border-gray-500' id='email' type='email' placeholder='Doctor Email' required={true} />
                </div>
                <div>
                    <label htmlFor='passwordConfirm' className='block'>Doctor Password Confirmation </label>
                    <input value={inputValues.passwordConfirm} onChange={(e) => setInputValues(prev => ({ ...prev, passwordConfirm: e.target.value }))} className='px-3 py-1 border rounded-[10px] outline-none border-gray-500' id='passwordConfirm' type='password' placeholder='Password Confirmation' required={true} />
                </div>
                <div>
                    <label htmlFor='password' className='block'>Doctor Password</label>
                    <input value={inputValues.password} onChange={(e) => setInputValues(prev => ({ ...prev, password: e.target.value }))} className='px-3 py-1 border rounded-[10px] outline-none border-gray-500' id='password' type='password' placeholder='Password' required={true} />
                </div>
                <div>
                    <label htmlFor='experience' className='block'>Experience</label>
                    <select value={inputValues.experience} onChange={(e) => setInputValues(prev => ({ ...prev, experience: e.target.value }))} id='experience' className='w-1/2 px-2 py-1 border border-gray-500 rounded-[10px]'>
                        <option value="1 Year" selected>1 Year</option>
                        <option value="2 Year">2 Year</option>
                        <option value="3 Year">3 Year</option>
                        <option value="4 Year">4 Year</option>
                        <option value="5 Year">5 Year</option>
                        <option value="6 Year">6 Year</option>
                        <option value="7 Year">7 Year</option>
                        <option value="8 Year">8 Year</option>
                        <option value="9 Year">9 Year</option>
                        <option value="more">more</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='fees' className='block'>Fees</label>
                    <input value={inputValues.fees} onChange={(e) => setInputValues(prev => ({ ...prev, fees: e.target.value }))} className='px-3 py-1 border rounded-[10px] outline-none border-gray-500' id='fees' type='text' placeholder='Fees' required={true} />
                </div>
                <div>
                    <label htmlFor='specialty' className='block'>Specialty</label>
                    <select value={inputValues.specialty} onChange={(e) => setInputValues(prev => ({ ...prev, specialty: e.target.value }))} id='specialty' className='w-1/2 px-2 py-1 border border-gray-500 rounded-[10px]'>
                        <option value="General physician" selected>General physician</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Pediatricians">Pediatricians</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Gastroenterologist">Gastroenterologist</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='education' className='block'>Education</label>
                    <input value={inputValues.degree} onChange={(e) => setInputValues(prev => ({ ...prev, degree: e.target.value }))} className='px-3 py-1 border rounded-[10px] outline-none border-gray-500' id='education' type='text' placeholder='Education' required={true} />
                </div>
                <div>
                    <label htmlFor='address' className='block'>Address</label>
                    <input value={inputValues.address} onChange={(e) => setInputValues(prev => ({ ...prev, address: e.target.value }))} className='px-3 py-1 border rounded-[10px] outline-none border-gray-500' id='address' type='text' placeholder='Address' required={true} />
                </div>
            </div>
            <div>
                <label htmlFor='about' className='block'>About</label>
                <textarea value={inputValues.about} onChange={(e) => setInputValues(prev => ({ ...prev, about: e.target.value }))} id='about' placeholder='write about yourself' className='w-2/3 m-auto h-[60px] outline-none border border-gray-500 rounded-[10px] px-3 py-1' />
            </div>
            <button type='submit' className='px-3 py-[2px] text-white rounded-full font-bold cursor-pointer bg-main-color'>Add Doctor</button>
        </div>
    </form>
}

export default AddDoctor