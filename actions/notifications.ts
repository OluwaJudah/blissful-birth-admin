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
import {
  getAppointmentsForReminders,
  getUsersWithFutureAppointments,
} from "@/data/appointment";

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
    const response = await sendWhatsApp(
      to,
      JSON.stringify({
        1: "Judah Israel",
        2: "2025-08-04",
        3: "10:00",
        4: "20",
      })
    );

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
    try {
      const { userId, date, time, fullName, surname, contactNumber } =
        appointment;
      const today = new Date(date);
      const dateString = today.toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "short",
        year: "2-digit",
      });

      const to = "+27" + contactNumber;
      const response = await sendWhatsApp(
        to,
        process.env.TWILIO_REMINDER_CONTENTSID!,
        JSON.stringify({
          1: fullName,
          2: dateString,
          3: time,
          4: "20",
        })
      );
      console.log({ to, status: "✅ sent", sid: response.sid });

      await Notification.create({
        to: to,
        messageSid: response.sid,
        userId: new Types.ObjectId(userId),
        appointmentId: new Types.ObjectId(appointment._id),
      });
    } catch (error) {
      console.error(`❌ Failed to send to message:`, error);
      // Continue to the next appointment
    }
  }

  console.log("📨 Notification sending process completed.");
}

export async function sendBabyScanNotifications() {
  const motherInfos = await getUsersWithFutureAppointments();
  for (const motherInfo of motherInfos) {
    try {
      const { userId, contactNumber } = motherInfo;

      const to = "+27" + contactNumber;
      const response = await sendWhatsApp(
        to,
        process.env.BABY_SCAN_CONTENTSID!
      );
      console.log({ to, status: "✅ sent", sid: response.sid });

      await Notification.create({
        to: to,
        messageSid: response.sid,
        userId: new Types.ObjectId(userId),
      });
    } catch (error) {
      console.error(`❌ Failed to send to message:`, error);
      // Continue to the next appointment
    }
  }

  console.log("📨 Notification sending process completed.");
}
