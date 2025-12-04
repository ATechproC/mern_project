const express = require("express");
const { signupValidator, loginValidator, forget_password_validator, verify_reset_code_validator, reset_password_validator, deactivate_validator } = require("../utils/validators/userAuthValidator");
const { login, signup, forgot_password, verify_reset_code, reset_password, deactivate } = require("../controllers/userAuthController");
const router = express.Router();

router.post("/signup", signupValidator, signup);

router.post("/login", loginValidator, login);

router.post("/forgot-password", forget_password_validator, forgot_password);

router.post("/verify-reset-code", verify_reset_code_validator, verify_reset_code);

router.put("/reset-password", reset_password_validator, reset_password);

router.post("/deactivate-account", deactivate_validator, deactivate);


module.exports = router;