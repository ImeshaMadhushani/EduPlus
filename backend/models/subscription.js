import mongoose from "mongoose";

const subscriptionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    planType: {
        type: String,
        required: true,
        enum: ['monthly', 'yearly']
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'expired']
    },
    startDate: {
        type: Timestamp,
        required: true
    },
    endDate: {
        type: Timestamp,
        required: true
    }
});

const subscriptions = mongoose.model('subscriptions', subscriptionSchema);
export default subscriptions;