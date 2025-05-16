import { z } from "zod";

export type IAppointment = {
  type: string;
  time: string;
  date: Date;
  status: string;
  note: string;
  pregnancyWeeks: number;
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
  babyHeight: z.coerce.number().min(1, {
    message: "Baby's Height must be greater than 0.",
  }),
  babyHeartRate: z.coerce.number().min(1, {
    message: "Baby's Heart Rate must be greater than 0.",
  }),
  babyPresentation: z.string().min(1, {
    message: "Baby's Position must be Vertex, Breech, Transverse or Unsure.",
  }),
  babyPosition: z.string().min(1, {
    message: "Baby's Position must be LOA, ROA, Posterior or Unsure.",
  }),
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
  motherPalpation: number;
  motherFh: number;
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
    motherPalpation?: string[];
    motherFh?: string[];
    motherNote?: string[];
  };
  message?: string | null;
};

export const motherReportFormSchema = z.object({
  motherWeight: z.coerce.number().min(1, {
    message: "Mother's Weight must be greater than 0.",
  }),
  motherBloodPressure: z.string().regex(/^\d{2,3}\/\d{2,3}$/, {
    message: "Please follow the pattern of mm/Hg. E.g 120/80",
  }),
  motherPulse: z.coerce.number().min(1, {
    message: "Mother's Pulse must be greater than 0.",
  }),
  motherLeucosite: z.string().min(1, {
    message: "Mother's Leucosite must be (Clear, Trace, +1, +2, +3).",
  }),
  motherGlucose: z.string().min(1, {
    message: "Mother's Glucose must be (Clear, Trace, +1, +2, +3).",
  }),
  motherProtein: z.string().min(1, {
    message: "Mother's Protein must be (Clear, Trace, +1, +2, +3).",
  }),
  motherPalpation: z.coerce.number().min(1, {
    message: "Mother's Palpation must be greater than 0.",
  }),
  motherFh: z.coerce.number().min(1, {
    message: "Mother's FH must be greater than 0.",
  }),
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
  edd: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export type GenerateAppointmentsFormSchema = z.infer<
  typeof generateAppointmentsFormSchema
>;

export type RescheduleAppointmentFormState = {
  errors?: {
    date?: string[];
    time?: string[];
  };
  message?: string | null;
};

export const rescheduleAppointmentFormSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  time: z.string().min(1, "Please select a Time Slot "),
});

export type RescheduleAppointmentFormSchema = z.infer<
  typeof rescheduleAppointmentFormSchema
>;
