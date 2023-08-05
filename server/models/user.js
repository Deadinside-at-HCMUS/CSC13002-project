const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
        username: joi.string().min(5).max(15).required(),
        password: passwordComplexity().required(),
        email: joi.string().email().required(),
        phonenumber: joi.string().min(9).max(12).required(),
        gender: joi.string().valid("male", "female", "non-binary").required(),
        role: joi.string().valid("user", "collaborator", "admin").required(),
    });
    return schema.validate(user);
};

const User = mongoose.model("user", UserSchema);

module.exports = { User, validate };
