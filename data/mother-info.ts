"use server";
import dbConnect from "@/lib/db";
import BabyInfo from "@/models/baby-info";
import BirthCompanion from "@/models/birth-companion";
import BloodResult from "@/models/blood-result";
import MedicalHistory from "@/models/medical-history";
import MotherInfo from "@/models/mother-info";
import { Types } from "mongoose";

export const getMothers = async () => {
  await dbConnect();

  const mothersData = await MotherInfo.find().lean();
  const mothers = mothersData.map((m) => ({
    ...m,
    userId: m.userId.toString(),
  }));
  return mothers;
};

export const getMotherDetails = async (userId: string) => {
  await dbConnect();

  return await MotherInfo.findOne({
    userId: new Types.ObjectId(userId),
  }).lean();
};

export const getBirthCompanion = async (userId: string) => {
  await dbConnect();

  return await BirthCompanion.findOne({
    userId: new Types.ObjectId(userId),
  }).lean();
};

export const getBabyInfo = async (userId: string) => {
  await dbConnect();

  return await BabyInfo.findOne({
    motherId: new Types.ObjectId(userId),
  }).lean();
};

export const getMedicalHistory = async (userId: string) => {
  await dbConnect();

  const medicalHistory = (await MedicalHistory.findOne(
    {
      userId: new Types.ObjectId(userId),
    },
    { __v: 0, createdAt: 0, updatedAt: 0 }
  ).lean()) as any;

  if (!medicalHistory) return null;

  const {
    _id,
    details,
    allergies,
    operations,
    medication,
    conditions,
    familyHistory,
    tbSymptomsScreen,
  } = medicalHistory;

  return {
    id: _id.toString(),
    details,
    allergies,
    operations,
    medication,
    conditions,
    familyHistory,
    tbSymptomsScreen,
  };
};

export const getBloodResult = async (userId: string) => {
  await dbConnect();

  const bloodResult = (await BloodResult.findOne(
    {
      userId: new Types.ObjectId(userId),
    },
    { __v: 0, createdAt: 0, updatedAt: 0 }
  ).lean()) as any;

  if (!bloodResult) return null;

  const { _id, date, rpr, bloodGroup, hepatitis, rubella, glucose, hb, notes } =
    bloodResult;

  return {
    id: _id.toString(),
    date,
    rpr,
    bloodGroup,
    hepatitis,
    rubella,
    glucose,
    hb,
    notes,
  };
};

export const getMotherInfoWithPaymentSum = async () => {
  await dbConnect();

  const mothers = await MotherInfo.aggregate([
    {
      $lookup: {
        from: "paymententries",
        localField: "userId",
        foreignField: "userId",
        as: "paymententries",
      },
    },
    {
      $addFields: { paymentSum: { $sum: "$paymententries.amount" } },
    },
    {
      $project: {
        userId: 1,
        email: 1,
        surname: 1,
        fullName: 1,
        contactNumber: 1,
        packageType: 1,
        paymentSum: 1,
      },
    },
  ]);

  return mothers;
};
