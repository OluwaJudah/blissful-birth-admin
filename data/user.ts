import dbConnect from "@/lib/db";
import User from "@/models/user";
import { cache } from "react";

export const getUser = cache(async (userData: any) => {
  await dbConnect();
  return await User.findOne(userData);
});

export const isUserExists = async (username: string) => {
  try {
    await dbConnect();
    const user = await getUser({ username });

    return !!user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
};
