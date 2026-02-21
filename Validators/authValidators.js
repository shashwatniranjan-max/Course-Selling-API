const {z} = require('zod');
const signupSchema = z.object({
    name: z.string().min(5).max(25),
    email: z.string().min(7).max(50).email(),
    password: z.string().min(5).max(100)
}).strict();

const signinSchema = z.object({
    email: z.string().min(7).max(50).email(),
    password: z.string().min(5).max(100)
}).strict();

module.exports = {
    signinSchema,
    signupSchema
}