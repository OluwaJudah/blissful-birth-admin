"server-only";
import { CLIENT, CREDENTIALS } from "@/constants/user";
import dbConnect from "@/lib/db";
import User from "@/models/user";

export const createUser = async (username: string, password: string) => {
  await dbConnect();

  const user = User.create({
    username,
    password,
    authType: CREDENTIALS,
    role: CLIENT,
  });

  return user;
};
