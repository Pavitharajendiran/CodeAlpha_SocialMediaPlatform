const express = require("express");
const Profile = require("../models/Profile");

const router = express.Router();

// Create profile
router.post("/", async (req, res) => {
    try {
        const profile = await Profile.create(req.body);

        res.json({
            message: "Profile created successfully",
            profile
        });
    } catch (error) {
        res.status(400).json({
            message: "Profile creation failed"
        });
    }
});

// Get all profiles
router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find();

        res.json(profiles);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get profiles"
        });
    }
});

module.exports = router;
