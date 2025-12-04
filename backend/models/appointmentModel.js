const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    slotDate: {
        type: String,
    },
    slotTime: {
        type: String
    },
    userData: {
        type: Object
    },
    docData: {
        type: Object
    },
    amount: {
        type: Number
    },
    date: {
        type: Date
    },
    cancelled: {
        type: Boolean,
        default: false
    },
    payment: {
        type: Number
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
    ,
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        ref: "Doctor"
    }
}, {
    timestamps: true
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;