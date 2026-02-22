const {Router} = require("express")
const userRouter = Router();

userRouter.post("/signup", (req, res, next) => {
    res.send("signup endpoint")
})

userRouter.post("/signin", (req, res, next) => {
    res.send("signin endpoint")
})

userRouter.get("/purchases", (req, res, next) => {
    res.send("purchases endpoint");
})


module.exports = {
    userRouter
}