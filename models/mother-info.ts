import { IMotherInfo } from "@/definitions/mother-info";
import mongoose, { Schema, Document, Model } from "mongoose";

export interface MotherInfo extends Omit<Document, '_id'>, IMotherInfo {
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const MotherInfoSchema = new Schema<MotherInfo>(
  {
    fullName: { type: String, required: true },
    userId: { type: String, required: true },
    surname: { type: String, required: true },
    maidenName: { type: String },
    idPassportNo: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    lastMenstrualDate: { type: Date, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String },
    countryOfOrigin: { type: String, required: true },
    occupation: { type: String },
  },
  { timestamps: true }
);

const MotherInfo: Model<MotherInfo> =
  mongoose.models.MotherInfo ||
  mongoose.model<MotherInfo>("MotherInfo", MotherInfoSchema);

export default MotherInfo;
