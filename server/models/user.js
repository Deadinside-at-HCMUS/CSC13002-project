const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ["user", "collaborator", "admin"],
        default: "user",
        required: true,
    },
});

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ userId: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

const validate = (user) => {
    const schema = joi.object({
        username: joi.string().min(5).max(15),
        password: passwordComplexity(),
        email: joi.string().email(),
        fullName: joi.string().min(3).max(30),
        dateOfBirth: joi.string(),
        location: joi.string(),
        phonenumber: joi.string().min(9).max(12),
        gender: joi.string().valid("male", "female", "non-binary"),
        role: joi.string().valid("user", "collaborator", "admin"),
    });
    return schema.validate(user);
};

const User = mongoose.model("user", UserSchema);

module.exports = { User, validate };
