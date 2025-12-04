const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "user name is required"],
        minlength: [3, "Too short name"],
        maxlength: [100, "Too long name"],
        trim: true
    },
    slug: {
        type: String,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "user email is required"],
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, "Too short password"],
        maxlength: [100, "Too long password"],
        trim: true
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerify: Boolean,
    address: {
        type: String,
    },
    image: {
        type: String,
    },
    gender: {
        type: String,
        lowercase: true,
        trim: true
    },
    birthday : {
        type: String,
    },
    phone: String,
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function () {
    // Only run if password was modified
    if (!this.isModified('password')) return;

    // Hash the password with cost factor 12
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;