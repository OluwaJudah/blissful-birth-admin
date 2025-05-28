import { IAppointment } from "@/definitions/appointment";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface Appointment extends Document, IAppointment {
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const AppointmentSchema = new Schema<Appointment>(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String },// required: true },
    type: { type: String },// required: true },
    note: { type: String },
    pregnancyWeeks: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Ensure faster queries by indexing on date + time
AppointmentSchema.index({ date: 1, time: 1 });
// Optional: faster lookup by user
AppointmentSchema.index({ userId: 1 });

const Appointment: Model<Appointment> =
  mongoose.models.Appointment ||
  mongoose.model<Appointment>("Appointment", AppointmentSchema);

export default Appointment;
