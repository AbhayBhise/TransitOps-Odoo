import { Router } from 'express';
import healthRoutes from './health.routes.js';

const router = Router();

// API Health Check
router.use('/health', healthRoutes);

// Register other routes here
// router.use('/users', userRoutes);

export default router;
