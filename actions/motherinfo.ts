"use server";
import {
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
