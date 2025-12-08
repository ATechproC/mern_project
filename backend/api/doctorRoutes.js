const express = require("express");

const {
    get_all_doctors,
    get_doctor_by_id,
    doctorLogin,
    gitDoctorId,
    protect,
    getSpecificAppointments,
    doctorCancelAppointment,
    completedAppointment,
    getDoctorDashData,
    change_availability,
} = require("../controllers/doctorController");
const { get_doctor_by_id_validator, doctorLoginValidator, getSpecificAppointmentsValidator, cancelAppointmentDoctorValidator } = require("../utils/validators/doctorValidator");
const { completeAppointmentValidator } = require("../utils/validators/appointmentValidator");


const router = express.Router();

router.get("/",
    get_all_doctors
);

router.get("/:id", get_doctor_by_id_validator, get_doctor_by_id);

router.post("/login", doctorLoginValidator, doctorLogin);

router.post("/appointments", protect, gitDoctorId, getSpecificAppointmentsValidator, getSpecificAppointments);

router.post("/cancel-appointment/:id", protect,  cancelAppointmentDoctorValidator, doctorCancelAppointment);

router.post("/complete-appointment/:id", protect, completeAppointmentValidator, completedAppointment);

router.post("/get-dashData", protect, getDoctorDashData);

router.post("/profile", protect, gitDoctorId, get_doctor_by_id_validator, get_doctor_by_id);

router.put("/change-availability", protect, gitDoctorId, change_availability)
module.exports = router;