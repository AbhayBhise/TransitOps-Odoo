import { PrismaClient } from '@prisma/client';
import { ApiError } from '../utils/apiError.js';
const prisma = new PrismaClient();

export const maintenanceService = {
  async open(data) {
    return prisma.$transaction(async (tx) => {
      await tx.vehicle.update({ where: { id: data.vehicleId }, data: { status: 'IN_SHOP' } });
      return tx.maintenance.create({ data: { ...data, status: 'IN_PROGRESS' } });
    });
  },
  async close(id) {
    return prisma.$transaction(async (tx) => {
      const m = await tx.maintenance.update({ where: { id }, data: { status: 'COMPLETED' } });
      await tx.vehicle.update({ where: { id: m.vehicleId }, data: { status: 'AVAILABLE' } });
      return m;
    });
  },
  async findAll() {
    return prisma.maintenance.findMany();
  }
};