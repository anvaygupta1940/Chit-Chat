const express = require("express");
const protectRoute = require("../helpers/protectRoute");
const { sendMessage, getMessages } = require("../controllers/messageControllers");


const router = express.Router();


// sending a new message
router.post("/send/:receiverId", protectRoute, sendMessage);

// extracting all messages between 2 users
router.get("/:receiverId", protectRoute, getMessages);


module.exports = router;