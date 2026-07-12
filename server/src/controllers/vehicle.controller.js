import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { vehicleService } from '../services/vehicle.service.js';

export const createVehicle = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.create(req.body);
  res.status(201).json(new ApiResponse(201, vehicle, 'Vehicle created'));
});
export const getVehicles = asyncHandler(async (req, res) => {
  const vehicles = await vehicleService.findAll();
  res.status(200).json(new ApiResponse(200, vehicles));
});
export const getVehicle = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.findById(req.params.id);
  res.status(200).json(new ApiResponse(200, vehicle));
});
export const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.update(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, vehicle));
});
export const deleteVehicle = asyncHandler(async (req, res) => {
  await vehicleService.delete(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Vehicle deleted'));
});