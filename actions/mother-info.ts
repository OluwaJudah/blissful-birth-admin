"use server";
import dbConnect from "@/lib/db";
import MotherInfo from "@/models/mother-info";
import { Types } from "mongoose";

export const updateClientPackage = async (
  packageType: string,
  motherId: string
) => {
  await dbConnect();

  if (!Types.ObjectId.isValid(motherId)) {
    throw new Error("Invalid mother ID");
  }

  await MotherInfo.findByIdAndUpdate(
    motherId, // Filter
    { $set: { packageType } },
    {
      new: true, // Return the updated document
      runValidators: true, // Apply schema validations
    }
  );
};
