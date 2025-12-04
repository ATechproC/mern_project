const { check } = require("express-validator");
const User = require("../../models/userModel");
const Doctor = require("../../models/doctorModel");
const { validatorMiddleware } = require("../../middlewares/validatorMiddleware");

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