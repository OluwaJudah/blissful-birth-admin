import { IBabyReport } from "@/definitions/appointment";
import mongoose, { Schema, Document, Model } from "mongoose";

interface BabyReport extends Document, Omit<IBabyReport, "_id"> {
  appointmentId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const BabyReportSchema = new Schema<BabyReport>(
  {
    babyWeight: { type: Number, required: true },
    babyHeight: { type: Number, required: true },
    babyHeartRate: { type: Number, required: true },
    babyPosition: { type: String, required: true },
    babyNote: { type: String },
    appointmentId: { type: String, required: true },
  },
  { timestamps: true }
);

const BabyReport: Model<BabyReport> =
  mongoose.models.BabyReport ||
  mongoose.model<BabyReport>("BabyReport", BabyReportSchema);

export default BabyReport;
