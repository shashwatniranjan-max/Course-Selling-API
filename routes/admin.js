const {Router} = require("express");
const adminRouter = Router();

adminRouter.use(adminMiddleware);

adminRouter.post("/signup", (req, res, next) => {
    res.json({
        msg: "signup endpoint of admin"
    })
})

adminRouter.post("/signin", (req, res, next) => {
    res.json({
        msg: "signin endpoint of admin"
    })
})

adminRouter.post("/create/course", (req, res, next) => {
    res.json({
        msg: "signup endpoint of admin"
    })
})

adminRouter.delete("/delete/course", (req, res, next) => {
    res.json({
        msg: "delete endpoint for courses for admin"
    })
})


adminRouter.put("/course/content", (req, res, next) => {
    res.json({
        msg: "endpoint to add the course content for admin"
    })
})









module.exports = {
    adminRouter
}