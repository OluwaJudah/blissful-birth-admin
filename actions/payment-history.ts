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

export async function editPaymentEntry(
  paymentId: string,
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
    await updatePayment(type, amount, paymentId);
  } catch (error) {
    throw new Error("Error:" + error);
  }
  revalidatePath(pathname);
}

const updatePayment = async (
  type: string,
  amount: number,
  paymentId: string
) => {
  await dbConnect();

  if (!Types.ObjectId.isValid(paymentId)) {
    throw new Error("Invalid appointment ID");
  }

  const appointment = await PaymentEntry.findByIdAndUpdate(
    paymentId, // Filter
    { $set: { type, amount } },
    {
      new: true, // Return the updated document
      runValidators: true, // Apply schema validations
    }
  );
  return appointment;
};

export const deletePayment = async (paymentId: string, pathname: string) => {
  if (!Types.ObjectId.isValid(paymentId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const deleted = await PaymentEntry.findByIdAndDelete(paymentId);

    if (!deleted) throw Error("Does not exist"); // returns the deleted doc or null if not found
  } catch (err) {
    console.log("Error:", err);
  }
  revalidatePath(pathname);
};
