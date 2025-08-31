import { NextRequest, NextResponse } from "next/server";
import { sendBabyScanNotifications } from "@/actions/notifications";

export async function POST(req: NextRequest) {
  await sendBabyScanNotifications();
  return NextResponse.json({ status: "Sent" });
}
