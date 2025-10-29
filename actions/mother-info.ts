"use server";
import {
  updateMotherInfoFormSchema,
  UpdateMotherInfoFormState,
} from "@/definitions/mother-info";
import dbConnect from "@/lib/db";
import MotherInfo from "@/models/mother-info";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

export async function updateMotherInfo(
  userId: string,
  pathname: string,
  prevState: UpdateMotherInfoFormState | undefined,
  formData: FormData
) {
  const validatedFields = updateMotherInfoFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: UpdateMotherInfoFormState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const {
    g,
    p,
    bmi,
    packageType,
    age,
    scanDate,
    scanGestationalAge,
    lastMenstrualDate,
  } = validatedFields.data;

  await dbConnect();
  await MotherInfo.findOneAndUpdate(
    { userId: new Types.ObjectId(userId) },
    {
      $set: {
        g,
        p,
        bmi,
        packageType,
        age,
        scanDate,
        scanGestationalAge,
        lastMenstrualDate,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  revalidatePath(pathname);
}

export const updateClientPackage = async (
  packageType: string,
  motherId: string
) => {
  await dbConnect();

  if (!Types.ObjectId.isValid(motherId)) {
    throw new Error("Invalid mother ID");
  }

  await MotherInfo.findByIdAndUpdate(
    motherId, // Filter
    { $set: { packageType } },
    {
      new: true, // Return the updated document
      runValidators: true, // Apply schema validations
    }
  );
};
