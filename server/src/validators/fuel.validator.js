import { z } from 'zod';
export const fuelSchema = z.object({
  body: z.object({
    vehicleId: z.string().min(1),
    liters: z.number().min(0),
    cost: z.number().min(0),
    date: z.string().datetime()
  })
});