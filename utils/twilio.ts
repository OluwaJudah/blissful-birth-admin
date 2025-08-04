import twilio from "twilio";

export const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsApp = async (to: string, contentVariables = "") => {
  return await client.messages.create({
    contentSid: process.env.TWILIO_REMINDER_CONTENTSID,
    contentVariables,
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
    to: `whatsapp:${to}`,
  });
};
