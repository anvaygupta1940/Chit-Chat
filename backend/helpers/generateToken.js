const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = async (userId, res) => {

    const token = await jwt.sign({ userId }, process.env.JWT_SEC_KEY, {
        expiresIn: "1d"
    });


    const tokenOption = {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    }
    

    res.cookie("token", token, tokenOption);
}

module.exports = generateTokenAndSetCookie;