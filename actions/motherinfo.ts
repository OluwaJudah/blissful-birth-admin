"use server";
import {
  bloodResultsFormSchema,
  BloodResultsFormState,
  medicalHistoryFormSchema,
  MedicalHistoryFormState,
} from "@/definitions/motherinfo";
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
  console.log({
    ...{ details, allergies, operations, medication },
    userId,
    conditions,
    familyHistory,
    tbSymptomsScreen,
  });

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

  console.log({
    ...{ date, rpr, bloodGroup, hepatitis, rubella, glucose, hb, notes },
    userId,
  });

  revalidatePath(pathname);
}
