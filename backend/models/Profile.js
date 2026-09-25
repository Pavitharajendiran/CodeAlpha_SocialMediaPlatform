const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    name: String,
    bio: String,
    profileImage: String
});

module.exports = mongoose.model("Profile", profileSchema);