import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { driverService } from '../services/driver.service.js';

export const createDriver = asyncHandler(async (req, res) => {
  const driver = await driverService.create(req.body);
  res.status(201).json(new ApiResponse(201, driver, 'Driver created'));
});
export const getDrivers = asyncHandler(async (req, res) => {
  const drivers = await driverService.findAll();
  res.status(200).json(new ApiResponse(200, drivers));
});
export const getDriver = asyncHandler(async (req, res) => {
  const driver = await driverService.findById(req.params.id);
  res.status(200).json(new ApiResponse(200, driver));
});
export const updateDriver = asyncHandler(async (req, res) => {
  const driver = await driverService.update(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, driver));
});
export const deleteDriver = asyncHandler(async (req, res) => {
  await driverService.delete(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Driver deleted'));
});