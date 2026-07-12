import { PrismaClient } from '@prisma/client';
import { ApiError } from '../utils/apiError.js';

const prisma = new PrismaClient();

export const tripService = {
  async create(data) {
    const vehicle = await prisma.vehicle.findUnique({ where: { id: data.vehicleId } });
    if (!vehicle || vehicle.status !== 'AVAILABLE') throw new ApiError(400, 'Vehicle must be AVAILABLE');
    if (data.cargoWeight && data.cargoWeight > vehicle.capacity) throw new ApiError(400, 'Cargo cannot exceed capacity');

    const driver = await prisma.driver.findUnique({ where: { id: data.driverId } });
    if (!driver || driver.status !== 'AVAILABLE') throw new ApiError(400, 'Driver must be AVAILABLE');
    if (driver.status === 'SUSPENDED') throw new ApiError(400, 'Driver cannot be suspended');
    if (new Date(driver.licenseExpiry) < new Date()) throw new ApiError(400, 'Driver license cannot be expired');

    return prisma.trip.create({ data });
  },

  async dispatch(id) {
    return prisma.$transaction(async (tx) => {
      const trip = await tx.trip.findUnique({ where: { id } });
      if (!trip || trip.status !== 'DRAFT') throw new ApiError(400, 'Trip must be in DRAFT state');
      
      await tx.vehicle.update({ where: { id: trip.vehicleId }, data: { status: 'ON_TRIP' } });
      await tx.driver.update({ where: { id: trip.driverId }, data: { status: 'ON_TRIP' } });
      
      return tx.trip.update({ where: { id }, data: { status: 'DISPATCHED', startTime: new Date() } });
    });
  },

  async complete(id) {
    return prisma.$transaction(async (tx) => {
      const trip = await tx.trip.findUnique({ where: { id } });
      if (!trip || trip.status !== 'DISPATCHED') throw new ApiError(400, 'Trip must be DISPATCHED');
      
      await tx.vehicle.update({ where: { id: trip.vehicleId }, data: { status: 'AVAILABLE' } });
      await tx.driver.update({ where: { id: trip.driverId }, data: { status: 'AVAILABLE' } });
      
      return tx.trip.update({ where: { id }, data: { status: 'COMPLETED', endTime: new Date() } });
    });
  },

  async cancel(id) {
    return prisma.$transaction(async (tx) => {
      const trip = await tx.trip.findUnique({ where: { id } });
      if (trip.status === 'DISPATCHED') {
        await tx.vehicle.update({ where: { id: trip.vehicleId }, data: { status: 'AVAILABLE' } });
        await tx.driver.update({ where: { id: trip.driverId }, data: { status: 'AVAILABLE' } });
      }
      return tx.trip.update({ where: { id }, data: { status: 'CANCELLED' } });
    });
  },
  
  async findAll() {
    return prisma.trip.findMany();
  }
};