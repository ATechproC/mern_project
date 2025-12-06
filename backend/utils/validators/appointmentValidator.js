const { check } = require("express-validator");
const User = require("../../models/userModel");
const Doctor = require("../../models/doctorModel");
const { validatorMiddleware } = require("../../middlewares/validatorMiddleware");
const Appointment = require("../../models/appointmentModel");

exports.bookAppointment_validator = [
    check("userId")
        .notEmpty()
        .bail()
        .withMessage("User id is required")
        .isMongoId()
        .withMessage("Invalid user id format")
        .custom(async userId => {
            if (!userId) return true;
            const user = await User.findById(userId);
            if (!user) throw new Error("There is no user for this id");
            return true;
        }),
    check("doctorId")
        .notEmpty()
        .bail()
        .withMessage("Doctor id is required")
        .isMongoId()
        .withMessage("Invalid doctor id format")
        .custom(async doctorId => {
            if (!doctorId) return true;
            const doctor = await Doctor.findById(doctorId);
            if (!doctor) throw new Error("There is no doctor for this id");
            return true;
        }),
    check("slotTime").notEmpty().withMessage("slotTime is required"),
    check("slotDate").notEmpty().withMessage("slotDate is required"),

    validatorMiddleware
]

exports.cancelAppointmentValidator = [

    check("userId")
        .notEmpty()
        .withMessage("UserId is required")
        .bail()
        .isMongoId()
        .withMessage("Invalid userId format")
        .custom(async userId => {
            if (!userId) return true;
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("there is no user for this id");
            }

            return true;
        }),
    check("appointmentId")
        .notEmpty()
        .withMessage("AppointmentId is required")
        .bail()
        .isMongoId()
        .withMessage("Invalid appointmentId format")
        .custom(async appointmentId => {

            if (!appointmentId) return true;
            const appointment = await Appointment.findById(appointmentId);
            if (!appointment) {
                throw new Error("There is no Appointment for this id");
            }

            return true;
        }),

    validatorMiddleware
]