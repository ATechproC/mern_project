const async_handler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const createToken = require("../utils/createToken");
const jwt = require("jsonwebtoken");

exports.login = async_handler(async (req, res, next) => {

    const { password, email } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return next(new ApiError("Invalid credentials", 401))
    }

    const token = createToken(email + password);

    res.status(200).json({ token });
})

exports.protect = async_handler(async (req, res, next) => {
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    
    if(!token) {
        return next(new ApiError("Please try log in to get access to this resource!!", 401));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if(decode.adminData !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        return new ApiError("Invalid token, please try login to get access to this resource", 401);
    }

    next();

})