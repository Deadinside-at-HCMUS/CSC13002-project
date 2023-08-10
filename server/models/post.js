const joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            // required: true,
        },
        quantity: {
            type: Number,
            // required: true,
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
            ],
            // required: true,
        },
    },
    { timestamps: true }
);

const postSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["Donating", "Receiving"],
            // required: true,
        },
        title: {
            type: String,
            // required: true,
        },
        body: {
            type: String,
            // required: true,
        },
        // photo: {
        //   type: String, // Assuming you store the path or URL of the image
        // },
        author: {
            type: Schema.Types.ObjectId,
            ref: "user",
            // required: true,
        },
        item: {
            type: [itemSchema],
            // required: true,
        },
        // item: {
        //     type: String,
        //     required: true,
        // },
        // quantity: {
        //     type: Number,
        //     required: true,
        // },
        // category: {
        //     type: String,
        //     enum: [
        //         "Electronic",
        //         "Clothing",
        //         "Book",
        //         "Food",
        //         "Vehicle",
        //         "Household",
        //     ],
        //     required: true,
        // },
        status: {
            type: String,
            enum: ["Published", "Verified", "Matching", "Matched"],
            default: "Published",
            // required: true,
        },
        location: {
            type: String,
            // required: true,
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
                "Medical"
            )
            .required(),
    };

    const singleItemSchema = joi.object().keys(itemSchema);

    const schema = joi.object({
        type: joi.string().valid("Donating", "Receiving").required(),
        title: joi.string().required(),
        body: joi.string().required(),
        author: joi.string().allow(""),
        // item: joi.string().required(),
        // quantity: joi.number().greater(0).required(),
        // category: joi
        //     .string()
        //     .valid(
        //         "Electronic",
        //         "Clothing",
        //         "Book",
        //         "Food",
        //         "Vehicle",
        //         "Household"
        //     )
        //     .required(),
        // item: joi.object().keys(itemSchema).unknown(true),
        item: joi.array().items(singleItemSchema),
        status: joi
            .string()
            .valid("Published", "Verified", "Matching", "Matched")
            .default("Published")
            .allow(""),
        location: joi.string().required(),
        match: joi.array().default([]).optional(),
    });
    return schema.validate(post);
};

const Post = mongoose.model("post", postSchema);

module.exports = { Post, validate };
