import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "student", "instructor"],
            default: "student",
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        age: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String, // Changed to String for potential country codes
            required: true,
        },
        enrolledCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "courses",
            },
        ],
        profilePicture: {
            type: String,
            default: null,
        },
        createdCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "courses",
            },
        ],
        lastLogin: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

const users = mongoose.model("users", userSchema);
export default users;
