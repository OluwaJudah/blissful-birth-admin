import { z } from "zod";

export const motherInfoFormSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full Name is required." }).trim(),
    surname: z.string().min(2, { message: "Surname is required." }).trim(),
    maidenName: z.string().trim(),
    idPassportNo: z
      .string()
      .min(2, {
        message: "ID / Passport Number is required.",
      })
      .trim(),
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    lastMenstrualDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    contactNumber: z
      .string()
      .min(6, {
        message: "Contact Number is required",
      })
      .regex(/[0-9]/, { message: "Contain only number between 0 - 9." })
      .trim(),
    email: z.string(),
    countryOfOrigin: z
      .string()
      .min(6, {
        message: "Country of Origin is required",
      })
      .trim(),
    occupation: z.string().trim(),
  })
  .superRefine(({ contactNumber }, ctx) => {
    if (contactNumber !== "" && !contactNumber.startsWith("0")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Contact Number must start with 0. E.g 067 123 4545.",
        path: ["contactNumber"],
      });
    }
  });

export type MotherInfoForm = z.infer<typeof motherInfoFormSchema>;

export const birthCompanionSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full Name is required." }).trim(),
    surname: z.string().min(2, { message: "Surname is required." }).trim(),
    maidenName: z.string().trim(),
    idPassportNo: z
      .string()
      .min(2, {
        message: "ID / Passport Number is required.",
      })
      .trim(),
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    contactNumber: z
      .string()
      .min(6, {
        message: "Contact Number is required",
      })
      .regex(/[0-9]/, { message: "Contain only number between 0 - 9." })
      .trim(),
    email: z.string(),
    countryOfOrigin: z
      .string()
      .min(6, {
        message: "Country of Origin is required",
      })
      .trim(),
    occupation: z.string().trim(),
  })
  .superRefine(({ contactNumber }, ctx) => {
    if (contactNumber !== "" && !contactNumber.startsWith("0")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Contact Number must start with 0. E.g 067 123 4545.",
        path: ["contactNumber"],
      });
    }
  });

export type BirthCompanionForm = z.infer<typeof birthCompanionSchema>;

export const babyInfoSchema = z.object({
  fullName: z.string().min(2, { message: "Full Name is required." }).trim(),
  surname: z.string().min(2, { message: "Surname is required." }).trim(),
});

export type BabyInfoForm = z.infer<typeof babyInfoSchema>;

export const createMotherInfoSchema = z.object({
  details: z.string().trim(),
  medication: z.string().trim(),
  operations: z.string().trim(),
  allergies: z.string().trim(),
  conditions: z.string().trim(),
  familyHistory: z.string().trim(),
  tbSymptomsScreen: z.string().trim(),
  motherInfo: z.string().trim(),
  birthCompanion: z.string().trim(),
  babyInfo: z.string().trim(),
});

export type CreateMotherInfoForm = z.infer<typeof createMotherInfoSchema>;

export type CreateMotherInfoFormState = {
  errors?: {
    details?: string[];
    medication?: string[];
    operations?: string[];
    allergies?: string[];
    conditions?: string[];
    familyHistory?: string[];
    tbSymptomsScreen?: string[];
    motherInfo?: string[];
    birthCompanion?: string[];
    babyInfo?: string[];
  };
  message?: string | null;
};

export type ICreateMotherInfo = {
  details: string;
  medication: string;
  operations: string;
  allergies: string;
  conditions: string;
  familyHistory: string;
  tbSymptomsScreen: string;
  motherInfo: string;
  birthCompanion: string;
  babyInfo: string;
};

export type IMedicalHistory = {
  details: string;
  medication: string;
  operations: string;
  allergies: string;
  conditions: string;
  familyHistory: string;
  tbSymptomsScreen: string;
};

export type IBirthCompanion = {
  _id?: string;
  userId?: string;
  fullName: string;
  surname: string;
  maidenName: string;
  idPassportNo: string;
  dateOfBirth: Date;
  contactNumber: string;
  email: string;
  countryOfOrigin: string;
  occupation: string;
};

export type IMotherInfo = IBirthCompanion & {
  lastMenstrualDate: Date;
  paymentSum?: number;
  packageType?: string;
};

export type IBabyInfo = {
  fullName: string;
  surname: string;
};
