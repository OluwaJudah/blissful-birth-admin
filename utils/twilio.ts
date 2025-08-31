import twilio from "twilio";

export const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsApp = async (
  to: string,
  contentSid: string,
  contentVariables = ""
) => {
  return await client.messages.create({
    contentSid,
    contentVariables,
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
    to: `whatsapp:${to}`,
    statusCallback: `${process.env.BASE_URL}/api/twilio-status`,
  });
};
