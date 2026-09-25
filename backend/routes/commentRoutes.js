const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

// Add comment
router.post("/", async (req, res) => {
    try {
        const comment = await Comment.create(req.body);

        res.json({
            message: "Comment added successfully",
            comment
        });
    } catch (error) {
        res.status(400).json({
            message: "Comment failed"
        });
    }
});

// Get comments for a post
router.get("/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({
            postId: req.params.postId
        }).sort({ createdAt: 1 });

        res.json(comments);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get comments"
        });
    }
});

module.exports = router;