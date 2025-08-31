import Notification from "@/models/notification";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData(); // Twilio sends as x-www-form-urlencoded
  const messageSid = data.get("MessageSid");
  const messageStatus = data.get("MessageStatus");

  console.log(`📩 Twilio update: ${messageSid} -> ${messageStatus}`);

  // Optionally save to DB
  await Notification.updateOne({ messageSid }, { status: messageStatus });

  return NextResponse.json({ received: true });
}
