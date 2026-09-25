const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/codealpha_socialmedia")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB error:", err));

app.get("/", (req, res) => {
    res.send("Social Media Backend Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});