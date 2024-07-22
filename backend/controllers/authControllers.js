const generateTokenAndSetCookie = require("../helpers/generateToken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");


const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password's don't match.",
                error: true
            });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                message: "User already exist.",
                error: true
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const payload = {
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        };

        const newUser = new User(payload);
        const savedUser = await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            error: false,
            data: {
                _id: savedUser?._id,
                fullName: savedUser?.fullName,
                username: savedUser?.username,
                profilePic: savedUser?.profilePic
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: err?.message || err,
            error: true
        })
    }
}



const login = async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const isPasswordMatch = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid - credentials.",
                error: true
            });
        }

        await generateTokenAndSetCookie(user?._id, res);
        
        return res.status(200).json({
            message: "User login successfully",
            error: false,
            data: {
                _id: user?._id,
                fullName: user?.fullName,
                username: user?.username,
                profilePic: user?.profilePic,
            }
        });


    } catch (err) {
        return res.status(500).json({
            message: err?.message || err,
            error: true
        })
    }
}


const logout = async (req, res) => {
    try {

        res.cookie("chat_token", "", { maxAge: 0 });
        return res.status(200).json({
            message: "User logout successfully ...",
            error: false
        })
    } catch (err) {
        return res.status(500).json({
            message: err?.message || err,
            error: true
        })
    }
}


module.exports = { signup, login, logout };