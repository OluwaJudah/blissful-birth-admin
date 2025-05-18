import type { IBloodResult } from "@/definitions/mother-info";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface BloodResult extends Document, Omit<IBloodResult, "id"> {
  userId: Types.ObjectId;
}

const BloodResultSchema = new Schema<BloodResult>(
  {
    date: { type: Date },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rpr: { type: String },
    bloodGroup: { type: String },
    hepatitis: { type: String },
    rubella: { type: String },
    hiv: { type: String },
    glucose: { type: Number },
    hb: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

const BloodResult: Model<BloodResult> =
  mongoose.models.BloodResult ||
  mongoose.model<BloodResult>("BloodResult", BloodResultSchema);

export default BloodResult;
