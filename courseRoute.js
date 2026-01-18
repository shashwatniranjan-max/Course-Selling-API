const { Router } = require("express");
const courseRouter = Router();
const { CourseModel, UserModel } = require("./db");
const auth = require("./auth");

// GET endpoint to get all courses
courseRouter.get("/", async function(req, res) {
    try {
        const courses = await CourseModel.find({});
        res.json({
            message: "Courses retrieved successfully",
            courses: courses
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching courses",
            error: error.message
        });
    }
});

courseRouter.get("/preview", auth, async function(req, res) {
   
});

// POST endpoint to purchase a course
courseRouter.post("/purchase", auth, async function(req, res) {
    try {
        const { courseId } = req.body;
        const userId = req.userId;

        if (!courseId) {
            return res.status(400).json({
                message: "Course ID is required"
            });
        }

        // Check if course exists
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Check if user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // TODO: Implement actual payment processing here
        // For now, we'll just return a success message
        // You can add a Purchase model later to track purchases

        res.json({
            message: "Course purchased successfully",
            courseId: courseId,
            courseTitle: course.title
        });
    } catch (error) {
        res.status(500).json({
            message: "Error purchasing course",
            error: error.message
        });
    }
});

module.exports = courseRouter;