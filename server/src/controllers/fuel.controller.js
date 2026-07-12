import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { fuelService } from '../services/fuel.service.js';

export const createFuelLog = asyncHandler(async (req, res) => {
  const fuel = await fuelService.create(req.body);
  res.status(201).json(new ApiResponse(201, fuel));
});
export const getFuelLogs = asyncHandler(async (req, res) => {
  const fuels = await fuelService.findAll();
  res.status(200).json(new ApiResponse(200, fuels));
});