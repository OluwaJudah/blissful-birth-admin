import twilio from "twilio";

if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
  throw new Error("Missing Twilio credentials in env");
} else {
  console.log("Twilio credentials found");
}

export const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export const sendWhatsApp = async (to: string, body = "") => {
  return await client.messages.create({
    contentSid: process.env.TWILIO_REMINDER_CONTENTSID,
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
    to: `whatsapp:${to}`,
  });
};
