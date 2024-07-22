const User = require("../models/User");

const getUsersForSidebar = async (req, res) => {
    try {
        const currUserId = req.user._id;

        // extracting all the users except the current user
        const filteredUsers = await User.find({ _id: { $ne: currUserId } }).select("-password");


        return res.status(200).json({
            message: "User for sidebar",
            data: filteredUsers
        });


    } catch (err) {
        return res.status(500).json({
            message: err?.message || err,
            error: true
        });
    }
}


// get user details

const userDetails = async (req, res) => {
    try {
        const currUserId = req.user._id;
        const user = await User.findById(currUserId).select('-password');

        return res.status(200).json({
            message: "user-details",
            data: user,
            error: false
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true
        })
    }
}

// update user details

const updateUserDetails = async (req, res) => {
    try {

        const user = req?.user;

        // fields to update
        const { name, profilePic } = req.body;

        const updateUser = await User.updateOne({ _id: user._id }, {
            fullName: name,
            profilePic
        });


        const updatedUserInfo = await User.findById(user._id);
        // console.log("updated user info >>", updatedUserInfo);

        return res.status(201).json({
            message: "User info updated successfully ...",
            error: false,
            data: updatedUserInfo
        });
    } catch (err) {
        return res.status(500).json({
            message: err?.message || err,
            error: true
        })
    }
}
module.exports = { getUsersForSidebar, userDetails, updateUserDetails };