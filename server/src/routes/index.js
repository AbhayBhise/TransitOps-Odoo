import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';

import vehicleRoutes from './vehicle.routes.js';
import driverRoutes from './driver.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import tripRoutes from './trip.routes.js';
import maintenanceRoutes from './maintenance.routes.js';
import fuelRoutes from './fuel.routes.js';
import expenseRoutes from './expense.routes.js';

const router = Router();

// API Health Check
router.use('/health', healthRoutes);

// Auth Routes
router.use('/auth', authRoutes);

// App Routes
router.use('/vehicles', vehicleRoutes);
router.use('/drivers', driverRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/trips', tripRoutes);
router.use('/maintenance', maintenanceRoutes);
router.use('/fuel', fuelRoutes);
router.use('/expenses', expenseRoutes);

export default router;
