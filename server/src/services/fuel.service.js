import { PrismaClient } from '@prisma/client';
import { BaseService } from './base.service.js';
const prisma = new PrismaClient();
class FuelService extends BaseService {
  constructor() { super(prisma.fuelLog); }
}
export const fuelService = new FuelService();