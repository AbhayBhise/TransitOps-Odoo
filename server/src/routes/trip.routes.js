import { Router } from 'express';
import { createTrip, dispatchTrip, completeTrip, cancelTrip, getTrips } from '../controllers/trip.controller.js';
import { validate } from '../middleware/validateMiddleware.js';
import { tripSchema } from '../validators/trip.validator.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = Router();
router.use(verifyJWT);
router.post('/', validate(tripSchema), createTrip);
router.patch('/:id/dispatch', dispatchTrip);
router.patch('/:id/complete', completeTrip);
router.patch('/:id/cancel', cancelTrip);
router.get('/', getTrips);
export default router;