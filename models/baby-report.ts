import { IBabyReport } from "@/definitions/appointment";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface BabyReport extends Document, Omit<IBabyReport, "_id"> {
  appointmentId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const BabyReportSchema = new Schema<BabyReport>(
  {
    babyHeight: { type: Number, required: true },
    babyHeartRate: { type: Number, required: true },
    babyPresentation: { type: String, required: true },
    babyPosition: { type: String, required: true },
    babyNote: { type: String },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
  },
  { timestamps: true }
);

const BabyReport: Model<BabyReport> =
  mongoose.models.BabyReport ||
  mongoose.model<BabyReport>("BabyReport", BabyReportSchema);

export default BabyReport;
