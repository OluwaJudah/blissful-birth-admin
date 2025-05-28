"use server";
import {
  APPOINTMENT,
  COMPLETED_APPOINTMENT,
  MAX_PER_SLOT,
  PATIENT_ONBOARDED,
  PENDING_APPOINTMENT,
  SLOT_TIMES,
} from "@/constants/appointment";
import { FIRST_APPOINTMENT, pregnancyWeeks } from "@/constants/user";
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
import MotherInfo from "@/models/mother-info";
import MotherReport from "@/models/mother-report";
import User from "@/models/user";
import { getAppointmentMondaysAfterLastTuesday, parseDate } from "@/utils";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  const { date, time } = validatedFields.data;
  await updateAppointmentDate(date, time, appointmentId);
}

const updateAppointmentDate = async (
  date: string,
  time: string,
  appointmentId: string
) => {
  await dbConnect();

  if (!Types.ObjectId.isValid(appointmentId)) {
    throw new Error("Invalid appointment ID");
  }

  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId, // Filter
    { $set: { date: new Date(date), time } },
    {
      new: true, // Return the updated document
      runValidators: true, // Apply schema validations
    }
  );
  return appointment;
};

export async function generateAppointments(
  userId: string,
  pathname: string,
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
  await createAppointmentSlots(edd, userId);
  revalidatePath(pathname);
  redirect(pathname);
}

export async function createAppointmentSlots(edd: string, userId: string) {
  const weekDates = getAppointmentMondaysAfterLastTuesday(edd);
  const today = new Date(weekDates[0].mondayDate);
  const endDate = new Date(weekDates[weekDates.length - 1].mondayDate);

  await dbConnect();
  // 1. Aggregate existing appointment counts per date/time
  const usage = await Appointment.aggregate([
    {
      $match: {
        date: { $gte: today, $lt: endDate },
      },
    },
    {
      $group: {
        _id: { date: "$date", time: "$time" },
        count: { $sum: 1 },
      },
    },
  ]);

  // 2. Build a map for quick lookup: { 'YYYY-MM-DD': { '09:00': count } }
  const usageMap: Record<string, Record<string, number>> = {};

  usage.forEach(({ _id, count }) => {
    const dateKey = new Date(_id.date).toISOString().split("T")[0];
    const time = _id.time;

    if (!usageMap[dateKey]) usageMap[dateKey] = {};
    usageMap[dateKey][time] = count;
  });
  // 3. Build available slots per day
  const availableSlots: any[] = [];

  weekDates.forEach((a) => {
    const date = new Date(a.mondayDate);
    const dateKey = date.toISOString().split("T")[0];
    const takenSlots = usageMap[dateKey] || {};

    const available = SLOT_TIMES.filter((time) => {
      const count = takenSlots[time] || 0;
      return count < MAX_PER_SLOT;
    });

    let appointment = {
      pregnancyWeeks: a.week,
      status: PENDING_APPOINTMENT,
      date: new Date(dateKey),
      note: "",
      userId: new Types.ObjectId(userId),
      time: "None",
      type: APPOINTMENT,
    };

    if (available.length > 0) appointment.time = available[0]; // Select the first available

    availableSlots.push(appointment);
  });

  try {
    await Appointment.insertMany(availableSlots);
  } catch (err) {
    throw Error(`Error: Failed to create all patient's appointment`);
  }

  try {
    await Appointment.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        type: FIRST_APPOINTMENT,
      },
      { $set: { status: COMPLETED_APPOINTMENT } }
    );
  } catch (err) {
    throw Error(`Error: Failed to update first appointment`);
  }

  try {
    await MotherInfo.findOneAndUpdate({
      userId: new Types.ObjectId(userId),
      $set: { status: PATIENT_ONBOARDED, edd: new Date(edd) },
    });
  } catch (err) {
    throw Error(`Error: Failed to update patient's status`);
  }
}

export const uploadAppointmentsExcel = async (jsonData: any[]) => {
  const users: { [key: string]: any[] } = {};
  const arrayUserId: { [key: string]: string } = {};

  await dbConnect();
  // Excel json array
  jsonData.forEach(async (data) => {
    if (!users[data.name]) {
      users[data.name] = [];

      // Create User profile
      const user = await User.create({});
      arrayUserId[data.name] = user.id;

      // Create Mother profile
      const strNames = data.name.toString().split(" ");
      await MotherInfo.create({
        userId: new Types.ObjectId(user.id),
        surname: strNames[1],
        fullName: strNames[0],
        status: "uploaded",
      });
    }

    // Create appointments array
    users[data.name].push({
      date: parseDate(data.dueDate),
      time: data.timeSlot,
      pregnancyWeeks: data.weeks,
      userId: new Types.ObjectId(arrayUserId[data.name]),
    });
  });

  // Inserting appointments entries to db
  for (const x in users) {
    Appointment.insertMany(users[x]);
  }

  revalidatePath("/clients");
};
