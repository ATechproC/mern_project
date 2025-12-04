const { check } = require("express-validator");
const { validatorMiddleware } = require("../../middlewares/validatorMiddleware");
const Doctor = require("../../models/doctorModel");
const bcrypt = require("bcryptjs");

exports.get_doctor_by_id_validator = [

    check("id")
        .notEmpty()
        .withMessage("Doctor id is required")
        .bail()
        .isMongoId()
        .withMessage("Invalid id format"),

    validatorMiddleware
]

exports.add_new_doctor_validator = [
    check("name")
        .notEmpty()
        .withMessage("Doctor name is required")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Too short Doctor name")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Too long doctor name"),

    check("email")
        .notEmpty()
        .withMessage("email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email format")
        .bail()
        .custom(async email => {

            const doctor = await Doctor.findOne({ email });
            if (doctor) {
                throw new Error("This email is already exist!!");
            }

            return true;

        }),

    check("password")
        .notEmpty()
        .withMessage("password is required")
        .bail()
        .isLength({ min: 8 })
        .withMessage("Too short password")
        .bail()
        .isLength({ max: 32 })
        .withMessage("Too long password"),
    check("passwordConfirm")
        .notEmpty()
        .withMessage("password confirmation is required")
        .bail()
        .custom(async (passwordConfirm, { req }) => {

            if (!req.body.password) return true;

            const isMatched = req.body.password === passwordConfirm;

            if (!isMatched) throw new Error("the password confirmation does not match!!");

            return true;

        }),

    check("specialty")
        .notEmpty()
        .withMessage("Doctor specialty is required"),
    check("experience")
        .notEmpty()
        .withMessage("Doctor experience is required"),
    check("about")
        .notEmpty()
        .withMessage("Doctor about is required"),
    check("fees")
        .notEmpty()
        .withMessage("Doctor fees is required"),
    check("address")
        .notEmpty()
        .withMessage("Doctor address is required"),
    // check("date")
    //     .notEmpty()
    //     .withMessage("Doctor date is required"),
    check("address")
        .notEmpty()
        .withMessage("Doctor address is required"),
    check("image")
        .notEmpty()
        .withMessage("image URL is required")
        .isURL().withMessage("Invalid image URL")


    , validatorMiddleware
]

exports.update_doctor_data_validator = [
    check("name")
        .notEmpty()
        .withMessage("Doctor name is required")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Too short Doctor name")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Too long doctor name"),

    check("email")
        .notEmpty()
        .withMessage("email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email format")
        .bail()
        .custom(async email => {
            const doctor = await Doctor.findOne({ email });

            if (!doctor) {
                throw new Error("This email is already exists!!");
            }

            return true;

        }),

    check("speciality")
        .notEmpty()
        .withMessage("Doctor speciality is required"),
    check("experience")
        .notEmpty()
        .withMessage("Doctor experience is required"),
    check("about")
        .notEmpty()
        .withMessage("Doctor about is required"),
    check("fees")
        .notEmpty()
        .withMessage("Doctor fees is required"),
    check("address")
        .notEmpty()
        .withMessage("Doctor address is required"),
    check("date")
        .notEmpty()
        .withMessage("Doctor date is required"),
    check("address")
        .notEmpty()
        .withMessage("Doctor address is required"),
    check("available")
        .isBoolean()
        .withMessage("available value should be a boolean value")
    ,

    validatorMiddleware
]

exports.change_availability_validator = [
    check("id")
        .notEmpty()
        .withMessage("Id is required")
        .isMongoId()
        .withMessage("Invalid id format"),

    validatorMiddleware
]

exports.delete_doctor_data_validator = [

    check("id")
        .notEmpty()
        .withMessage("Doctor id is required")
        .bail()
        .isMongoId()
        .withMessage("Invalid id format"),

    validatorMiddleware
]

exports.change_doctor_password_validator = [
    check("id")
        .notEmpty()
        .withMessage("Doctor is required")
        .isMongoId()
        .withMessage("Invalid Id format"),
    check("newPassword").notEmpty().withMessage("new Password is required"),
    check("currentPassword")
        .notEmpty()
        .withMessage("current password is required")
        .bail()
        .custom(async (currentPassword, { req }) => {

            if (!req.body.newPassword) return true;

            const { id } = req.params;
            const doctor = await Doctor.findById(id);

            const isCurrentPassword = await bcrypt.compare(currentPassword, doctor.password);

            if (!isCurrentPassword) {
                throw new Error("Invalid current password!!");
            }

            return true;

        }).custom(async (passwordConfirm, { req }) => {

            if (!req.body.newPassword) return true;

            const isMatched = req.body.password === passwordConfirm;

            if (!isMatched) throw new Error("the password confirmation does not match!!");

            return true;

        }),

    validatorMiddleware
]