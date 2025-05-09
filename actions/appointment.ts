"use server";
import { COMPLETED_APPOINTMENT } from "@/constants/appointment";
import {
  babyReportFormSchema,
  GenerateAppointmentsFormState,
  generateAppointmentsFormSchema,
  BabyReportFormState,
  IBabyReport,
  IMotherReport,
  motherReportFormSchema,
  MotherReportFormState,
  RescheduleAppointmentFormState,
  rescheduleAppointmentFormSchema,
} from "@/definitions/appointment";
import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";
import BabyReport from "@/models/baby-report";
import MotherReport from "@/models/mother-report";
import { Types } from "mongoose";
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
    motherBloodPressure,
    motherPulse,
    motherLeucosite,
    motherGlucose,
    motherProtein,
    motherPalpation,
    motherFh,
    motherNote,
  } = validatedFields.data;

  try {
    await updateMotherReportData(
      {
        motherWeight,
        motherBloodPressure,
        motherPulse,
        motherLeucosite,
        motherGlucose,
        motherProtein,
        motherPalpation,
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

  if (!Types.ObjectId.isValid(appointmentId)) {
    throw new Error("Invalid appointment ID");
  }

  const motherReport = await MotherReport.findOneAndUpdate(
    { appointmentId: new Types.ObjectId(appointmentId) }, // Filter
    { $set: { ...data } },
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

  const {
    babyHeight,
    babyHeartRate,
    babyPosition,
    babyPresentation,
    babyNote,
  } = validatedFields.data;

  try {
    await updateBabyReportData(
      {
        babyHeight,
        babyHeartRate,
        babyPresentation,
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

  if (!Types.ObjectId.isValid(appointmentId)) {
    throw new Error("Invalid appointment ID");
  }

  const babyReport = await BabyReport.findOneAndUpdate(
    { appointmentId: new Types.ObjectId(appointmentId) }, // Filter
    { $set: { ...data } },
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

  if (!Types.ObjectId.isValid(appointmentId)) {
    throw new Error("Invalid appointment ID");
  }

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

export async function generateAppointments(
  prevState: GenerateAppointmentsFormState | undefined,
  formData: FormData
) {
  const validatedFields = generateAppointmentsFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: GenerateAppointmentsFormState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const { edd } = validatedFields.data;
  console.log({ edd });
}

export async function rescheduleAppointment(
  appointmentId: string,
  prevState: RescheduleAppointmentFormState | undefined,
  formData: FormData
) {
  const validatedFields = rescheduleAppointmentFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: RescheduleAppointmentFormState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const { date } = validatedFields.data;
  console.log({ date });
  await updateAppointmentDate(date, appointmentId);
}

const updateAppointmentDate = async (status: string, appointmentId: string) => {
  await dbConnect();

  if (!Types.ObjectId.isValid(appointmentId)) {
    throw new Error("Invalid appointment ID");
  }

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
