const joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        category: {
            type: String,
            enum: [
                "Electronic",
                "Clothing",
                "Book",
                "Food",
                "Vehicle",
                "Household",
                "Medical",
                "Unknown",
            ],
            default: "Unknown",
        },
    },
    { timestamps: true }
);

const postSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["Donating", "Receiving"],
        },
        title: {
            type: String,
        },
        body: {
            type: String,
        },
        // photo: {
        //   type: String, // Assuming you store the path or URL of the image
        // },
        author: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        item: {
            type: [itemSchema],
        },
        status: {
            type: String,
            enum: ["Posted", "Verified", "Waiting", "Done", "Doing"],
            default: "Posted",
        },
        location: {
            type: String,
        },
        match: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "post",
                },
            ],
            default: [],
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const validate = (post) => {
    const itemSchema = {
        name: joi.string().required(),
        quantity: joi.number().greater(0).required(),
        category: joi
            .string()
            .valid(
                "Electronic",
                "Clothing",
                "Book",
                "Food",
                "Vehicle",
                "Household",
                "Medical",
                "Unknown"
            )
            .default("Unknown"),
    };

    const singleItemSchema = joi.object().keys(itemSchema).unknown(true);

    const schema = joi.object({
        type: joi.string().valid("Donating", "Receiving").required(),
        title: joi.string().required(),
        body: joi.string().required(),
        author: joi.string().allow(""),
        item: joi.array().items(singleItemSchema),
        status: joi
            .string()
            .valid("Posted", "Verified", "Waiting", "Done", "Doing")
            .default("Posted")
            .allow(""),
        location: joi.string().required(),
        match: joi.array().default([]).optional(),
        isArchived: joi.boolean().default(false),
    });
    return schema.validate(post);
};

const Post = mongoose.model("post", postSchema);

module.exports = { Post, validate };
