const { check } = require("express-validator")
const { validatorMiddleware } = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");

exports.signupValidator = [
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
        .bail()
        .withMessage("email is required")
        .isEmail()
        .withMessage("Invalid email")
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new Error("Email is already exists")
            }
            return true;
        }),
    // check("address")
    //     .notEmpty()
    //     .withMessage("User address is required"),
    // check("image")
    //     .optional()
    //     .isURL("Invalid image format"),
    check("password")
        .notEmpty()
        .withMessage("password is required")
        .bail()
        .isLength({ min: 8 })
        .withMessage("Too short password")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Too long password"),
    check("passwordConfirm").notEmpty().withMessage("password Confirmation is required").bail().custom((passwordConfirm, { req }) => {

        if (!req.body.password) return true;

        const isMatched = passwordConfirm === req.body.password;
        if (!isMatched) {
            throw new Error("The password confirmation does not match !!");
        }
        return true;
    }),
    // check("gender")
    //     .optional()
    //     .custom(gender => {
    //         if (!gender) return true;
    //         if (!(["male", "female"].includes(gender.toLowerCase()))) {
    //             throw new Error("Invalid gender value");
    //         }
    //         return true;
    //     }),
    // check("dateOfBirth")
    //     .notEmpty()
    //     .withMessage("the date of birth is required")
    // ,

    validatorMiddleware
];

exports.loginValidator = [
    check("email")
        .notEmpty()
        .bail()
        .withMessage("email is required")
        .isEmail()
        .withMessage("Invalid email"),
    check("password")
        .notEmpty()
        .withMessage("password is required"),
    check("passwordConfirm")
        .notEmpty()
        .withMessage("password Confirmation is required")
        .custom((passwordConfirm, { req }) => {

            if (!req.body.password) return true;

            const isMatched = passwordConfirm === req.body.password;
            if (!isMatched) {
                throw new Error("The password confirmation does not match !!");
            }
            return true;
        }),

    validatorMiddleware
];

exports.forget_password_validator = [
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email format"),

    validatorMiddleware
]

exports.verify_reset_code_validator = [
    check("resetCode").notEmpty().withMessage("Reset Code is required"),

    validatorMiddleware
]

exports.reset_password_validator = [
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email format"),
    check("newPassword")
        .notEmpty()
        .withMessage("New password is required"),
    check("passwordConfirm")
        .notEmpty()
        .withMessage("the password confirmation is required")
        .custom((passwordConfirm, { req }) => {
            if (req.body.password) return true;
            if (passwordConfirm !== req.body.newPassword) throw new Error("the password confirmation does not match")
            return true;
        }),

    validatorMiddleware
];

exports.deactivate_validator = [
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email format"),

    validatorMiddleware
]

