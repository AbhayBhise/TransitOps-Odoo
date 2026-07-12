import { PrismaClient } from '@prisma/client';
import { BaseService } from './base.service.js';
import { ApiError } from '../utils/apiError.js';

const prisma = new PrismaClient();

class VehicleService extends BaseService {
  constructor() {
    super(prisma.vehicle);
  }
}
export const vehicleService = new VehicleService();