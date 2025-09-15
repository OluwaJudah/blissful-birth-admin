"use server";
import dbConnect from "@/lib/db";
import BabyInfo from "@/models/baby-info";
import BirthCompanion from "@/models/birth-companion";
import BloodResult from "@/models/blood-result";
import MedicalHistory from "@/models/medical-history";
import MotherInfo from "@/models/mother-info";
import { Types } from "mongoose";
import { IMotherInfo } from "@/definitions/mother-info";

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

  return await MotherInfo.findOne(
    {
      userId: new Types.ObjectId(userId),
    },
    {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      userId: 0,
    }
  ).lean();
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

  const {
    _id,
    date,
    rpr,
    bloodGroup,
    hepatitis,
    rubella,
    hiv,
    glucose,
    hb,
    notes,
  } = bloodResult;

  return {
    id: _id.toString(),
    date,
    rpr,
    bloodGroup,
    hepatitis,
    rubella,
    hiv,
    glucose,
    hb,
    notes,
  };
};

/* export const getMotherInfoWithPaymentSum = async () => {
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
        edd: 1,
      },
    },
    { $sort: { edd: -1 } },
  ]);

  return mothers.map(
    ({
      _id,
      fullName,
      userId,
      surname,
      contactNumber,
      email,
      paymentSum,
      edd,
    }) => ({
      _id,
      fullName: fullName + " " + surname,
      userId,
      contactNumber,
      email,
      paymentSum,
      edd,
    })
  );
};
 */
interface PaginatedMothersInput {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}

export async function getPaginatedMothers({
  page = 1,
  limit = 10,
  sortField = "edd",
  sortOrder = "asc",
  search = "",
}: PaginatedMothersInput) {
  await dbConnect();

  const match: any = { status: { $ne: "closed" } };
  if (search) {
    match.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { surname: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const [data, total] = await Promise.all([
    MotherInfo.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "paymententries",
          localField: "userId",
          foreignField: "userId",
          as: "paymententries",
        },
      },
      { $addFields: { paymentSum: { $sum: "$paymententries.amount" } } },
      {
        $project: {
          userId: 1,
          email: 1,
          surname: 1,
          fullName: 1,
          contactNumber: 1,
          packageType: 1,
          paymentSum: 1,
          edd: 1,
        },
      },
      { $sort: { [sortField]: sortOrder === "desc" ? -1 : 1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]),
    MotherInfo.countDocuments(match),
  ]);

  const mapped: any[] = data.map((m: IMotherInfo) => ({
    _id: m._id?.toString(),
    id: m._id?.toString(),
    userId: m.userId?.toString(),
    fullName: m.fullName + " " + m.surname,
    contactNumber: m.contactNumber,
    email: m.email,
    paymentSum: m.paymentSum,
    edd: m.edd ? new Date(m.edd).toISOString() : "",
  }));

  return { data: mapped, total };
}

export const getMotherInfoWithPaymentSum = async (
  page: number,
  pageSize: number,
  searchTerm?: string
) => {
  await dbConnect();

  const matchStage =
    searchTerm && searchTerm.trim() !== ""
      ? {
          $or: [
            { fullName: { $regex: searchTerm, $options: "i" } },
            { surname: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } },
            { contactNumber: { $regex: searchTerm, $options: "i" } },
          ],
        }
      : {};

  // Get total count for pagination based on search
  const totalCount = await MotherInfo.countDocuments(matchStage);

  const mothers = await MotherInfo.aggregate([
    { $match: matchStage },
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
    { $sort: { edd: -1 } },
    { $skip: page * pageSize },
    { $limit: pageSize },
    {
      $project: {
        userId: 1,
        email: 1,
        surname: 1,
        fullName: 1,
        contactNumber: 1,
        packageType: 1,
        paymentSum: 1,
        edd: 1,
      },
    },
  ]);

  const paginatedMothers = mothers.map(
    ({
      _id,
      fullName,
      surname,
      userId,
      contactNumber,
      email,
      paymentSum,
      edd,
    }) => ({
      _id,
      fullName: `${fullName} ${surname}`,
      userId,
      contactNumber,
      email,
      paymentSum,
      edd,
    })
  );

  return { data: paginatedMothers, totalCount };
};
