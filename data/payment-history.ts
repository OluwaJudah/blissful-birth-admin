import dbConnect from "@/lib/db";
import PaymentEntry from "@/models/payment-history";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchPaymentEntry() {
  noStore();
  await dbConnect();

  try {
    const paymentEntry = await PaymentEntry.find({});
    return paymentEntry;
  } catch (error) {
    console.log("error: ", error);
  }
}
