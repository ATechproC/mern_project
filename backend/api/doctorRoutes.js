const express = require("express");

const {
    get_all_doctors,
    get_doctor_by_id,
} = require("../controllers/doctorController");
const { get_doctor_by_id_validator } = require("../utils/validators/doctorValidator");

const router = express.Router();

router.get("/",
    get_all_doctors
);

router.get("/:id",get_doctor_by_id_validator, get_doctor_by_id);

module.exports = router;