import { z } from "zod";

export type IAppointment = {
  type: string;
  time: string;
  date: string;
  status: string;
  note: string;
  pregnancyWeeks: number;
};

export type IBabyReport = {
  _id?: string;
  babyWeight: number;
  babyHeight: number;
  babyHeartRate: number;
  babyPosition: string;
  babyNote: string;
};

export type BabyReportFormState = {
  errors?: {
    babyWeight?: string[];
    babyHeight?: string[];
    babyHeartRate?: string[];
    babyPosition?: string[];
    babyNote?: string[];
  };
  message?: string | null;
};

export const babyReportFormSchema = z.object({
  babyWeight: z.coerce.number().min(1, {
    message: "Baby's Weight must be greater than 0.",
  }),
  babyHeight: z.coerce.number().min(1, {
    message: "Baby's Height must be greater than 0.",
  }),
  babyHeartRate: z.coerce.number().min(1, {
    message: "Baby's Heart Rate must be greater than 0.",
  }),
  babyPosition: z.string().min(1, {
    message: "Baby's Position must be Vertex, Breech or Transverse.",
  }),
  babyNote: z.string(),
});

export type BabyReportFormSchema = z.infer<typeof babyReportFormSchema>;

export type IMotherReport = {
  _id?: string;
  motherWeight: number;
  motherUrine: number;
  motherPalpation: number;
  motherBloodPressure: string;
  motherFh: number;
  motherNote: string;
};

export type MotherReportFormState = {
  errors?: {
    motherWeight?: string[];
    motherUrine?: string[];
    motherPalpation?: string[];
    motherBloodPressure?: string[];
    motherFh?: string[];
    motherNote?: string[];
  };
  message?: string | null;
};

export const motherReportFormSchema = z.object({
  motherWeight: z.coerce.number().min(1, {
    message: "Mother's Weight must be greater than 0.",
  }),
  motherUrine: z.coerce.number().min(1, {
    message: "Mother's Urine must be greater than 0.",
  }),
  motherPalpation: z.coerce.number().min(1, {
    message: "Mother's Palpation must be greater than 0.",
  }),
  motherBloodPressure: z
    .string()
    .regex(/^\d{2,3}\/\d{2,3}$/, {
      message: "Please follow the pattern of mm/Hg. E.g 120/80",
    }),
  motherFh: z.coerce.number().min(1, {
    message: "Mother's FH must be greater than 0.",
  }),
  motherNote: z.string(),
});

export type MotherReportFormSchema = z.infer<typeof motherReportFormSchema>;

export type IMedicalHistory = {
  details: string;
  medication: string;
  operations: string;
  allergies: string;
  conditions: string;
  familyHistory: string;
  tbSymptomsScreen: string;
};
