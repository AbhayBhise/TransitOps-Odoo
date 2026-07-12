import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { expenseService } from '../services/expense.service.js';

export const createExpense = asyncHandler(async (req, res) => {
  const expense = await expenseService.create(req.body);
  res.status(201).json(new ApiResponse(201, expense));
});
export const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await expenseService.findAll();
  res.status(200).json(new ApiResponse(200, expenses));
});