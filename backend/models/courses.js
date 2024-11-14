import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        instructorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users", // Ensure this matches your User model name
            required: true,
        },
        thumbnail: {
            type: String,
            default: "https://via.placeholder.com/150x150",
        },
        lessons: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lesson", // Ensure this matches your Lesson model name
            },
        ],
    },
    { timestamps: true } // Automatically manages createdAt and updatedAt
);

const courses = mongoose.model("courses", courseSchema);
export default courses;
