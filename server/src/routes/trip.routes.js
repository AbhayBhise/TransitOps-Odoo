import { Router } from 'express';
import { createTrip, dispatchTrip, completeTrip, cancelTrip, getTrips } from '../controllers/trip.controller.js';
import { validate } from '../middleware/validateMiddleware.js';
import { tripSchema } from '../validators/trip.validator.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = Router();
router.use(verifyJWT);
router.post('/', validate(tripSchema), createTrip);
router.post('/:id/dispatch', dispatchTrip);
router.post('/:id/complete', completeTrip);
router.post('/:id/cancel', cancelTrip);
router.get('/', getTrips);
export default router;