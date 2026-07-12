import { Router } from 'express';
import { register, login, getCurrentUser, logout } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validateMiddleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', verifyJWT, logout);
router.get('/me', verifyJWT, getCurrentUser);

export default router;
