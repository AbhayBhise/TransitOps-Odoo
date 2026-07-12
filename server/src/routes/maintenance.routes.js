import { Router } from 'express';
import { openMaintenance, closeMaintenance, getMaintenances } from '../controllers/maintenance.controller.js';
import { validate } from '../middleware/validateMiddleware.js';
import { maintenanceSchema } from '../validators/maintenance.validator.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = Router();
router.use(verifyJWT);
router.post('/open', validate(maintenanceSchema), openMaintenance);
router.post('/:id/close', closeMaintenance);
router.get('/', getMaintenances);
export default router;