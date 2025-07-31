import { INotification } from "@/definitions/appointment";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface Notification extends Document, INotification {
  userId: Types.ObjectId;
  appointmentId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const NotificationSchema = new Schema<Notification>(
  {
    to: { type: String, required: true },
    message: { type: String },
    messageSid: { type: String, required: true },
    status: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure faster queries by indexing on date + time
NotificationSchema.index({ date: 1, time: 1 });
// Optional: faster lookup by user
NotificationSchema.index({ userId: 1 });

const Notification: Model<Notification> =
  mongoose.models.Notification ||
  mongoose.model<Notification>("Notification", NotificationSchema);

export default Notification;
