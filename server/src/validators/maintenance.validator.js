import { z } from 'zod';
export const maintenanceSchema = z.object({
  body: z.object({
    vehicleId: z.string().min(1),
    description: z.string().min(1),
    cost: z.number().min(0),
    date: z.string().datetime()
  })
});