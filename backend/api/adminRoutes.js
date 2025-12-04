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

// router.get("/", get_all_doctors);

// router.get("/:id", get_doctor_by_id_validator, get_doctor_by_id);

// router.put("update-doctor/:id", update_doctor_data_validator, update_doctor_data);

// router.put("/change-password/:id", change_doctor_password)

// router.delete("/delete-doctor/:id", delete_doctor_data_validator, delete_doctor_data);

module.exports = router;