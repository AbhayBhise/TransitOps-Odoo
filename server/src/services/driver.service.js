import { PrismaClient } from '@prisma/client';
import { BaseService } from './base.service.js';
import { ApiError } from '../utils/apiError.js';

const prisma = new PrismaClient();

class DriverService extends BaseService {
  constructor() {
    super(prisma.driver);
  }
}
export const driverService = new DriverService();