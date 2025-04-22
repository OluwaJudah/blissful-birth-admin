import dbConnect from "@/lib/db";
import PaymentEntry from "@/models/payment-history";
import { Types } from "mongoose";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchPaymentEntry(userId: string) {
  noStore();
  await dbConnect();

  try {
    const paymentEntry = await PaymentEntry.find({
      userId: new Types.ObjectId(userId),
    });
    return paymentEntry;
  } catch (error) {
    console.log("error: ", error);
  }
}
