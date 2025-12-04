const ApiError = require("../utils/ApiError");

const sendErrorForDev = (res, err) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorForProd = (res, err) => {
    res.status(err.statusCode).json({
        status: err.status,
        msg: err.message,
    })
}

const handleJWTInvalidToken = () => new ApiError("Invalid token, please try login again!", 401);
const handleJWTExpired = () => new ApiError("Expired token, please try login again!", 401)

const handleErrorsMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (process.env.NODE_ENV === "development") sendErrorForDev(res, err);
    else {
        if (err.name === "JsonWebTokenError") err = handleJWTInvalidToken();
        if (err.name === "TokenExpiredError") err = handleJWTExpired();
        sendErrorForProd(res, err)
    }
}

module.exports = handleErrorsMiddleware;