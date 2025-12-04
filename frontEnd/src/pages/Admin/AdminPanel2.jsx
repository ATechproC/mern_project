import React from 'react'
// import AdminSideBar from '../../utils/AdminSideBar'
import { assets } from '../../assets/assets_frontend/assets'

const AdminPanel2 = () => {
  return <>
    {/* <AdminSideBar /> */}
    <table className='w-[80%] absolute right-8 border-[2px] border-gray-500 p-5'>
      <caption className='font-semibold text-start p-2 text-[25px]'>
        All Appointments
      </caption>
      <thead className='bg-gray-500 p-5 w-[100%]'>
        <tr>
          <th>#</th>
          <th>Patient</th>
          <th>Department</th>
          <th>Age</th>
          <th>Date & Time</th>
          <th>Doctor</th>
          <th>Fees</th>
        </tr>
      </thead>
      <tbody>
        <tr className='text-center border-b-2 border-black'>
          <td>1</td>
          <td className='gap-2 flex-center'>
            <div className='w-[80px] h-[80px] overflow-hidden rounded-full'>
              <img
                className='object-contain w-full h-full'
                src={assets.profile_pic} draggable={false} />
            </div>
            <p>Richard James</p>
          </td>
          <td>Youtube username</td>
          <td>18</td>
          <td>24th July, 2024, 10:AM</td>
          <td className='gap-2 flex-center'>
            <div className='w-[80px] h-[80px] overflow-hidden rounded-full'>
              <img
                className='object-contain w-full h-full'
                src={assets.profile_pic} draggable={false} />
            </div>
            <p>Richard James</p>
          </td>
          <td>$50</td>
        </tr>
        <tr className='text-center border-b-2 border-black'>
          <td>1</td>
          <td className='gap-2 flex-center'>
            <div className='w-[80px] h-[80px] overflow-hidden rounded-full'>
              <img
                className='object-contain w-full h-full'
                src={assets.profile_pic} draggable={false} />
            </div>
            <p>Richard James</p>
          </td>
          <td>Youtube username</td>
          <td>18</td>
          <td>24th July, 2024, 10:AM</td>
          <td className='gap-2 flex-center'>
            <div className='w-[80px] h-[80px] overflow-hidden rounded-full'>
              <img
                className='object-contain w-full h-full'
                src={assets.profile_pic} draggable={false} />
            </div>
            <p>Richard James</p>
          </td>
          <td>$50</td>
        </tr>
      </tbody>
    </table>
  </>
}

export default AdminPanel2