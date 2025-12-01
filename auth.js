const {UserModel} = require("./db");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
async function auth(req, res, next) {
    try{
        const token = req.headers.token;
        const decodetoken = jwt.verify(token, JWT_SECRET);
        const foundUser = await UserModel.findOne({
            _id : decodetoken.userId
        })
        if(!foundUser) return res.status(400).json({msg : "invalid or expired token"});
        req.userId = foundUser._id;
        next();
    }catch(err) {
        res.json({
            msg : "invalid token",
            error : error.message
        })
    }
}

module.exports = auth;