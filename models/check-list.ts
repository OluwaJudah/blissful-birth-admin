import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ICheckList extends Document {
  userId: Types.ObjectId;
  datingScan: {
    status: boolean;
    completedAt?: Date | null;
  };
  anc: {
    status: boolean;
    completedAt?: Date | null;
  };
  week13: {
    status: boolean;
    completedAt?: Date | null;
  };
  week21: {
    status: boolean;
    completedAt?: Date | null;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const CheckListSchema = new Schema<ICheckList>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    datingScan: {
      status: { type: Boolean, default: false },
      completedAt: { type: Date, default: null },
    },
    anc: {
      status: { type: Boolean, default: false },
      completedAt: { type: Date, default: null },
    },
    week13: {
      status: { type: Boolean, default: false },
      completedAt: { type: Date, default: null },
    },
    week21: {
      status: { type: Boolean, default: false },
      completedAt: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

const CheckList: Model<ICheckList> =
  mongoose.models.CheckList ||
  mongoose.model<ICheckList>("CheckList", CheckListSchema);

export default CheckList;
