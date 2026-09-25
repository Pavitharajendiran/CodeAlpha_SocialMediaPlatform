const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// Create a post
router.post("/", async (req, res) => {
    try {
        const post = await Post.create(req.body);

        res.json({
            message: "Post created successfully",
            post
        });
    } catch (error) {
        res.status(400).json({
            message: "Post creation failed",
            error: error.message
        });
    }
});

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get posts"
        });
    }
});

// Like a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );

        res.json(post);
    } catch (error) {
        res.status(400).json({
            message: "Like failed"
        });
    }
});

module.exports = router;
module.exports = router;