const express = require("express");

const {
    add_new_user,
    get_all_users,
    get_user_by_id,
    update_user_data,
    delete_user_data,
    change_user_password,
    change_logged_user_password,
    update_logged_user_data,
    get_logged_user_data
} = require("../controllers/userController");

const {
    add_new_user_validator,
    get_user_by_id_validator,
    update_user_data_validator,
    delete_user_data_validator,
    change_user_password_validator
} = require("../utils/validators/userValidator");
const { protect } = require("../controllers/userAuthController");
const { uploadImage, uploadImageMiddleware } = require("../controllers/uploadController");

const { bookAppointment, get_user_id, my_appointments, cancelAppointment,
    // bookedAppoitment 
} = require("../controllers/appointmentController");
const { bookAppointment_validator, cancelAppointmentValidator } = require("../utils/validators/appointmentValidator");

const router = express.Router();

router.put("/update-password",
    protect,
    change_logged_user_password,
    change_user_password_validator,
    change_user_password
);

router.put("/update-data",
    protect,
    uploadImageMiddleware,
    uploadImage,
    update_logged_user_data,
    update_user_data_validator,
    update_user_data
);

router.get("/get-logged-user-data",
    protect,
    get_logged_user_data,
    get_user_by_id_validator,
    get_user_by_id
);

router.post("/add-user", add_new_user_validator, add_new_user);

router.get("/", get_all_users);

router.get("/:id", get_user_by_id_validator, get_user_by_id);

router.put("update-user/:id", update_user_data_validator, update_user_data);

router.put("/change-password/:id", change_user_password_validator, change_user_password)

router.delete("/delete-user/:id", delete_user_data_validator, delete_user_data);

router.post("/book-appointment", protect, get_user_id, bookAppointment_validator, bookAppointment);

router.post("/my-appointments", protect, my_appointments);

router.post("/cancel-appointment", protect, cancelAppointmentValidator, cancelAppointment);

module.exports = router;