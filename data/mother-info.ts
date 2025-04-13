"use server";
import dbConnect from "@/lib/db";
import MotherInfo from "@/models/mother-info";

export const getMothers = async () => {
  await dbConnect();

  const mothers = await MotherInfo.find();
  return mothers;
};
