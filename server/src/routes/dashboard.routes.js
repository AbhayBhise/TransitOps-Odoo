import { Router } from 'express';
import { getDashboard } from '../controllers/dashboard.controller.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = Router();
router.use(verifyJWT);
router.get('/', getDashboard);
export default router;