import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPaymentEntry extends Document {
  type: string;
  amount: string;
}

const PaymentEntrySchema = new Schema<IPaymentEntry>(
  {
    type: { type: String, required: true },
    amount: { type: String, required: true },
  },
  { timestamps: true }
);

const PaymentEntry: Model<IPaymentEntry> =
  mongoose.models.PaymentEntry ||
  mongoose.model<IPaymentEntry>("PaymentEntry", PaymentEntrySchema);

export default PaymentEntry;
