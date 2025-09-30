import { z } from "zod";

export type IAppointment = {
  type?: string;
  time: string;
  date: Date;
  status?: string;
  note?: string;
  pregnancyWeeks: number;
};

export type INotification = {
  to: string;
  message: string;
  status?: string;
  messageSid?: string;
};

export type IAppointmentData = {
  id: string;
  time: string;
  date: string;
  status: string;
  fullName: string;
  surname: string;
  userId: string;
  pregnancyWeeks: number;
};

export type IBabyReport = {
  _id?: string;
  babyHeight: number;
  babyHeartRate: number;
  babyPresentation: string;
  babyPosition: string;
  babyNote: string;
};

export type BabyReportFormState = {
  errors?: {
    babyHeight?: string[];
    babyHeartRate?: string[];
    babyPresentation?: string[];
    babyPosition?: string[];
    babyNote?: string[];
  };
  message?: string | null;
};

export const babyReportFormSchema = z.object({
  babyHeight: z.coerce.number(),
  babyHeartRate: z.coerce.number(),
  babyPresentation: z.string(),
  babyPosition: z.string(),
  babyNote: z.string(),
});

export type BabyReportFormSchema = z.infer<typeof babyReportFormSchema>;

export type IMotherReport = {
  _id?: string;
  motherWeight: number;
  motherBloodPressure: string;
  motherPulse: number;
  motherLeucosite: string;
  motherGlucose: string;
  motherProtein: string;
  motherBlood: string;
  motherNote: string;
};

export type MotherReportFormState = {
  errors?: {
    motherWeight?: string[];
    motherBloodPressure?: string[];
    motherPulse?: string[];
    motherLeucosite?: string[];
    motherGlucose?: string[];
    motherProtein?: string[];
    motherBlood?: string[];
    motherNote?: string[];
  };
  message?: string | null;
};

export const motherReportFormSchema = z.object({
  motherWeight: z.coerce.number(),
  motherBloodPressure: z
    .string()
    .refine((val) => val === "" || /^\d{2,3}\/\d{2,3}$/.test(val), {
      message: "Blood Pressure must be in the format 120/80",
    }),
  motherPulse: z.coerce.number(),
  motherLeucosite: z.string(),
  motherGlucose: z.string(),
  motherProtein: z.string(),
  motherBlood: z.string(),
  motherNote: z.string(),
});

export type MotherReportFormSchema = z.infer<typeof motherReportFormSchema>;

export type GenerateAppointmentsFormState = {
  errors?: {
    edd?: string[];
  };
  message?: string | null;
};

export const generateAppointmentsFormSchema = z.object({
  edd: z.string().min(1, "Please select date"),
});

export type GenerateAppointmentsFormSchema = z.infer<
  typeof generateAppointmentsFormSchema
>;

export type CreateAppointmentFormState = {
  errors?: {
    pregnancyWeeks?: string[];
    date?: string[];
    time?: string[];
  };
  message?: string | null;
};

export const createAppointmentFormSchema = z.object({
  pregnancyWeeks: z.coerce.number().min(1, {
    message: "Baby's Height must be greater than 0.",
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  time: z.string().min(1, "Please select a Time Slot "),
});

export type CreateAppointmentFormSchema = z.infer<
  typeof createAppointmentFormSchema
>;

export const createNotificationFormSchema = z.object({
  to: z.string().min(1, "Please enter the phone number"),
  message: z.string(),
});

export type CreateNotificationFormSchema = z.infer<
  typeof createNotificationFormSchema
>;

export type CreateNotificationFormState = {
  errors?: {
    to?: string[];
    message?: string[];
  };
  message?: string | null;
};
