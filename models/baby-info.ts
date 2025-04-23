import type { IBabyInfo } from "@/definitions/mother-info";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface BabyInfo extends Document, IBabyInfo {
  motherId: Types.ObjectId;
}

const BabyInfoSchema = new Schema<BabyInfo>(
  {
    fullName: { type: String },
    surname: { type: String },
    motherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const BabyInfo: Model<BabyInfo> =
  mongoose.models.BabyInfo ||
  mongoose.model<BabyInfo>("BabyInfo", BabyInfoSchema);

export default BabyInfo;
