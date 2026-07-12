import { Router } from 'express';
import { createDriver, getDrivers, getDriver, updateDriver, deleteDriver } from '../controllers/driver.controller.js';
import { validate } from '../middleware/validateMiddleware.js';
import { driverSchema } from '../validators/driver.validator.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = Router();
router.use(verifyJWT);
router.post('/', validate(driverSchema), createDriver);
router.get('/', getDrivers);
router.get('/:id', getDriver);
router.put('/:id', updateDriver);
router.delete('/:id', deleteDriver);
export default router;