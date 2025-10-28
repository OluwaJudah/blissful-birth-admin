import { IScan } from "@/definitions/motherinfo";
import mongoose, { Schema, Model, Types } from "mongoose";

interface Scan extends Omit<IScan, "id" | "userId"> {
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const ScanSchema = new Schema<Scan>(
  {
    date: { type: Date, required: true },
    gestational_age: { type: Number, required: true },
    scan_gestation: { type: String, required: true },
    outcome: { type: String },
    warning: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Ensure faster queries by indexing on date + time
ScanSchema.index({ date: 1 });
// Optional: faster lookup by user
ScanSchema.index({ userId: 1 });

const Scan: Model<Scan> =
  mongoose.models.Scan || mongoose.model<Scan>("Scan", ScanSchema);

export default Scan;
