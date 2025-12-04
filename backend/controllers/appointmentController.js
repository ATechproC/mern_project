const async_handler = require("express-async-handler");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");

exports.get_user_id = async_handler(async (req, res, next) => {
    req.body.userId = req.user._id;
    next();
})

exports.bookAppointment = async_handler(async (req, res) => {
    const { doctorId, slotTime, slotDate, userId } = req.body;

    const doctor = await Doctor.findById(doctorId).select("-password");

    if (!doctor.available) {
        return res.json({ message: "Doctor is not available" });
    }

    const slots_books = doctor.slots_books;

    // check if slot is available or not :
    if (slots_books[slotDate]) {
        if (slots_books[slotDate].includes(slotTime)) {
            return res.json({ message: "Slot is not available" })
        } else {
            slots_books[slotDate].push(slotTime);
        }
    } else {
        slots_books[slotDate] = [];
        slots_books[slotDate].push(slotTime)
    }

    const user = await User.findById(userId).select("-password");

    delete doctor.bookAppointment;

    const appointmentData = {
        userId,
        doctorId,
        userData: user,
        doctorData: doctor,
        amount: doctor.fees,
        date: Date.now()
    }

    const newAppointment = new Appointment(appointmentData);
    await newAppointment.save();

    await Doctor.findByIdAndUpdate(doctorId, { slots_books });

    res.status(200).json({ message: "Appointment booked successfully", slots_books });

});

exports.my_appointments = async_handler(async (req, res) => {
    const appointments = await Appointment.find({ userId: req.user._id });
    res.status(200).json({ data: appointments });
})