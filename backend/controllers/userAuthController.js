const crypto = require('crypto');
const async_handler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const slugify = require("slugify");
const jwt = require("jsonwebtoken");
const sendEmail = require('../utils/sendEmail');

exports.createToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME
})

exports.signup = async_handler(async (req, res) => {

    req.body.slug = slugify(req.body.name)
    const user = new User(req.body);
    await user.save();

    const token = this.createToken({ userId: user._id })

    res.status(200).json({ data: user, token });
});

exports.login = async_handler(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(new ApiError("there is no user for this email", 404))

    const isHashedPassword = await bcrypt.compare(req.body.password, user.password);
    if (!user || !isHashedPassword) {
        return next(new ApiError("Invalid Credentials", 401));
    }

    user.isActive = true;

    await user.save();

    const token = this.createToken({ userId: user._id });

    res.status(200).json({ token });
});

exports.protect = async_handler(async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ApiError("Please login to get access to this route", 401));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decode.userId);

    if (!user) {
        return next(new ApiError("the user for this token does exist anymore", 401));
    }

    if (!user.isActive) return next(new ApiError("Your account is deactivate, please try login to get access to this resource", 401));

    if (user.passwordChangedAt) {
        if (decode.iat < Math.round(user.passwordChangedAt.getTime() / 1000)) {
            return next(new ApiError("this token does not belong to this user anymore, please try login", 401))
        }
    }

    req.user = user;

    next();
});

exports.forgot_password = async_handler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ApiError("There is no user for this email", 404));
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto.createHash('sha256')
        .update(resetCode)
        .digest('hex')

    user.passwordResetCode = hashedResetCode;
    user.passwordResetExpires = Date.now() + 10 * 1000 * 60;
    user.passwordResetVerify = false;

    await user.save()

    const message = `Hi ${user.name}, \nWe received a request to reset the password on your Prescripto Account. \n${resetCode} \nEnter this code to complete the reset \nThanks for helping us keep your account secure. \nThe Prescripto Team`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Your reset password code (valid for 10 min)",
            message
        })
    } catch (err) {

        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        user.passwordResetVerified = undefined;

        await user.save();

        return next(new ApiError("an error happened while trying to reset your password", 500))
    }

    res.status(200).json({ status: "success", message: "email send successfully" });
});

exports.verify_reset_code = async_handler(async (req, res, next) => {
    const hashedResetCode = crypto.createHash('sha256')
        .update(req.body.resetCode)
        .digest('hex')

    const user = await User.findOne({ passwordResetCode: hashedResetCode, passwordResetExpires: { $gt: Date.now() } });

    if (!user) return next(new ApiError("Reset Code is Invalid or Expired"));

    user.passwordResetVerify = true;
    await user.save();

    res.status(200).json({ status: "success" });
});

exports.reset_password = async_handler(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(new ApiError("there is no user for this email", 404));

    if (!user.passwordResetVerify) return next(new ApiError("the reset password is not verified yet", 400));

    user.password = await bcrypt.hash(req.body.newPassword, 12);
    user.passwordChangedAt = Date.now();

    await user.save();

    const token = this.createToken({ userId: user._id });

    res.status(200).json({ token });
});

exports.deactivate = async_handler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ApiError("There is no user for this email", 404))
    }

    user.isActive = false;

    await user.save();

    res.status(200).json({ status: "success", message: "Your account deactivate successfully" })
})