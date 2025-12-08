const express = require("express");

const {
    login,
    protect
} = require("../controllers/adminController");

const {
    login_validator
} = require("../utils/validators/adminValidator");

const router = express.Router();


const {
    add_new_doctor,
    get_all_doctors,
    change_availability,
} = require("../controllers/doctorController");

const {
    add_new_doctor_validator,
    change_availability_validator,
} = require("../utils/validators/doctorValidator");
const { uploadImageMiddleware, uploadImage } = require("../controllers/uploadController");
const { adminAppointments, adminCancelAppointment, getDashData } = require("../controllers/appointmentController");
const { cancelAppointmentAdminValidator } = require("../utils/validators/appointmentValidator");

router.post("/login", login_validator, login);

router.post("/add-doctor",
    protect,
    uploadImageMiddleware,
    uploadImage,
    add_new_doctor_validator,
    add_new_doctor
);

router.post("/all-doctors",
    protect,
    get_all_doctors
);

router.put("/change-availability/:id",
    protect,
    change_availability_validator,
    change_availability
)

router.get("/appointments",protect, adminAppointments);

router.post("/cancel-appointment/:id", protect, cancelAppointmentAdminValidator, adminCancelAppointment);

router.get("/get-dashData", protect, getDashData);

module.exports = router;