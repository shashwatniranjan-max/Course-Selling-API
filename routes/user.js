const {Router} = require('express');
const userRouter = Router();

userRouter.post("/user/signup", Validation(signupSchema), async function(req, res, next) {
    const {name, email, password} = req.body;
    const foundUser = await 
})

userRouter.post("/user/signin", Validation(signinSchema), async function(req, res, next) {
    
})


userRouter.get("/Courses", async function(req, res, next) {

})

userRouter.get("/user/purchases", async function(req, res, next) {

})
