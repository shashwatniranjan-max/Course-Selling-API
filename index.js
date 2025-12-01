const espress = require("express");
const app = express();
app.use(express.json);
import { parse } from "dotenv";
import {z} from zod;
const bcrypt = require("bcrypt");
const {UserModel, CourseModel} = require("./db");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const auth = require("./auth");

app.post("/user/signup", async function(req, res) {
    const requiredBody = z.object({
       name : z.string().min(5).max(25),
       email : z.email().min(7).max(50),
       password : z.string()
    })
    try {
        const parseDataWithSuccess = requiredBody.safeParse(req.body, {strict : true});
        if(!parseDataWithSuccess.success) {
            console.log(parseDataWithSuccess.error.message);
            return res.status(400).json({msg : "Incorrect format", error : parseDataWithSuccess.error.message})
        }
        const {name , email, password} = parseDataWithSuccess.data;
        const foundUser = await UserModel.findOne({
            email
        })
        if(foundUser) {
            return res.json({msg : "User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            name : name,
            email : email,
            password : hashedPassword
        })
        res.json({
            msg : "Signed up"
        })
    }catch(err) {
        res.status(403).json({
            msg : "error occurred",
            error : err.message
        })
    }
})

app.post("/user/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const foundUser = await UserModel.findOne({
        email 
    })
    if(!foundUser) return res.status(403).json({
        msg :"Incorrect credentials"
    })
    const isTrue = await bcrypt.compare(password, foundUser.password);
    if(!isTrue) {
        return res.status(403).json({msg : "Incorrect password"})
    }
    const token = jwt.sign({
        userId : foundUser._id
    }, JWT_SECRET)

    res.json({
        msg : "signed in",
        token : token
    })
})

app.get("/user/purchases", auth, async function(req, res) {

})

app.get("/courses", auth, async function(req, res) {
   
})

app.post("/courses/purchase", auth, async function(req, res) {
    
})

app.get("/me", async function(req, res) {
    
})