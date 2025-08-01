"use server";
import { Types } from "mongoose";
import Notification from "@/models/notification";

import {
  createNotificationFormSchema,
  CreateNotificationFormState,
} from "@/definitions/appointment";
import dbConnect from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendWhatsApp } from "@/utils/twilio";
import { getAppointmentsForReminders } from "@/data/appointment";

export async function createNotification(
  userId: string,
  appointmentId: string,
  pathname: string,
  prevState: CreateNotificationFormState | undefined,
  formData: FormData
) {
  const validatedFields = createNotificationFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: CreateNotificationFormState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const { to, message } = validatedFields.data;

  await dbConnect();

  try {
    const response = await sendWhatsApp(to);

    await Notification.create({
      to,
      message,
      messageSid: response.sid,
      userId: new Types.ObjectId(userId),
      appointmentId: new Types.ObjectId(appointmentId),
    });
  } catch (e) {
    throw new Error("Error: Failed to create appointment");
  }

  revalidatePath(pathname);
  redirect(pathname);
}

export async function sendNotifications() {
  const appointments = await getAppointmentsForReminders();
  for (const appointment of appointments) {
    const { userId, date, time, fullName, surname, contactNumber } =
      appointment;
    const response = await sendWhatsApp(contactNumber);
    console.log({ response });

    await Notification.create({
      to: "0677140540",
      messageSid: response.sid,
      message: `Hello ${fullName} ${surname}, this is a reminder for your appointment on ${date} at ${time}.`,
      userId: new Types.ObjectId(userId),
      appointmentId: new Types.ObjectId(appointment._id),
    });
    break;
  }
}
