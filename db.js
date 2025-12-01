const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
})

const Course = new Schema({
    title : String,
    url : String,
    userId : ObjectId
})

const admin = new Schema({

})

const purchase = new Schema({
    
})

const UserModel = mongoose.model("users", User);
const CourseModel = mongoose.model("courses", Course);
module.exports = {
    UserModel,
    CourseModel
}