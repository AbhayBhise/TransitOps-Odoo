import { Router } from 'express';
import { createExpense, getExpenses } from '../controllers/expense.controller.js';
import { validate } from '../middleware/validateMiddleware.js';
import { expenseSchema } from '../validators/expense.validator.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = Router();
router.use(verifyJWT);
router.post('/', validate(expenseSchema), createExpense);
router.get('/', getExpenses);
export default router;