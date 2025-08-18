"use server";
import { PATIENT_CLOSED } from "@/constants/appointment";
import { CLIENT } from "@/constants/user";
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

export const getAppointmentsForFilter = async (fromDate = "", toDate = "") => {
  await dbConnect();

  const matchStage: any = {};
  if (fromDate && toDate) {
    matchStage.date = { $gte: new Date(fromDate), $lte: new Date(toDate) };
  } else if (fromDate) {
    matchStage.date = new Date(fromDate);
  }

  return await Appointment.aggregate([
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
    { $match: { "motherinfo.status": { $ne: PATIENT_CLOSED } } },

    // 🔧 Normalize time string to HH:mm (pad leading zero if needed)
    {
      $addFields: {
        time: {
          $cond: [
            { $regexMatch: { input: "$time", regex: /^\d:\d{2}$/ } }, // matches "9:00"
            { $concat: ["0", "$time"] }, // convert to "09:00"
            "$time", // already in correct format
          ],
        },
      },
    },

    // Group to remove duplicate appointment docs
    {
      $group: {
        _id: "$_id",
        userId: { $first: "$userId" },
        date: { $first: "$date" },
        status: { $first: "$status" },
        time: { $first: "$time" },
        pregnancyWeeks: { $first: "$pregnancyWeeks" },
        fullName: { $first: "$motherinfo.fullName" },
        surname: { $first: "$motherinfo.surname" },
        edd: { $first: "$motherinfo.edd" },
      },
    },

    // Group by date + normalized time
    {
      $group: {
        _id: { date: "$date", time: "$time" },
        appointments: {
          $push: {
            _id: { $toString: "$_id" },
            userId: { $toString: "$userId" },
            date: { $toString: "$date" },
            status: "$status",
            time: "$time",
            pregnancyWeeks: "$pregnancyWeeks",
            fullName: "$fullName",
            surname: "$surname",
            edd: "$edd",
          },
        },
      },
    },

    // Sort time slots by date & time
    { $sort: { "_id.date": 1, "_id.time": 1 } },

    // Group by date to create slot list
    {
      $group: {
        _id: { $toString: "$_id.date" },
        slots: {
          $push: {
            time: "$_id.time",
            appointments: "$appointments",
          },
        },
      },
    },

    // Output formatting
    {
      $project: {
        _id: 0,
        date: "$_id",
        slots: 1,
      },
    },

    // Sort final result by date
    { $sort: { date: 1 } },
  ]);
};

export const getAppointmentsForReminders = async () => {
  await dbConnect();

  const matchStage: any = {};
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const fromDate = today.toISOString().split("T")[0];
  today.setDate(today.getDate() + 8);
  const toDate = today.toISOString().split("T")[0];
  matchStage.date = { $gte: new Date(fromDate), $lte: new Date(toDate) };

  return await Appointment.aggregate([
    // Optional match stage for filtering by date
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
    // Join with Profile
    {
      $lookup: {
        from: "motherinfos",
        localField: "user._id",
        foreignField: "userId",
        as: "motherinfo",
      },
    },
    { $unwind: { path: "$motherinfo", preserveNullAndEmptyArrays: false } },
    { $match: { "motherinfo.contactNumber": { $ne: null } } },
    { $match: { "motherinfo.status": { $ne: PATIENT_CLOSED } } },
    // Group by unique appointment to remove duplicates
    {
      $group: {
        _id: "$_id",
        userId: { $first: "$userId" },
        date: { $first: "$date" },
        status: { $first: "$status" },
        time: { $first: "$time" },
        fullName: { $first: "$motherinfo.fullName" },
        surname: { $first: "$motherinfo.surname" },
        contactNumber: { $first: "$motherinfo.contactNumber" },
      },
    },
    {
      $project: {
        _id: "$_id",
        userId: "$userId",
        date: "$date",
        time: "$time",
        fullName: "$fullName",
        surname: "$surname",
        contactNumber: "$contactNumber",
      },
    },
  ]);
};
