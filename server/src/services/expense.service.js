import { PrismaClient } from '@prisma/client';
import { BaseService } from './base.service.js';
const prisma = new PrismaClient();
class ExpenseService extends BaseService {
  constructor() { super(prisma.expense); }
}
export const expenseService = new ExpenseService();