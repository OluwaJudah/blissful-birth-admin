"use server";
import {
  APPOINTMENT,
  COMPLETED_APPOINTMENT,
  MAX_PER_SLOT,
  PATIENT_CLOSED,
  PATIENT_ONBOARDED,
  PENDING_APPOINTMENT,
  SLOT_TIMES,
} from "@/constants/appointment";
import {
  babyReportFormSchema,
  GenerateAppointmentsFormState,
  generateAppointmentsFormSchema,
  BabyReportFormState,
  IBabyReport,
  IMotherReport,
  motherReportFormSchema,
  MotherReportFormState,
  CreateAppointmentFormState,
  createAppointmentFormSchema,
  IAppointment,
} from "@/definitions/appointment";
import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";
import BabyReport from "@/models/baby-report";
import MotherInfo from "@/models/mother-info";
import MotherReport from "@/models/mother-report";
import User from "@/models/user";
import {
  getFutureAppointmentMondaysFromEdd,
  parseDate,
  parseLocalDate,
  toLocalISOString,
} from "@/utils";
import mongoose, { Types } from "mongoose";
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
    motherBlood,
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
        motherBlood,
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
  pathname: string,
  prevState: CreateAppointmentFormState | undefined,
  formData: FormData
) {
  const validatedFields = createAppointmentFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: CreateAppointmentFormState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const { date, time, pregnancyWeeks } = validatedFields.data;
  await updateAppointmentDate(
    { date: new Date(date), pregnancyWeeks, time },
    appointmentId
  );
  revalidatePath(pathname);
}

const updateAppointmentDate = async (
  appointment: IAppointment,
  appointmentId: string
) => {
  await dbConnect();

  if (!Types.ObjectId.isValid(appointmentId)) {
    throw new Error("Invalid appointment ID");
  }

  const response = await Appointment.findByIdAndUpdate(
    appointmentId, // Filter
    { $set: { ...appointment } },
    {
      new: true, // Return the updated document
      runValidators: true, // Apply schema validations
    }
  );
  return response;
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
  await generateAppointmentSlots(edd, userId);
  revalidatePath(pathname);
  redirect(pathname);
}

export async function createAppointment(
  userId: string,
  pathname: string,
  prevState: CreateAppointmentFormState | undefined,
  formData: FormData
) {
  const validatedFields = createAppointmentFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: CreateAppointmentFormState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const { date, time, pregnancyWeeks } = validatedFields.data;

  await dbConnect();
  try {
    await Appointment.create({
      date: new Date(date),
      time,
      pregnancyWeeks,
      type: APPOINTMENT,
      userId: new Types.ObjectId(userId),
      status: PENDING_APPOINTMENT,
      note: "",
    });
  } catch (e) {
    throw new Error("Error: Failed to create appointment");
  }

  revalidatePath(pathname);
  redirect(pathname);
}

export async function generateAppointmentSlots(edd: string, userId: string) {
  const weekDates = getFutureAppointmentMondaysFromEdd(edd);

  const today = parseLocalDate(weekDates[0].formatted);
  const endDate = parseLocalDate(weekDates[weekDates.length - 1].formatted);

  await dbConnect();

  // 1. Delete previous appointments
  await Appointment.deleteMany({ userId: new Types.ObjectId(userId) });

  // 2. Aggregate appointment usage
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

  const usageMap: Record<string, Record<string, number>> = {};

  usage.forEach(({ _id, count }) => {
    const dateKey = toLocalISOString(new Date(_id.date));
    const time = _id.time;

    if (!usageMap[dateKey]) usageMap[dateKey] = {};
    usageMap[dateKey][time] = count;
  });

  const availableSlots: any[] = [];

  weekDates.forEach((a) => {
    const date = new Date(a.mondayDate); // now a valid Date
    if (isNaN(date.getTime())) {
      console.warn("Invalid Date object for mondayDate:", a.mondayDate);
      return;
    }

    const dateKey = toLocalISOString(date);
    const takenSlots = usageMap[dateKey] || [];

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

    if (available.length > 0) {
      appointment.time = available[0];
    }

    availableSlots.push(appointment);
  });

  try {
    await Appointment.insertMany(availableSlots);
  } catch (err) {
    throw Error(`Error: Failed to create all patient's appointment`);
  }

  try {
    await MotherInfo.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: { status: PATIENT_ONBOARDED, edd: parseLocalDate(edd) } }
    );
  } catch (err) {
    throw Error(`Error: Failed to update patient's status`);
  }
}

export const closeAppointment = async (userId: string, pathname: string) => {
  await dbConnect();
  try {
    await MotherInfo.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: { status: PATIENT_CLOSED } }
    );
  } catch (err) {
    throw Error(`Error: Failed to update patient's status`);
  }
  revalidatePath(pathname);
  redirect(pathname);
};

export const uploadAppointments = async (jsonData: any[]) => {
  const motherDetails = jsonData[0];
  const appointmentArray = jsonData.slice(1);

  await dbConnect();

  const user = await User.create({});

  const appointment = await Appointment.create({
    userId: new Types.ObjectId(user.id),
    date: parseDate(motherDetails.date),
    time: motherDetails.time,
    pregnancyWeeks: motherDetails.pregnancyWeeks,
    status: COMPLETED_APPOINTMENT,
    type: APPOINTMENT,
  });

  // Create Mother profile
  await MotherInfo.create({
    userId: new Types.ObjectId(user.id),
    surname: motherDetails.surname,
    fullName: motherDetails.fullName,
    idPassportNo: motherDetails.idPassportNo,
    contactNumber: motherDetails.contactNumber,
    status: "uploaded",
    edd: parseDate(motherDetails.edd),
    age: motherDetails.age,
    g: motherDetails.g,
    p: motherDetails.p,
  });

  await MotherReport.create({
    userId: new Types.ObjectId(user.id),
    motherWeight: motherDetails.motherWeight,
    motherPulse: motherDetails.motherPulse,
    motherBloodPressure: motherDetails.motherBloodPressure,
    motherLeucosite: motherDetails.motherLeucosite,
    motherGlucose: motherDetails.motherGlucose,
    motherProtein: motherDetails.motherProtein,
    motherBlood: motherDetails.motherBlood,
    appointmentId: new Types.ObjectId(appointment.id),
  });

  await BabyReport.create({
    userId: new Types.ObjectId(user.id),
    babyHeight: motherDetails.babyHeight,
    babyHeartRate: motherDetails.babyHeartRate,
    babyPresentation: motherDetails.babyPresentation,
    babyPosition: motherDetails.babyPosition,
    appointmentId: new Types.ObjectId(appointment.id),
  });

  Appointment.insertMany(
    appointmentArray.map((a) => ({
      userId: new Types.ObjectId(user.id),
      date: parseDate(a.date),
      time: a.time,
      pregnancyWeeks: a.pregnancyWeeks,
      status: PENDING_APPOINTMENT,
      type: APPOINTMENT,
    }))
  );
};

export const uploadAppointmentsExcel = async (jsonData: any[]) => {
  const users: { [key: string]: any[] } = {};
  // Excel json array
  jsonData.forEach(async (data) => {
    if (!users[data.idPassportNo]) users[data.idPassportNo] = [];

    // Create appointments array
    users[data.idPassportNo].push(data);
  });

  // console.log({ length: users.length, users });
  // Inserting appointments entries to db
  for (const id in users) {
    uploadAppointments(users[id]);
  }

  revalidatePath("/clients");
};

export const deleteAppointment = async (
  appointmentId: string,
  pathname: string
) => {
  if (!Types.ObjectId.isValid(appointmentId)) {
    throw new Error("Invalid appointment ID");
  }
  await dbConnect();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 2️⃣ Delete appointment notes linked to those appointments
    await BabyReport.deleteMany({ appointmentId: appointmentId }, { session });

    await MotherReport.deleteMany(
      { appointmentId: appointmentId },
      { session }
    );

    // 5️⃣ Delete the user
    await Appointment.deleteOne({ _id: appointmentId }, { session });

    // ✅ Commit the transaction
    await session.commitTransaction();
    console.log(`Deleted appointment ${appointmentId} and all related data`);
  } catch (error) {
    // ❌ Rollback if something goes wrong
    await session.abortTransaction();
    console.error("Error deleting user data:", error);
  } finally {
    session.endSession();
  }

  revalidatePath(pathname);
  redirect(pathname);
};
