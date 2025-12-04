const async_handler = require("express-async-handler");
const { default: slugify } = require("slugify");
const Doctor = require("../models/doctorModel");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const { pagination } = require("../utils/pagination");

exports.add_new_doctor = async_handler(async (req, res) => {

    req.body.slug = slugify(req.body.name);
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();

    res.status(201).json({ data: newDoctor });
});

exports.get_all_doctors = async_handler(async (req, res) => {

    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;

    const doctors = await Doctor.find().skip(skip).limit(limit).select("-password");

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