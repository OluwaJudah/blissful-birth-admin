import { z } from "zod";

const userStatusSchema = z.union([
  z.literal("pending"),
  z.literal("completed"),
  z.literal("confirmed"),
  z.literal("cancelled"),
]);

const serviceStatusSchema = z.union([
  z.literal("clinic"),
  z.literal("birthing"),
]);
export type AppointmentStatus = z.infer<typeof userStatusSchema>;
export type ServiceStatus = z.infer<typeof serviceStatusSchema>;

const appointmentSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  status: userStatusSchema,
  serviceType: serviceStatusSchema,
  scheduledAt: z.coerce.date(),
  scheduledTime: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type User = z.infer<typeof appointmentSchema>;

export const appointmentListSchema = z.array(appointmentSchema);
