const jwt = require("jsonwebtoken")
const User = require("../models/User");


const protectRoute = async (req, res, next) => {
    try {

        const token = req.cookies.token;
        

        if (!token) {
            return res.status(400).json({
                message: "Unauthorized - No token provided.",
                error: true
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SEC_KEY);

        if (!decoded) {
            return res.status(400).json({
                message: "Unauthorized - Invalid Token",
                error: true
            })
        }


        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                error: true
            })
        }

        req.user = user;

        next();


    } catch (err) {
        return res.status(500).json({
            message: err?.message || err,
            error: true
        })
    }
}


module.exports = protectRoute;