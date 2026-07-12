import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

// API Health Check
router.use('/health', healthRoutes);

// Auth Routes
router.use('/auth', authRoutes);

// Register other routes here
// router.use('/users', userRoutes);

export default router;
