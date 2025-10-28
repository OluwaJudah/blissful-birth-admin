import { z } from "zod";

export type MedicalHistoryFormState = {
  errors?: {
    details?: string[];
    medication?: string[];
    operations?: string[];
    allergies?: string[];
  };
  message?: string | null;
};

export const medicalHistoryFormSchema = z.object({
  details: z.string(),
  medication: z.string(),
  operations: z.string(),
  allergies: z.string(),
});

export type MedicalHistoryFormSchema = z.infer<typeof medicalHistoryFormSchema>;

export type BloodResultsFormState = {
  errors?: {
    date?: string[];
    rpr?: string[];
    bloodGroup?: string[];
    hepatitis?: string[];
    rubella?: string[];
    hiv?: string[];
    glucose?: string[];
    hb?: string[];
    notes?: string[];
  };
  message?: string | null;
};

export const bloodResultsFormSchema = z.object({
  date: z.string(),
  rpr: z.string(),
  bloodGroup: z.string(),
  hepatitis: z.string(),
  rubella: z.string(),
  hiv: z.string(),
  glucose: z.coerce.number(),
  hb: z.coerce.number(),
  notes: z.string(),
});

export type BloodResultsFormSchema = z.infer<typeof bloodResultsFormSchema>;

export const scanFormSchema = z.object({
  date: z.string(),
  gestational_age: z.coerce.number(),
  scan_gestation: z.string(),
  outcome: z.string(),
  warning: z.string(),
});

export type ScanFormSchema = z.infer<typeof scanFormSchema>;

export type CreateScanFormState = {
  errors?: {
    date?: string[];
    gestational_age?: string[];
    scan_gestation?: string[];
    outcome?: string[];
    warning?: string[];
  };
  message?: string | null;
};

export const createScanFormSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  gestational_age: z.coerce.number().min(1, {
    message: "Gestational Age must be greater than 0.",
  }),
  scan_gestation: z.string().min(1, "Please enter scan gestation"),
  outcome: z.string().min(1, "Please enter scan outcome"),
  warning: z.string().min(1, "Please enter scan warning"),
});

export type CreateScanFormSchema = z.infer<typeof createScanFormSchema>;

export type IScan = {
  id?: string;
  userId?: string;
  date: Date;
  gestational_age: number;
  scan_gestation: string;
  outcome: string;
  warning: string;
};
