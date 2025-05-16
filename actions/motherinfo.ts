"use server";
import { IBloodResult, IMedicalHistory } from "@/definitions/mother-info";
import {
  bloodResultsFormSchema,
  BloodResultsFormState,
  medicalHistoryFormSchema,
  MedicalHistoryFormState,
} from "@/definitions/motherinfo";
import dbConnect from "@/lib/db";
import BloodResult from "@/models/blood-result";
import MedicalHistory from "@/models/medical-history";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

export async function updateMedicalReport(
  userId: string,
  conditions: string,
  familyHistory: string,
  tbSymptomsScreen: string,
  pathname: string,
  prevState: MedicalHistoryFormState | undefined,
  formData: FormData
) {
  const validatedFields = medicalHistoryFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: MedicalHistoryFormState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const { details, allergies, operations, medication } = validatedFields.data;

  try {
    await updateMedicalHistoryData(
      {
        details,
        allergies,
        operations,
        medication,
        conditions,
        familyHistory,
        tbSymptomsScreen,
      },
      userId
    );
  } catch (err) {
    console.log(`Error: updating medical history and ${err}`);
    throw Error(`Error: updating medical history and ${err}`);
  }

  revalidatePath(pathname);
}

export async function updateBloodResults(
  userId: string,
  pathname: string,
  prevState: BloodResultsFormState | undefined,
  formData: FormData
) {
  const validatedFields = bloodResultsFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: BloodResultsFormState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const { date, rpr, bloodGroup, hepatitis, rubella, glucose, hb, notes } =
    validatedFields.data;

  try {
    await updateBloodResultsData(
      {
        date: new Date(date),
        rpr,
        bloodGroup,
        hepatitis,
        rubella,
        glucose,
        hb,
        notes,
      },
      userId
    );
  } catch (err) {
    console.log(`Error: updating blood results and ${err}`);
    throw Error(`Error: updating blood results and ${err}`);
  }

  revalidatePath(pathname);
}

const updateMedicalHistoryData = async (
  data: IMedicalHistory,
  userId: string
) => {
  await dbConnect();

  const medicalHistory = await MedicalHistory.findOneAndUpdate(
    { userId: new Types.ObjectId(userId) }, // Filter
    { $set: { ...data } },
    {
      new: true, // Return the updated document
      upsert: true, // Create if it doesn't exist
      runValidators: true, // Apply schema validations
    }
  );
  return medicalHistory;
};

const updateBloodResultsData = async (data: IBloodResult, userId: string) => {
  await dbConnect();

  const bloodResult = await BloodResult.findOneAndUpdate(
    { userId: new Types.ObjectId(userId) }, // Filter
    { $set: { ...data } },
    {
      new: true, // Return the updated document
      upsert: true, // Create if it doesn't exist
      runValidators: true, // Apply schema validations
    }
  );
  return bloodResult;
};
