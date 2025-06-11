"use server";
import {
  loginUserformSchema,
  LoginUserState,
  registerUserformSchema,
  RegisterUserState,
} from "@/definitions/auth";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";
import { createUser } from "./user";
import { getUser, isUserExists } from "@/data/user";
import bcrypt from "bcrypt";

export async function registerUser(
  prevState: RegisterUserState | undefined,
  formData: FormData
) {
  const validatedFields = registerUserformSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: RegisterUserState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const { username, password } = validatedFields.data;

  try {
    const isUserExist = await isUserExists(username);
    if (isUserExist) {
      const state: RegisterUserState = {
        errors: { username: ["User already exists"] },
      };
      return state;
    }
  } catch (error) {
    throw new Error("Error fetching user:" + error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await createUser(username, hashedPassword);
    await createSession(user.id);
  } catch (error) {
    throw new Error("Error creating user:" + error);
  }

  redirect("/welcome");
}

export async function loginUser(
  prevState: LoginUserState | undefined,
  formData: FormData
) {
  const validatedFields = loginUserformSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: LoginUserState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const { username, password } = validatedFields.data;

  try {
    const user = await getUser({ username });
    if (!user) {
      const state: LoginUserState = {
        errors: { username: ["User does not exists"] },
      };
      return state;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const state: LoginUserState = {
        errors: { password: ["Incorrect password"] },
      };
      return state;
    }

    await createSession(user.id);
  } catch (error) {
    console.error("Error: fetching Something went Wrong:", error);
  }

  redirect("/clients");
}

export async function logout() {
  deleteSession();
  redirect("/login");
}
