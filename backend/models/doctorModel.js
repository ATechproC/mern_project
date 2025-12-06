const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "doctor name is required"],
        minlength: [3, "Too short name"],
        maxlength: [100, "Too long name"]
    },
    slug: String,
    email: {
        type: String,
        required: [true, "doctor email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, "Too short password"],
        maxlength: [32, "Too long password"]
    },
    image: {
        type : String,
        require : [true, "Doctor image is required"]
    },
    specialty: {
        type: String,
        required: [true, "Doctor specialty is required"],
        lowercase : true
    },
    degree: {
        type: String,
        required: [true, "Doctor degree is required"]
    },
    experience: {
        type: String,
        required: [true, "Doctor experience is required"]
    },
    about: {
        type: String,
        required: [true, "Doctor about is required"]
    },
    available: {
        type: Boolean,
        default: true
    },
    fees: {
        type: Number,
        required: [true, "Doctor fees is required"]
    },
    address: {
        type: String,
        required: [true, "Doctor address is required"]
    },
    slots_books: {
        type: Object,
        default: {}
    }
}, {
    minimize: true,
    timestamps: true
});

doctorSchema.pre('save', async function (next) {
    // Only run if password was modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost factor 12
    this.password = await bcrypt.hash(this.password, 12);
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;