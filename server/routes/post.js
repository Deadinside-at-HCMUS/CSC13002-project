const express = require("express");
const router = express.Router();
// const { Post } = require("../models/post");
const { Post, validate } = require("../models/post");
const { User } = require("../models/user");
const verifyToken = require("../middleware/auth");
const validateObjectId = require("../middleware/validObjectId");

// @route POST api/post
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });

    const user = await User.findById(req.userId);
    if (!user)
        return res
            .status(400)
            .json({ success: false, message: "User not found!" });

    if (req.body.type == "Receiving") {
        if (req.body.match && req.body.match.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Only donating post can access this field",
            });
        }
    }

    const newPost = await Post({ ...req.body, author: user._id }).save();

    // res.status(201).send({ data: newPost });
    res.status(200).json({
        success: true,
        content: newPost,
        message: "A new post has been created",
    });
});

// @route GET api/post
// @desc Get post
// @access Private
router.get("/", verifyToken, async (req, res) => {
    const posts = await Post.find({ author: req.userId })
        .populate("author", "username email")
        .populate("match");
    return res.json({ success: true, posts });
});

// @route PUT api/post
// @desc Update post
// @access Private
router.put("/:id", [validateObjectId, verifyToken], async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post exists
        if (!post) {
            return res
                .status(404)
                .json({ success: false, message: "Post not found" });
        }

        const user = await User.findById(req.userId);
        if (!user._id.equals(post.author))
            return res
                .status(403)
                .send({ message: "User don't have access to edit!" });

        let updatedPost = {
            type: req.body.type || post.type,
            title: req.body.title || post.title,
            body: req.body.body || post.body,
            item: req.body.item || post.item,
            // quantity: req.body.quantity || post.quantity,
            // category: req.body.category || post.category,
            status: req.body.status || post.status,
            location: req.body.location || post.location,
            match: req.body.match || post.match,
            isArchived: req.body.isArchived || post.isArchived,
        };

        const { error } = validate(updatedPost);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const postUpdateCondition = { _id: req.params.id, author: req.userId };

        updatedPost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatedPost,
            {
                new: true,
            }
        );

        // User not authorised to update post or post not found
        if (!updatedPost)
            return res.status(401).json({
                success: false,
                message: "Post not found or user not authorised",
            });

        res.json({
            success: true,
            message: "Update successfully!",
            post: updatedPost,
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "An error occurred" });
    }
});

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, author: req.userId };
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

        // User not authorised or post not found
        if (!deletedPost)
            return res.status(401).json({
                success: false,
                message: "Post not found or user not authorised",
            });

        res.json({ success: true, post: deletedPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

module.exports = router;
