import { z } from 'zod';

export const tripSchema = z.object({
  body: z.object({
    vehicleId: z.string().min(1),
    driverId: z.string().min(1),
    origin: z.string().min(1),
    destination: z.string().min(1),
    cargoWeight: z.number().min(0).optional()
  })
});