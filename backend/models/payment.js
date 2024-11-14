import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users", // Ensure this matches your User model name
            required: true,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "courses", // Ensure this matches your Course model name
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        paymentDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "pending",
        },
        transactionId: {
            type: String,
            required: true,
            unique: true, // Optional: to ensure no duplicate transactions
        },
        paymentSlip: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // Automatically manages createdAt and updatedAt
);

const payments = mongoose.model("payments", paymentSchema);
export default payments;
