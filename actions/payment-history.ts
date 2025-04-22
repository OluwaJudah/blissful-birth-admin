"use server";
import PaymentEntry from "@/models/payment-history";
import { z } from "zod";
import dbConnect from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

export type PaymentHistoryState = {
  errors?: {
    type?: string[];
    amount?: string[];
  };
  message?: string | null;
};

const formSchema = z.object({
  type: z.string().min(1, { message: "Payment Type is required." }),
  amount: z.coerce.number().positive(), // Ensures it's a positive float
});

export async function createPaymentEntry(
  userId: string,
  pathname: string,
  prevState: PaymentHistoryState | undefined,
  formData: FormData
) {
  await dbConnect();

  const validatedFields = formSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    const state: PaymentHistoryState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const { type, amount } = validatedFields.data;
  try {
    await PaymentEntry.create({
      type,
      amount,
      userId: new Types.ObjectId(userId),
    });
  } catch (error) {
    console.log("error: ", error);
  }
  revalidatePath(pathname);
}
