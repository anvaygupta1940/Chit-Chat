const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    receiverId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    text: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        default: ""
    },
    videoUrl: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;