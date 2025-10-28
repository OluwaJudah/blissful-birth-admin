"use server";
import {
  createScanFormSchema,
  CreateScanFormState,
} from "@/definitions/motherinfo";
import dbConnect from "@/lib/db";
import Scan from "@/models/scan";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createScan(
  userId: string,
  pathname: string,
  id: string,
  prevState: CreateScanFormState | undefined,
  formData: FormData
) {
  const validatedFields = createScanFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: CreateScanFormState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const { date, gestational_age, scan_gestation, outcome, warning } =
    validatedFields.data;

  await dbConnect();
  if (id !== "") {
    try {
      await Scan.findByIdAndUpdate(
        id,
        {
          $set: {
            date: new Date(date),
            gestational_age,
            scan_gestation,
            outcome,
            warning,
            userId: new Types.ObjectId(userId),
          },
        },
        {
          new: true, // Return the updated document
          runValidators: true, // Apply schema validations
        }
      );
    } catch (e) {
      throw new Error("Error: Failed to create scan");
    }
  } else {
    try {
      await Scan.create({
        date: new Date(date),
        gestational_age,
        scan_gestation,
        outcome,
        warning,
        userId: new Types.ObjectId(userId),
      });
    } catch (e) {
      throw new Error("Error: Failed to create scan");
    }
  }

  revalidatePath(pathname);
  redirect(pathname);
}

export const deleteScan = async (scanId: string, pathname: string) => {
  if (!Types.ObjectId.isValid(scanId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const deleted = await Scan.findByIdAndDelete(scanId);

    if (!deleted) throw Error("Does not exist"); // returns the deleted doc or null if not found
  } catch (err) {
    console.log("Error:", err);
  }
  revalidatePath(pathname);
};
