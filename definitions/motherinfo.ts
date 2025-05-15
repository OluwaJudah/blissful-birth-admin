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
  glucose: z.coerce.number(),
  hb: z.coerce.number(),
  notes: z.string(),
});

export type BloodResultsFormSchema = z.infer<typeof bloodResultsFormSchema>;
