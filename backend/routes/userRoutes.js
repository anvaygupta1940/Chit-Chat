const express = require("express");
const protectRoute = require("../helpers/protectRoute");
const { getUsersForSidebar, userDetails, updateUserDetails } = require("../controllers/userController");

const router = express.Router();

// extracting users for sidebar
router.get("/", protectRoute, getUsersForSidebar);
// extracting user details
router.get("/user-details", protectRoute, userDetails);
// update user detials
router.post("/update-user", protectRoute, updateUserDetails);

module.exports = router;