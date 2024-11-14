import mongoose from 'mongoose';

const notificationSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        message: { type: String, required: true },
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const notifications = mongoose.model('notifications', notificationSchema);
export default notifications;
