"use server";
import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";
import BabyReport from "@/models/baby-report";
import MotherReport from "@/models/mother-report";
import { Types } from "mongoose";

export const getAppointments = async () => {
  await dbConnect();

  const appointments = await Appointment.aggregate([
    {
      $lookup: {
        from: "motherinfos", // this is the collection name (lowercase + plural)
        localField: "userId",
        foreignField: "userId",
        as: "motherinfo",
      },
    },
    {
      $unwind: {
        path: "$motherinfo",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  return appointments.map(
    ({ _id, date, time, status, pregnancyWeeks, userId, motherinfo }) => {
      const { fullName, surname } = motherinfo;
      return {
        id: _id,
        date,
        time,
        status,
        pregnancyWeeks,
        fullName,
        surname,
        userId,
      };
    }
  );
};

export const getMotherAppointments = async (userId: string, fields = "") => {
  await dbConnect();

  const appointments = await Appointment.find(
    { userId: new Types.ObjectId(userId) },
    fields
  )
    .sort({ createdAt: -1 })
    .lean();

  return appointments;
};

export const getMotherReport = async (appointmentId: string, fields = "") => {
  await dbConnect();

  const motherReport = (await MotherReport.findOne(
    { appointmentId: new Types.ObjectId(appointmentId) },
    { __v: 0, createdAt: 0, updatedAt: 0 }
  ).lean()) as any;

  if (!motherReport) return null;

  const {
    motherBloodPressure,
    motherFh,
    motherGlucose,
    motherLeucosite,
    motherNote,
    motherPalpation,
    motherProtein,
    motherPulse,
    motherWeight,
    _id,
  } = motherReport;

  return {
    motherBloodPressure,
    motherFh,
    motherGlucose,
    motherLeucosite,
    motherNote,
    motherPalpation,
    motherProtein,
    motherPulse,
    motherWeight,
    id: _id.toString(),
  };
};

export const getBabyReport = async (appointmentId: string, fields = "") => {
  await dbConnect();

  const babyReport = (await BabyReport.findOne(
    { appointmentId: new Types.ObjectId(appointmentId) },
    { __v: 0, createdAt: 0, updatedAt: 0 }
  ).lean()) as any;

  if (!babyReport) return null;

  const {
    babyHeight,
    babyHeartRate,
    babyPresentation,
    babyPosition,
    babyNote,
    _id,
  } = babyReport;

  return {
    babyHeight,
    babyHeartRate,
    babyPresentation,
    babyPosition,
    babyNote,
    id: _id.toString(),
  };
};
