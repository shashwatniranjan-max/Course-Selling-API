const mongoose = require("mongoose");
const { float32 } = require("zod");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    Firstname: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const admin = new Schema({
    Firstname: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const course = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    creatorId: {
        type: ObjectId,
        required: true,
        ref: "admin"
    },
    imageUrl: {
        type: String,
        unique: true
    },
    price: {
        type: Number,
        required: true
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

const UserModel = mongoose.model("user", user);
const AdminModel = mongoose.model("admin", admin);
const CourseModel = mongoose.model("course", course);
const PurchaseModel = mongoose.model("purchase", purchase);
