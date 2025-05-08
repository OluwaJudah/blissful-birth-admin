import { IMotherReport } from "@/definitions/appointment";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface MotherReport extends Document, Omit<IMotherReport, "_id"> {
  appointmentId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const MotherReportSchema = new Schema<MotherReport>(
  {
    motherWeight: { type: Number, required: true },
    motherPulse: { type: Number, required: true },
    motherBloodPressure: { type: String, required: true },
    motherLeucosite: { type: String, required: true },
    motherGlucose: { type: String, required: true },
    motherProtein: { type: String, required: true },  
    motherPalpation: { type: Number, required: true },
    motherFh: { type: Number, required: true },
    motherNote: { type: String },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
  },
  { timestamps: true }
);

const MotherReport: Model<MotherReport> =
  mongoose.models.MotherReport ||
  mongoose.model<MotherReport>("MotherReport", MotherReportSchema);

export default MotherReport;
