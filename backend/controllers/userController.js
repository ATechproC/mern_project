const async_handler = require("express-async-handler");
const { default: slugify } = require("slugify");
const User = require("../models/userModel");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const { pagination } = require("../utils/pagination");
const { createToken } = require("./userAuthController");

exports.add_new_user = async_handler(async (req, res) => {

    req.body.slug = slugify(req.body.name);
    const newUser = new User(req.body)
    await newUser.save();

    res.status(201).json({ data: newUser });
});

exports.get_all_users = async_handler(async (req, res) => {

    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);

    const numberOfDocument = await User.countDocuments();

    const paginationResult = pagination(page, numberOfDocument, limit, skip);

    res.status(200).json({ result: users.length, pagination: paginationResult, data: users });
});

exports.get_user_by_id = async_handler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
        return next(new ApiError("there is no user with this id", 404));
    }

    res.status(200).json({ data: user })
});

exports.update_user_data = async_handler(async (req, res, next) => {

    const { id } = req.params;
    const { name, image, address, gender, birthday , phone } = req.body;

    // if(!name && !image && !address && !gender && !dateOfBirth && !phone) {
    //     return next(new ApiError("no value is updated", 400))
    // }

    const user = await User.findByIdAndUpdate(id, {
        name,
        slug: slugify(req.body.name),
        image,
        address,
        gender,
        birthday,
        phone
    }, { new: true })

    if (!user) {
        return next(new ApiError("there is no user for this id", 404))
    }

    res.status(200).json({ message: "profile info updated seccessfully", data: user })
});

exports.change_user_password = async_handler(async (req, res, next) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {
        password: await bcrypt.hash(req.body.newPassword, 12),
        passwordChangedAt: Date.now()
    }, { new: true });

    if (!user) {
        return next(new ApiError("There is no user for this id", 404));
    }

    const token = createToken({ userId: user._id });

    res.status(200).json({ data: user, token });

})

exports.delete_user_data = async_handler(async (req, res, next) => {

    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return next(new ApiError("there is no user for this id", 404))
    }

    res.status(200).json({ message: "user date deleted successfully", data: user })
});

exports.change_logged_user_password = async_handler(async (req, res, next) => {
    req.params.id = req.user._id;
    next();
})

exports.update_logged_user_data = async_handler(async (req, res, next) => {
    req.params.id = req.user._id;
    next();
});

exports.get_logged_user_data = async_handler(async (req, res, next) => {
    req.params.id = req.user._id;
    next();
})