import { z } from 'zod';

export const driverSchema = z.object({
  body: z.object({
    licenseNumber: z.string().min(1),
    name: z.string().min(1),
    status: z.enum(['AVAILABLE', 'ON_TRIP', 'OFF_DUTY', 'SUSPENDED']).optional(),
    licenseExpiry: z.string().datetime()
  })
});