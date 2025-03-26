import PaymentEntry from "@/models/payment-history";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchPaymentEntry() {
  noStore();

  try {
    const paymentEntry = await PaymentEntry.find({});
    return paymentEntry;
  } catch (error) {
    console.log("error: ", error);
  }
}
