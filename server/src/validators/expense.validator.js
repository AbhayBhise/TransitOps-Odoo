import { z } from 'zod';
export const expenseSchema = z.object({
  body: z.object({
    vehicleId: z.string().min(1),
    type: z.enum(['FUEL', 'MAINTENANCE', 'TOLL', 'OTHER']),
    amount: z.number().min(0),
    description: z.string().optional(),
    date: z.string().datetime()
  })
});