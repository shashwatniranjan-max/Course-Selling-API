const {Router} = require("express");
const courseRouter = Router();

courseRouter.post("/purchase", (req, res, next) => {
    res.send("purchase endpoint");
})

courseRouter.post("/upload", (req, res, next) => {
    res.send("upload endpoint");
})

courseRouter.get("/preview", (req, res, next) => {
    res.send("preview endpoint")
})

module.exports = {
    courseRouter
}