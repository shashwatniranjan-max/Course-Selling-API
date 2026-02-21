const express = require("express");
require('dotenv').config();
const {Router} = require("express");
const userRouter = Router();
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
mongoose.connect(MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Error connecting the database", err));

const jwt = require("jsonwebtoken");
const {userModel, courseModel, purchaseModel} = require("./db");
const router = express.Router();
const app = express();
app.use(express.json());
const {signupSchema, signinSchema} = require("./Validators/authValidators");
const Validation = require("./Middleware/validation");
const auth = require("./Middleware/auth");

app.post("/user/signup", Validation(signupSchema), async function(req, res, next) {
    try {
        const {name, email, password} = req.body;
        
        const foundUser = await userModel.findOne({email});
        
        if (foundUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        res.json({
            message: "User created successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

app.post("/user/signin", Validation(signinSchema), async function(req, res, next) {
    try {
        const {email, password} = req.body;
        
        const foundUser = await userModel.findOne({email});
        
        if (!foundUser) {
            return res.status(403).json({
                message: "Invalid credentials"
            });
        }

        const passwordMatch = await bcrypt.compare(password, foundUser.password);
        
        if (!passwordMatch) {
            return res.status(403).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({
            id: foundUser._id
        }, JWT_SECRET);

        res.json({
            token,
            message: "Signin successful"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

app.get("/courses", async function(req, res, next) {
    try {
        const courses = await courseModel.find({});
        
        res.json({
            courses
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

app.post("/user/purchase", auth, async function(req, res, next) {
    try {
        const userId = req.userId;
        const {courseId} = req.body;

        const course = await courseModel.findById(courseId);
        
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const existingPurchase = await purchaseModel.findOne({
            userId,
            courseId
        });

        if (existingPurchase) {
            return res.status(400).json({
                message: "Course already purchased"
            });
        }

        await purchaseModel.create({
            userId,
            courseId
        });

        res.json({
            message: "Course purchased successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error purchasing course",
            error: error.message
        });
    }
});

app.get("/user/purchases", auth, async function(req, res, next) {
    try {
        const userId = req.userId;

        const purchases = await purchaseModel.find({userId}).populate("courseId");

        res.json({
            purchases
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching purchases",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

