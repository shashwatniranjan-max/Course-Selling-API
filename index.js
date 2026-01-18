const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Environment configuration
require("dotenv").config();

// Routes
const courseRouter = require("./courseRoute");
const userRouter = require("./userRoute");

app.use("/user", userRouter);
app.use("/course", courseRouter);

// Protected route to get current user info
const auth = require("./auth");
const { UserModel } = require("./db");

app.get("/me", auth, async function(req, res) {
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId).select("-password");
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User retrieved successfully",
            user: user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;