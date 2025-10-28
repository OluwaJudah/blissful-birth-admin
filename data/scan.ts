import dbConnect from "@/lib/db";
import Scan from "@/models/scan";
import { Types } from "mongoose";
import { unstable_noStore as noStore } from "next/cache";

export async function getScans(userId: string) {
  noStore();
  await dbConnect();

  try {
    const scans = (await Scan.find({
      userId: new Types.ObjectId(userId),
    })) as any[];

    return scans.map((s: any) => ({
      id: s._id.toString(),
      date: s.date,
      gestational_age: s.gestational_age,
      scan_gestation: s.scan_gestation,
      outcome: s.outcome,
      warning: s.warning,
      userId: s.userId.toString(),
    }));
  } catch (error) {
    console.log("error: ", error);
  }
}
