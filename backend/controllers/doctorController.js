const async_handler = require("express-async-handler");
const { default: slugify } = require("slugify");
const Doctor = require("../models/doctorModel");
const Appointments = require("../models/appointmentModel");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const { pagination } = require("../utils/pagination");
const jwt = require("jsonwebtoken");
const Appointment = require("../models/appointmentModel");

exports.createToken = (payload) => jwt.sign({ doctorId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME
});

exports.add_new_doctor = async_handler(async (req, res) => {

    req.body.slug = slugify(req.body.name);
    req.body.specialty = slugify(req.body.specialty);
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();

    res.status(201).json({ data: newDoctor });
});

exports.get_all_doctors = async_handler(async (req, res) => {

    const filterObj = req.query;

    const values = ["page", "limit"];

    values.forEach(value => {
        delete filterObj[value];
    })


    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;

    const doctors = await Doctor.find(filterObj).skip(skip).limit(limit).select("-password");

    const numberOfDocument = await Doctor.countDocuments();

    const paginationResult = pagination(page, numberOfDocument, limit, skip);

    res.status(200).json({ result: doctors.length, pagination: paginationResult, data: doctors });
});

exports.change_availability = async_handler(async (req, res, next) => {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
        return next(new ApiError("There is no doctor for this id", 404));
    }

    const newDoctor = await Doctor.findByIdAndUpdate(id, {
        available: !doctor.available
    }, { new: true });

    res.status(200).json({ message: "Availability changed", data: newDoctor });
})

exports.get_doctor_by_id = async_handler(async (req, res, next) => {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
        return next(new ApiError("there is no doctor with this id", 404));
    }

    res.status(200).json({ data: doctor })
});

exports.get_doctorId = async_handler(async (req, res, next) => {
    req.params.id = req.doctor._id;
    next();
})

exports.update_doctor_data = async_handler(async (req, res, next) => {

    const { id } = req.params;

    const doctor = await Doctor.findByIdAndUpdate(id, {
        name: req.body.name,
        slug: slugify(req.body.name),
        image: req.body.image,
        speciality: req.body.speciality,
        degree: req.body.degree,
        experience: req.body.experience,
        about: req.body.about,
        available: req.body.available,
        fees: req.body.fees,
        address: req.body.address,
        // date: req.body.date,
        slots_booked: req.body.slots_booked
    }, { new: true })

    if (!doctor) {
        return next(new ApiError("there is no doctor for this id", 404))
    }

    res.status(200).json({ data: doctor })
});

exports.change_doctor_password = async_handler(async (req, res, next) => {

    const { id } = req.params;

    const doctor = await Doctor.findOneAndUpdate(id, {
        password: await bcrypt.hash(req.password, 12)
    }, { new: true });

    if (!doctor) {
        return next(new ApiError("There is no doctor for this id", 404));
    }

    res.status(200).json({ data: doctor });

})

exports.delete_doctor_data = async_handler(async (req, res, next) => {

    const { id } = req.params;

    const doctor = await Doctor.findByIdAndDelete(id);

    if (!doctor) {
        return next(new ApiError("there is no doctor for this id", 404))
    }

    res.status(200).json({ message: "doctor date deleted successfully", data: doctor })
})

exports.doctorLogin = async_handler(async (req, res, next) => {
    const doctor = await Doctor.findOne({ email: req.body.email });

    if (!doctor || !(await bcrypt.compare(req.body.password, doctor.password))) {
        return next(new ApiError("Invalid Credentials", 401));
    }

    const token = this.createToken(doctor._id);

    res.status(200).json({ token });
});

exports.protect = async_handler(async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new ApiError("Please try log in to get access to this resource!!", 401));
    }


    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const doctor = await Doctor.findById(decode.doctorId);

    if (!doctor) {
        return next(new ApiError("Invalid token, please login in to get access to this resource", 401))
    }

    req.doctor = doctor;

    next();

});

exports.gitDoctorId = async_handler(async (req, res, next) => {
    req.params.id = req.doctor._id;
    next();
})

exports.getSpecificAppointments = async_handler(async (req, res) => {

    const appointments = await Appointments.find({ doctorId: req.params.id });

    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    const numberOfDocuments = appointments.length;

    const paginationResult = pagination(page, numberOfDocuments, limit, skip);

    res.status(200).json({ result: appointments.length, pagination: paginationResult, data: appointments });
});

exports.doctorCancelAppointment = async_handler(async (req, res, next) => {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
        return next(new ApiError("There is no Appointment for this id", 404));
    }

    appointment.cancelled = true;
    await appointment.save();

    res.status(200).json({ message: "Appointment cancelled" });
});

exports.completedAppointment = async_handler(async (req, res, next) => {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
        return next(new ApiError("There is no Appointment for this id", 404));
    }

    appointment.isCompleted = true;
    await appointment.save();

    res.status(200).json({ message: "Appointment completed" });
});

exports.getDoctorDashData = async_handler(async (req, res) => {

    const appointments = await Appointment.find({ doctorId: req.doctor._id });

    const usersIds = [];

    appointments.forEach(item => {
        let isExist = false;

        usersIds.forEach(id => {
            if (id.equals(item.userId)) {
                isExist = true;
                return;
            }
        })

        if (!isExist) usersIds.push(item.userId);
    })

    let earings = 0;

    appointments.forEach(item => {
        if (item.isCompleted) earings += item.amount;
    })

    const dashData = {
        latestAppointments: appointments.slice(0, 5),
        appointments: appointments.length,
        patients: usersIds.length,
        earings
    }

    res.status(200).json({ data: dashData })
})