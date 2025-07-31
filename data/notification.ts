"use server";
import { CLIENT } from "@/constants/user";
import dbConnect from "@/lib/db";
import Notification from "@/models/notification";
import Appointment from "@/models/appointment";
import BabyReport from "@/models/baby-report";
import MotherReport from "@/models/mother-report";
import { Types } from "mongoose";

export const getNotifications = async () => {
  await dbConnect();

  const notifications = await Notification.aggregate([
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

  return notifications.map(
    ({ _id, date, time, status, pregnancyWeeks, userId, motherinfo }) => {
      return {
        id: _id,
        date,
        time,
        status,
        pregnancyWeeks,
        fullName: motherinfo && motherinfo.fullName ? motherinfo.fullName : "",
        surname: motherinfo && motherinfo.surname ? motherinfo.surname : "",
        userId,
      };
    }
  );
};

export const getAppointment = async (id: string, fields = "") => {
  await dbConnect();

  const appointment = await Appointment.findById(id, fields);
  return appointment ? appointment : null;
};

export const getMotherAppointments = async (userId: string, fields = "") => {
  await dbConnect();

  const appointments = await Appointment.find(
    { userId: new Types.ObjectId(userId) },
    { __v: 0, createdAt: 0, updatedAt: 0 }
  )
    .sort({ pregnancyWeeks: 1 })
    .lean();

  return appointments;
};

export const getMotherReport = async (appointmentId: string, fields = "") => {
  await dbConnect();

  if (!Types.ObjectId.isValid(appointmentId)) {
    throw new Error("Invalid appointment ID");
  }

  const motherReport = (await MotherReport.findOne(
    { appointmentId: new Types.ObjectId(appointmentId) },
    { __v: 0, createdAt: 0, updatedAt: 0 }
  ).lean()) as any;

  if (!motherReport) return null;

  const {
    motherBloodPressure,
    motherGlucose,
    motherLeucosite,
    motherNote,
    motherProtein,
    motherBlood,
    motherPulse,
    motherWeight,
    _id,
  } = motherReport;

  return {
    motherBloodPressure: motherBloodPressure ? motherBloodPressure : "",
    motherGlucose: motherGlucose ? motherGlucose : "",
    motherLeucosite: motherLeucosite ? motherLeucosite : "",
    motherNote,
    motherProtein: motherProtein ? motherProtein : "",
    motherBlood: motherBlood ? motherBlood : "",
    motherPulse: motherPulse ? motherPulse : 0,
    motherWeight: motherWeight ? motherWeight : 0,
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
    babyHeight: babyHeight ? babyHeight : 0,
    babyHeartRate: babyHeartRate ? babyHeartRate : 0,
    babyPresentation: babyPresentation ? babyPresentation : "",
    babyPosition: babyPosition ? babyPosition : "",
    babyNote,
    id: _id.toString(),
  };
};

export const getNotificationsForFilter = async (fromDate = "", toDate = "") => {
  await dbConnect();

  const matchStage: any = {};
  if (fromDate && toDate) {
    matchStage.createdAt = { $gte: new Date(fromDate), $lte: new Date(toDate) };
  } else if (fromDate) {
    matchStage.createdAt = new Date(fromDate);
  }

  return await Notification.aggregate([
    ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []),

    // Join with User
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: false } },
    { $match: { "user.role": CLIENT } },

    // Join with MotherInfo
    {
      $lookup: {
        from: "motherinfos",
        localField: "user._id",
        foreignField: "userId",
        as: "motherinfo",
      },
    },
    { $unwind: { path: "$motherinfo", preserveNullAndEmptyArrays: false } },
    // Group to remove duplicate appointment docs
    {
      $group: {
        _id: { $toString: "$_id" },
        userId: { $first: { $toString: "$userId" } },
        status: { $first: "$status" },
        messageSid: { $first: "$messageSid" },
        message: { $first: "$message" },
        to: { $first: "$to" },
        appointmentId: { $first: { $toString: "$appointmentId" } },
        fullName: { $first: "$motherinfo.fullName" },
        surname: { $first: "$motherinfo.surname" },
        createdAt: { $first: { $toDate: "$createdAt" } },
      },
    },

    // Output formatting
    {
      $project: {
        _id: "$_id",
        fullName: "$fullName",
        surname: "$surname",
        userId: "$userId",
        status: "$status",
        messageSid: "$messageSid",
        message: "$message",
        to: "$to",
        appointmentId: "$appointmentId",
        date: "$createdAt",
      },
    },
  ]);
};
