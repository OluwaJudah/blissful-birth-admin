import { IMotherReport } from "@/definitions/appointment";
import mongoose, { Schema, Document, Model } from "mongoose";

interface MotherReport extends Document, Omit<IMotherReport, '_id'> {
  appointmentId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const MotherReportSchema = new Schema<MotherReport>(
  {
    motherWeight: { type: Number, required: true },
    motherUrine: { type: Number, required: true },
    motherPalpation: { type: Number, required: true },
    motherBloodPressure: { type: Number, required: true },
    motherFh: { type: Number, required: true },
    motherNote: { type: String },
    appointmentId: { type: String, required: true },
  },
  { timestamps: true }
);

const MotherReport: Model<MotherReport> =
  mongoose.models.MotherReport ||
  mongoose.model<MotherReport>("MotherReport", MotherReportSchema);

export default MotherReport;
