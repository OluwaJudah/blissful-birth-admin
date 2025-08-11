"use server";
import { CLIENT, CREDENTIALS } from "@/constants/user";
import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";
import BabyReport from "@/models/baby-report";
import User from "@/models/user";
import mongoose from "mongoose";
import PaymentEntry from "@/models/payment-history";
import MotherReport from "@/models/mother-report";
import BabyInfo from "@/models/baby-info";
import MotherInfo from "@/models/mother-info";
import BirthCompanion from "@/models/birth-companion";
import BloodResult from "@/models/blood-result";
import MedicalHistory from "@/models/medical-history";
import Notification from "@/models/notification";

export const createUser = async (username: string, password: string) => {
  await dbConnect();

  const user = User.create({
    username,
    password,
    authType: CREDENTIALS,
    role: CLIENT,
  });

  return user;
};

export const deleteUser = async (userId: string) => {
  await dbConnect();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1️⃣ Fetch appointment IDs linked to the user (within the session)
    const userAppointments = await Appointment.find(
      { userId },
      { _id: 1 }
    ).session(session);
    const appointmentIds = userAppointments.map((a) => a._id);

    // 2️⃣ Delete appointment notes linked to those appointments
    await BabyReport.deleteMany(
      { appointmentId: { $in: appointmentIds } },
      { session }
    );

    await MotherReport.deleteMany(
      { appointmentId: { $in: appointmentIds } },
      { session }
    );

    // 3️⃣ Delete appointments linked to the user
    await Appointment.deleteMany({ userId }, { session });

    // 4️⃣ Delete payment history linked to the user
    await PaymentEntry.deleteMany({ userId }, { session });
    await BabyInfo.deleteMany({ userId }, { session });
    await MotherInfo.deleteMany({ userId }, { session });
    await BirthCompanion.deleteMany({ userId }, { session });
    await BloodResult.deleteMany({ userId }, { session });
    await MedicalHistory.deleteMany({ userId }, { session });
    await Notification.deleteMany({ userId }, { session });

    // 5️⃣ Delete the user
    await User.deleteOne({ _id: userId }, { session });

    // ✅ Commit the transaction
    await session.commitTransaction();
    console.log(`Deleted user ${userId} and all related data`);
  } catch (error) {
    // ❌ Rollback if something goes wrong
    await session.abortTransaction();
    console.error("Error deleting user data:", error);
  } finally {
    session.endSession();
  }
};
