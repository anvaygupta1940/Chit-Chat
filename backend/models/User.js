const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    gender: {
        type: String,
        require: true,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});


const User = mongoose.model("User", userSchema);
module.exports = User;