const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const handleErrorsMiddleware = require("./middlewares/errorHandlingMiddleware");

dotenv.config({ path: "config.env" })

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode : ${process.env.NODE_ENV}`)
}

// middlewares : 

app.use(express.json());
app.use(cors());

// set up routes :

    //  Doctor Routes : 
    const doctorRoutes = require("./api/doctorRoutes");
    app.use("/api/v1/doctors", doctorRoutes);
    
    // User Routes : 
    const userRoutes = require("./api/userRoutes");
    app.use("/api/v1/users", userRoutes);

    // admin Routes :
    const adminRoutes = require("./api/adminRoutes");
    app.use("/api/v1/admin", adminRoutes);

    // userAuthentication Routes :
    const userAuthRoutes = require("./api/userAuthRoutes");
    app.use("/api/v1/auth", userAuthRoutes);
    
    app.all(/.*/, (req, res, next) => {
        next(new ApiError(`Can't find this route : ${req.originalUrl}`, 404));
    })

// Global handling errors inside express : 

app.use(handleErrorsMiddleware)

// db connection : 
const dbConnect = require("./config/database");
const ApiError = require("./utils/ApiError");

const server = () => {
    return app.listen(PORT, () => {
        console.log(`the server is running on the port ${PORT}`);
    });
}

dbConnect().then(() => {
    server();
}).catch((err) => {
    console.log("failed to start the server : ", err);
});

