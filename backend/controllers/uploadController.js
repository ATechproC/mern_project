const async_handler = require("express-async-handler");
const multer = require("multer");
const { cloudinary } = require("../utils/cloudinary");

// Multer config (stores file temporarily in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.uploadImageMiddleware = upload.single("image");

exports.uploadImage = async_handler(async (req, res, next) => {

    if (req.file) {
        // return res.status(400).json({ message: "No image file uploaded" });
        // Convert buffer to base64
        const base64Image = req.file.buffer.toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

        const uploadedImage = await cloudinary.uploader.upload(dataURI, {
            upload_preset: "dev_setups",
        });
        req.body.image = uploadedImage.secure_url;
        
    }else req.body.image = req.user.image;

    next();
});