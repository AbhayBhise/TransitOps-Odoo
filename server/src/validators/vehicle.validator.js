import { z } from 'zod';

export const vehicleSchema = z.object({
  body: z.object({
    registrationNumber: z.string().min(1),
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.number().int().min(1900),
    status: z.enum(['AVAILABLE', 'ON_TRIP', 'IN_SHOP', 'RETIRED']).optional(),
    capacity: z.number().min(0).optional()
  })
});