import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import axios from "axios";
import { useApp } from '../providers/AppProvider';

const BookingSlots = ({ doctorInfo, doctorId }) => {

    const { backendURL, token } = useApp();

    const [slotTime, setSlotTime] = useState("");
    const [slotDate, setSlotDate] = useState("");

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const [timeSlotIndex, setTimeSlotIndex] = useState(0);

    const [docSlots, setDocSlots] = useState([]);

    const getAvailbleSlots = () => {

        const allSlots = [];

        const today = new Date();
        for (let i = 0; i < 7; i++) {

            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            const startTime = new Date(currentDate);
            const endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0);

            const isToday = today.toDateString() === currentDate.toDateString();

            if (isToday) {

                const now = new Date();
                startTime.setHours(now.getHours());
                startTime.setMinutes(now.getMinutes() >= 30 ? 60 : 30);

                if (startTime > endTime) continue;

            } else startTime.setHours(10, 0, 0, 0);


            const timeSlots = [];
            const currentSlot = new Date(startTime);

            while (currentSlot < endTime) {

                timeSlots.push({
                    id: timeSlots.length + 1,
                    time: currentSlot.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    isSelectd: false
                })

                currentSlot.setMinutes(currentSlot.getMinutes() + 30);
            }


            if (timeSlots.length > 0) {
                allSlots.push({
                    id: allSlots.length + 1,
                    date: currentSlot.getDate(),
                    day: currentSlot.getDay(),
                    slot: timeSlots,
                    isSelected: false
                });
            }

        }

        // console.log(allSlots)

        setDocSlots(allSlots);
    }

    useEffect(() => {
        getAvailbleSlots();
    }, [doctorInfo]);

    const handleClickSlots = (id) => {

        const newDocSlots = [...docSlots];;

        for (let i = 0; i < newDocSlots.length; i++) {

            if (i == id - 1) {
                newDocSlots[i].isSelected = !newDocSlots[i].isSelected;
            } else {
                newDocSlots[i].isSelected = false;
            }
        }

        setDocSlots(newDocSlots);
        setTimeSlotIndex(id - 1);
    };

    const handleClickedTime = (timeSlotIndex, id) => {
        const newDocSlots = [...docSlots];

        for (let i = 0; i < newDocSlots[timeSlotIndex].slot.length; i++) {
            if (id - 1 == i) {
                newDocSlots[timeSlotIndex].slot[i].isSelectd = !newDocSlots[timeSlotIndex].slot[i].isSelectd;
            } else newDocSlots[timeSlotIndex].slot[i].isSelectd = false;
        }

        setDocSlots(newDocSlots);
    }

    const bookAppointment = async () => {
        try {
            const { data: { message } } = await axios.post(backendURL + "/api/v1/users/book-appointment", { slotTime, slotDate, doctorId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(message);
        } catch (err) {
            let error;
            if (err.response) error = err.response.data.message || err.response.data.errors[0].msg;
            else error = err.message;
            toast.error(error);
        }
    }

    return docSlots.length > 0 &&
        <div className='pt-8'>
            <p className='text-lg text-gray-600 pb-5'>Booking slots</p>
            <div>
                <div className='flex-items gap-5 whitespace-nowrap cursor-pointer'>
                    {
                        docSlots.map(({ day, date, isSelected, id }) => {
                            return <div key={id}
                                onClick={() => {
                                    handleClickSlots(id);
                                    setSlotDate(date);
                                }}
                                className={`flex-column gap-2 px-3 py-4 border border-gray-400 rounded-[30px] text-center ${isSelected ? "text-white font-bold bg-blue-700" : null}`}>
                                <p>{daysOfWeek[day]}</p>
                                <p>{date}</p>
                            </div>
                        })
                    }
                </div>
                <div className='flex-items pt-8 gap-2 p-2 font-medium rounded-[10px] whitespace-nowrap overflow-auto '>
                    {
                        docSlots[timeSlotIndex].slot.map(({ time, isSelectd, id }) => {
                            return <div key={id}
                                onClick={() => {
                                    handleClickedTime(timeSlotIndex, id);
                                    setSlotTime(time)
                                }}
                                className={`border border-gray-500 px-2 rounded-full cursor-pointer ${isSelectd ? "text-white font-bold bg-blue-700" : null}`}
                            > {time} </div>
                        })
                    }
                </div>
                <div className='text-right p-5'>
                    <button
                        onClick={bookAppointment}
                        className='text-white font-medium bg-main-color px-5 py-1 rounded' > Book </button>
                </div>
            </div>
        </div>
}

export default BookingSlots