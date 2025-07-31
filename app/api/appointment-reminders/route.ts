import { NextRequest, NextResponse } from "next/server";
import { sendNotifications } from "@/actions/notifications";

export async function POST(req: NextRequest) {
  await sendNotifications();
  return NextResponse.json({ status: "Scheduled" });
  
}
