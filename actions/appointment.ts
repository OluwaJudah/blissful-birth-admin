"use server";
import {
  babyReportFormSchema,
  BabyReportFormState,
  motherReportFormSchema,
  MotherReportFormState,
} from "@/definitions/appointment";
import { revalidatePath } from "next/cache";

export async function submitMotherReport(
  appointmentId: string,
  pathname: string,
  prevState: MotherReportFormState | undefined,
  formData: FormData
) {
  const validatedFields = motherReportFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: MotherReportFormState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const {
    motherWeight,
    motherUrine,
    motherPalpation,
    motherBloodPressure,
    motherFh,
    motherNote,
  } = validatedFields.data;

  revalidatePath(pathname);
}

export async function submitBabyReport(
  appointmentId: string,
  pathname: string,
  prevState: BabyReportFormState | undefined,
  formData: FormData
) {
  const validatedFields = babyReportFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: BabyReportFormState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const { babyWeight, babyHeight, babyHeartRate, babyPosition, babyNote } =
    validatedFields.data;

  revalidatePath(pathname);
}
