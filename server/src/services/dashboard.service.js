import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async () => {
  const availableVehicles = await prisma.vehicle.count({ where: { status: 'AVAILABLE' } });
  const activeTrips = await prisma.trip.count({ where: { status: 'DISPATCHED' } });
  const driversAvailable = await prisma.driver.count({ where: { status: 'AVAILABLE' } });
  const vehiclesInShop = await prisma.vehicle.count({ where: { status: 'IN_SHOP' } });

  const totalVehicles = await prisma.vehicle.count();
  const fleetUtilization = totalVehicles > 0 ? (activeTrips / totalVehicles) * 100 : 0;

  const fuelCostResult = await prisma.fuelLog.aggregate({ _sum: { cost: true } });
  const maintenanceCostResult = await prisma.maintenance.aggregate({ _sum: { cost: true } });

  return {
    availableVehicles,
    activeTrips,
    driversAvailable,
    vehiclesInShop,
    fleetUtilization,
    fuelCost: fuelCostResult._sum.cost || 0,
    maintenanceCost: maintenanceCostResult._sum.cost || 0
  };
};