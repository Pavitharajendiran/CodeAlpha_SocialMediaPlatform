const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.json({
            message: "Registration successful",
            user
        });
    } catch (error) {
        res.status(400).json({
            message: "Registration failed",
            error: error.message
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Login failed"
        });
    }
});

module.exports = router;