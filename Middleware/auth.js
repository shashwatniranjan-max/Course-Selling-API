const jwt = require("jsonwebtoken");
require('dotenv').config()
const {userModel} = require("../db");
const JWT_SECRET = process.env.JWT_SECRET;

async function auth(req, res, next) {
    try {
        const token = req.headers.token;
        
        if (!token) {
            return res.status(401).json({
                message: "Token not provided"
            });
        }

        const decodeToken = jwt.verify(token, JWT_SECRET);
        
        const foundUser = await userModel.findById(decodeToken.id);
        
        if (!foundUser) {
            return res.status(403).json({
                message: "User not found"
            });
        }

        req.userId = decodeToken.id;
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = auth;