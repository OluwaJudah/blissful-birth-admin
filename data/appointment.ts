"use server";
import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";
import BabyReport from "@/models/baby-report";
import MotherReport from "@/models/mother-report";
import { Types } from "mongoose";

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

  const motherReport = await MotherReport.findOne(
    { appointmentId: new Types.ObjectId(appointmentId) },
    fields
  ).lean();
  return motherReport;
};

export const getBabyReport = async (appointmentId: string, fields = "") => {
  await dbConnect();

  const motherReport = await BabyReport.findOne(
    { appointmentId: new Types.ObjectId(appointmentId) },
    fields
  ).lean();
  return motherReport;
};
