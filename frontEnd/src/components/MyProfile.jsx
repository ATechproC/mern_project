import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets';
import axios from "axios";
import { useApp } from '../providers/AppProvider';
import { toast } from "react-toastify"
import { useNavigate } from "react-router"

const MyProfile = () => {

  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);

  const { backendURL, token, userData, setUserData, getLoggedUserData } = useApp();

  useEffect(() => {
    if (!token) navigate("/signup");
  })

  const updateUserDataProfile = async () => {

    try {

      const formData = new FormData();
      userData.image && formData.append("image", userData.image);
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", userData.address);
      formData.append("gender", userData.gender);
      formData.append("birthday", userData.birthday);

      const { data } = await axios.put(backendURL + "/api/v1/users/update-data", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      await getLoggedUserData();
      toast.success(data.message);
    } catch (err) {
      let error;
      if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
      else error = err.message;
      toast.error(error);
    }
  }

  return <div className='w-[400px] p-3 flex-column gap-7'>
    <div className='flex-column gap-4 border-b-2 border-gray-300 pb-3'>
      <div>
        <label htmlFor='user-img'>
          <div className={`w-[150px] h-[150px] rounded-full overflow-hidden cursor-pointer ${isEdit && "cursor-pointer"}`}>
            <img
              className='w-[100%] h-[1OO%] object-contain'
              src={userData.image ? userData.image : assets.upload_area} draggable={false} />
          </div>
        </label>
        {
          isEdit && <input onChange={(e) => setUserData(prev => ({ ...prev, image: e.target.files[0] }))} id="user-img" type='file' hidden={true} />
        }
      </div>
      {
        isEdit
          ? <input
            className='px-3 py-1 border border-black rounded-[10px]'
            type="text" value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-semibold'> {userData.name} </p>
      }
    </div>
    <div className=' flex-column gap-2 border-b-2 border-gray-300 pb-3'>
      <p className='text-gray-400 text-[15px]'>CONTACT INFORMATION</p>
      <div className='flex-items gap-10'>
        <p> Phone : </p>
        {
          isEdit
            ? <input
              className='px-3 py-1 border border-black rounded-[10px]'
              type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
            : <p> {userData.phone} </p>
        }
      </div>

      <div className='flex-items gap-10'>
        <p> Address : </p>
        {
          isEdit
            ? <input
              className='px-3 py-1 border border-black rounded-[10px]'
              type="text" value={userData.address} onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))} />
            : <p> {userData.address} </p>
        }
      </div>
    </div>
    <div className='flex-column gap-2 '>
      <a href="#" className='text-gray-400 text-[15px]'>BASIC INFORMATION</a>
      <div className='flex-items gap-10'>
        <p> Gender : </p>
        {
          isEdit
            ? <input
              className='px-3 py-1 border border-black rounded-[10px]'
              type="text" value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} />
            : <p> {userData.gender} </p>
        }
      </div>
      <div className='flex-items gap-10'>
        <p> Birthday : </p>
        {
          isEdit
            ? <input
              className='px-3 py-1 border border-black rounded-[10px]'
              type="date" value={userData.birthday} onChange={(e) => setUserData(prev => ({ ...prev, birthday: e.target.value }))} />
            : <p> {userData.birthday} </p>
        }
      </div>
    </div>
    <div className='flex-items gap-5'>
      {
        isEdit
          ? <>
            <button
              onClick={() => setIsEdit(false)}
              className='whitespace-nowrap capitalize px-3 py-1 mx-auto hover:bg-red-500 min-w-[170px] border-[1px] rounded-[3px] border-gray-500 cursor-pointer transition-all duration-300 bg-secondary-color text-main-color font-semibold hover:text-white'>cancel</button>
            <button
              onClick={() => {
                setIsEdit(false);
                updateUserDataProfile();
              }}
              className='whitespace-nowrap capitalize px-3 py-1 mx-auto hover:bg-green-500 min-w-[170px] border-[1px] rounded-[3px] border-gray-500 cursor-pointer transition-all duration-300 bg-secondary-color text-main-color font-semibold hover:text-white'>Save</button>
          </>
          :

          <button
            onClick={() => setIsEdit(true)}
            className="whitespace-nowrap capitalize px-3 py-1 mx-auto hover:bg-green-500 min-w-[170px] border-[1px] rounded-[3px] border-gray-500 cursor-pointer transition-all duration-300 bg-secondary-color text-main-color font-semibold hover:text-white"
          >Edit</button>
      }
    </div>
  </div >
}

export default MyProfile