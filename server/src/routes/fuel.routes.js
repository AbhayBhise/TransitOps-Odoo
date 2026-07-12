import { Router } from 'express';
import { createFuelLog, getFuelLogs } from '../controllers/fuel.controller.js';
import { validate } from '../middleware/validateMiddleware.js';
import { fuelSchema } from '../validators/fuel.validator.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = Router();
router.use(verifyJWT);
router.post('/', validate(fuelSchema), createFuelLog);
router.get('/', getFuelLogs);
export default router;