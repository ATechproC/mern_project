class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
        this.operationl = true;
    }
}

module.exports = ApiError;