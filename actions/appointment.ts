"use server";
import { COMPLETED_APPOINTMENT } from "@/constants/appointment";
import {
  babyReportFormSchema,
  BabyReportFormState,
  IBabyReport,
  IMotherReport,
  motherReportFormSchema,
  MotherReportFormState,
} from "@/definitions/appointment";
import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";
import BabyReport from "@/models/baby-report";
import MotherReport from "@/models/mother-report";
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

  try {
    await updateMotherReportData(
      {
        motherWeight,
        motherUrine,
        motherPalpation,
        motherBloodPressure,
        motherFh,
        motherNote,
      },
      appointmentId
    );
  } catch (error) {
    throw new Error("Error:" + error);
  }
  revalidatePath(pathname);
}

const updateMotherReportData = async (
  data: IMotherReport,
  appointmentId: string
) => {
  await dbConnect();

  const motherReport = await MotherReport.findOneAndUpdate(
    { appointmentId }, // Filter
    { $set: { ...data, appointmentId } },
    {
      new: true, // Return the updated document
      upsert: true, // Create if it doesn't exist
      runValidators: true, // Apply schema validations
    }
  );
  return motherReport;
};

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

  try {
    await updateBabyReportData(
      {
        babyWeight,
        babyHeight,
        babyHeartRate,
        babyPosition,
        babyNote,
      },
      appointmentId
    );

    updateAppointmentStatus(COMPLETED_APPOINTMENT, appointmentId);
  } catch (error) {
    throw new Error("Error:" + error);
  }
  revalidatePath(pathname);
}

const updateBabyReportData = async (
  data: IBabyReport,
  appointmentId: string
) => {
  await dbConnect();

  const babyReport = await BabyReport.findOneAndUpdate(
    { appointmentId }, // Filter
    { $set: { ...data, appointmentId } },
    {
      new: true, // Return the updated document
      upsert: true, // Create if it doesn't exist
      runValidators: true, // Apply schema validations
    }
  );
  return babyReport;
};

const updateAppointmentStatus = async (
  status: string,
  appointmentId: string
) => {
  await dbConnect();

  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId, // Filter
    { $set: { status } },
    {
      new: true, // Return the updated document
      runValidators: true, // Apply schema validations
    }
  );
  return appointment;
};
