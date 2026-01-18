const express = require('express')
const router = express.Router()

// async function authAdmin(req, res, next){
//     try{
//         const token = req.headers.token;
//         const decodetoken = jwt.verify(token, JWT_SECRET);
//         const foundUser = await UserModel.findOne({
//             _id : decodetoken.userId
//         })
//         if(!foundUser) return res.status(400).json({msg : "invalid or expired token"});
//         req.userId = foundUser._id;
//         next();
//     }catch(err) {
//         res.json({
//             msg : "invalid token",
//             error : error.message
//         })
//     }
// }

// router.use(authAdmin);

router.post("/signup", async function(req, res, next) {
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
router.post("/signin", async function(req, res, next) {
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
router.get("/purchases", async function(req, res) {
    
})

module.exports = router