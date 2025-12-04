const { check } = require("express-validator");
const { validatorMiddleware } = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");

exports.get_user_by_id_validator = [

    check("id")
        .notEmpty()
        .withMessage("user id is required")
        .bail()
        .isMongoId()
        .withMessage("Invalid id foramt"),

    validatorMiddleware
]

exports.add_new_user_validator = [
    check("name")
        .notEmpty()
        .withMessage("user name is required")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Too short user name")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Too long user name"),

    check("email")
        .notEmpty()
        .withMessage("email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email format")
        .bail()
        .custom(async email => {

            const user = await User.findOne({ email });
            if (user) {
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
    check("address")
        .notEmpty()
        .withMessage("user address is required"),
    check("gender")
        .notEmpty()
        .withMessage("user gender is required").custom(gender => {
            if (["male", "female"].includes(gender))
                throw new Error("Invalid gender case");
            return true;
        }),
    check("address")
        .notEmpty()
        .withMessage("user phone is required"),
    check("image")
        .isURL()
        .withMessage("Invalid image URL")

    , validatorMiddleware
]

exports.update_user_data_validator = [
    check("name")
        .optional()
        .isLength({ min: 3 })
        .withMessage("Too short user name")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Too long user name"),
    check("gender")
        .optional()
        // .custom(gender => {
        //     if (!gender) return true;

        //     if (!["male", "female"].includes(gender.toLowerCase())) {
        //         console.log(["male", "female"].includes(gender.toLowerCase()))
        //         throw new Error("Invalid gender value, gender must male or female")
        //     }

        //     return true;
        // }),
        ,
    check("image")
        .optional()
        .isURL()
        .withMessage("Invalid image format"),

    validatorMiddleware
]

exports.delete_user_data_validator = [

    check("id")
        .notEmpty()
        .withMessage("user id is required")
        .bail()
        .isMongoId()
        .withMessage("Invalid id foramt"),

    validatorMiddleware
]

exports.change_user_password_validator = [
    check("id")
        .notEmpty()
        .withMessage("user is required")
        .isMongoId()
        .withMessage("Invalid Id format"),
    check("newPassword").notEmpty().withMessage("new Password is required"),
    check("currentPassword")
        .notEmpty()
        .withMessage("current password is required")
        .bail()
        .custom(async (currentPassword, { req }) => {

            if (!req.body.currentPassword) return true;

            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                throw new Error("there is no user for this id");
            }

            const isCurrentPassword = await bcrypt.compare(currentPassword, user.password);

            if (!isCurrentPassword) {
                throw new Error("Invalid current password!!");
            }

            return true;

        })
    ,
    check("passwordConfirm")
        .notEmpty()
        .withMessage("password confirmation is required")
        .custom(async (passwordConfirm, { req }) => {

            if (!req.body.newPassword) return true;

            const isMatched = req.body.newPassword === passwordConfirm;

            if (!isMatched) throw new Error("the password confirmation does not match!!");

            return true;

        })
    ,

    validatorMiddleware
]