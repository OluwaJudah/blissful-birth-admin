import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IPaymentEntry extends Document {
  type: string;
  amount: number;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentEntrySchema = new Schema<IPaymentEntry>(
  {
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const PaymentEntry: Model<IPaymentEntry> =
  mongoose.models.PaymentEntry ||
  mongoose.model<IPaymentEntry>("PaymentEntry", PaymentEntrySchema);

export default PaymentEntry;
