const joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema(
    {
        id: {
            type: String,
        },
        name: {
            type: String,
        },
        quantity: {
            type: String,
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
        author: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        items: {
            type: [itemSchema],
        },
        status: {
            type: String,
            enum: ["Posted", "Verified", "Waiting", "Done", "Doing"],
            default: "Posted",
        },
        location: {
            type: String,
            enum: [
                "An Giang",
                "Ba ria Vung tau",
                "Bac Giang",
                "Bac Kan",
                "Bac Lieu",
                "Bac Ninh",
                "Ben Tre",
                "Binh Dinh",
                "Binh Duong",
                "Binh Phuoc",
                "Binh Thuan",
                "Ca Mau",
                "Can Tho",
                "Cao Bang",
                "Da Nang",
                "Dak Lak",
                "Dak Nong",
                "Dien Bien",
                "Dong Nai",
                "Dong Thap",
                "Gia Lai",
                "Ha Giang",
                "Ha Nam",
                "Ha Noi",
                "Ha Tinh",
                "Hai Duong",
                "Hai Phong",
                "Hau Giang",
                "Hoa Binh",
                "Hung Yen",
                "Khanh Hoa",
                "Kien Giang",
                "Kon Tum",
                "Lai Chau",
                "Lam Dong",
                "Lang Son",
                "Lao Cai",
                "Long An",
                "Nam Dinh",
                "Nghe An",
                "Ninh Binh",
                "Ninh Thuan",
                "Phu Tho",
                "Phu Yen",
                "Quang Binh",
                "Quang Nam",
                "Quang Ngai",
                "Quang Ninh",
                "Quang Tri",
                "Soc Trang",
                "Son La",
                "Tay Ninh",
                "Thai Binh",
                "Thai Nguyen",
                "Thanh Hoa",
                "Thua Thien Hue",
                "Tien Giang",
                "Tp Ho Chi Minh",
                "Tra Vinh",
                "Tuyen Quang",
                "Vinh Long",
                "Vinh Phuc",
                "Yen Bai",
            ],
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
        photoUrl: {
            type: String,
        },
        photoId: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

const validate = (post) => {
    const itemSchema = {
        name: joi.string().required(),
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
        type: joi.string().valid("Donating", "Receiving"),
        title: joi.string(),
        body: joi.string(),
        items: joi.array().items(singleItemSchema),
        status: joi
            .string()
            .valid("Posted", "Verified", "Waiting", "Done", "Doing")
            .default("Posted")
            .allow(""),
        location: joi
            .string(),
        match: joi.array().default([]).optional(),
        isArchived: joi.boolean().default(false),
        photoId: joi.string(),
        photoUrl: joi.string(),
    });
    return schema.validate(post);
};

const Post = mongoose.model("post", postSchema);

module.exports = { Post, validate };
