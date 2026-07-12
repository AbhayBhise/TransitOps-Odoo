import { Router } from 'express';
import { createVehicle, getVehicles, getVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicle.controller.js';
import { validate } from '../middleware/validateMiddleware.js';
import { vehicleSchema } from '../validators/vehicle.validator.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = Router();
router.use(verifyJWT);
router.post('/', validate(vehicleSchema), createVehicle);
router.get('/', getVehicles);
router.get('/:id', getVehicle);
router.patch('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);
export default router;