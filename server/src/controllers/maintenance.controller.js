import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { maintenanceService } from '../services/maintenance.service.js';

export const openMaintenance = asyncHandler(async (req, res) => {
  const m = await maintenanceService.open(req.body);
  res.status(201).json(new ApiResponse(201, m, 'Maintenance opened'));
});
export const closeMaintenance = asyncHandler(async (req, res) => {
  const m = await maintenanceService.close(req.params.id);
  res.status(200).json(new ApiResponse(200, m, 'Maintenance closed'));
});
export const getMaintenances = asyncHandler(async (req, res) => {
  const m = await maintenanceService.findAll();
  res.status(200).json(new ApiResponse(200, m));
});