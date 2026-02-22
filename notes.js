const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const course = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
    creatorId: {
        type: ObjectId,
        ref: "admin"
    }
})

const purchase = new Schema({
    userId: {
        type: ObjectId,
        ref: "user",
        required: true
    },
    courseId: {
        type: ObjectId,
        ref: "course",
        required: true
    }
})

const admin = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model("user", user);
const courseModel = mongoose.model("course", course);
const purchaseModel = mongoose.model("purchase", purchase);
const adminModel = mongoose.model("admin", admin);

module.exports = {
    userModel,
    courseModel,
    purchaseModel,
    adminModel
}