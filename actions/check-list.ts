"use server";
import CheckList from "@/models/check-list";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db";

// ✅ Toggle a checklist field (check/uncheck)
export async function toggleCheckListItem(userId: string, key: string) {
  await dbConnect();

  const checklist = (await CheckList.findOne({ userId })) as any;

  const keys = ["datingScan", "anc", "week13", "week21"];
  if (!keys.includes(key)) return null;

  const current = checklist[key].status;
  checklist[key].status = !current;
  checklist[key].completedAt = !current ? new Date() : null;

  await checklist.save();
  revalidatePath("/dashboard");

  return JSON.parse(JSON.stringify(checklist));
}
