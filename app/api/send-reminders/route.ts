import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, phone, appointmentDate, message } = await req.json();

  const reminderDays = [4, 2];

  for (const daysBefore of reminderDays) {
    const date = new Date(appointmentDate);
    date.setDate(date.getDate() - daysBefore);
  }

  return NextResponse.json({ status: "Scheduled" });
}
