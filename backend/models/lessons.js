import mongoose from "mongoose";

const lessonsSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course", // Ensure this matches your Course model name
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        videoURL: {
            type: String,
            required: true,
        },
        pdfURL: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number, // Duration in minutes or seconds as needed
            required: true,
        },
        class: {
            type: String,
            required: true,
            enum: ["grade06", "grade07", "grade08","grade09", "grade10", "grade11"], // Optional: level validation
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Lessons = mongoose.model("Lessons", lessonsSchema);
export default Lessons;
