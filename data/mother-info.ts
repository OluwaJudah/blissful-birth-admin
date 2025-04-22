"use server";
import dbConnect from "@/lib/db";
import MotherInfo from "@/models/mother-info";

export const getMothers = async () => {
  await dbConnect();

  const mothersData = await MotherInfo.find().lean();
  const mothers = mothersData.map((m) => ({
    ...m,
    userId: m.userId.toString(),
  }));
  return mothers;
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
        firstName: 1,
        contactNumber: 1,
        paymentSum: 1,
      },
    },
  ]);

  return mothers;
};
