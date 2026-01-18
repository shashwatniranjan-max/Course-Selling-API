const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// User Schema
const User = new Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Admin Schema
const Admin = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin'],
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Course Schema
const Course = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    published: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: ObjectId,
        ref: 'admins',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Purchase Schema
const Purchase = new Schema({
    userId: {
        type: ObjectId,
        ref: 'users',
        required: true
    },
    courseId: {
        type: ObjectId,
        ref: 'courses',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        trim: true
    },
    transactionId: {
        type: String,
        trim: true
    },
    purchasedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Create indexes for better query performance
Purchase.index({ userId: 1, courseId: 1 }, { unique: true }); // Prevent duplicate purchases
Course.index({ published: 1 });
User.index({ email: 1 });

// Create models
const UserModel = mongoose.model("users", User);
const AdminModel = mongoose.model("admins", Admin);
const CourseModel = mongoose.model("courses", Course);
const PurchaseModel = mongoose.model("purchases", Purchase);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
};