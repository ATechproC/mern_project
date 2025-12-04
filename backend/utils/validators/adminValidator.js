const { check } = require("express-validator");
const { validatorMiddleware } = require("../../middlewares/validatorMiddleware");

exports.login_validator = [
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("Invalid email format")
    ,
    check("password").notEmpty().withMessage("password is required"),
    check("passwordConfirm").notEmpty().withMessage("password confirmation is required")
        .custom((passwordConfirm, { req }) => {
            if (!req.body.password || !passwordConfirm) return true;
            if (passwordConfirm !== req.body.password)
                throw new Error("the password confirmation does not match!!");
            return true;
        }),
    validatorMiddleware
]