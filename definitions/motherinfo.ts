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
