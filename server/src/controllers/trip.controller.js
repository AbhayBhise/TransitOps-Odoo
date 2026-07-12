import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { tripService } from '../services/trip.service.js';

export const createTrip = asyncHandler(async (req, res) => {
  const trip = await tripService.create(req.body);
  res.status(201).json(new ApiResponse(201, trip, 'Trip created'));
});
export const dispatchTrip = asyncHandler(async (req, res) => {
  const trip = await tripService.dispatch(req.params.id);
  res.status(200).json(new ApiResponse(200, trip, 'Trip dispatched'));
});
export const completeTrip = asyncHandler(async (req, res) => {
  const trip = await tripService.complete(req.params.id);
  res.status(200).json(new ApiResponse(200, trip, 'Trip completed'));
});
export const cancelTrip = asyncHandler(async (req, res) => {
  const trip = await tripService.cancel(req.params.id);
  res.status(200).json(new ApiResponse(200, trip, 'Trip cancelled'));
});
export const getTrips = asyncHandler(async (req, res) => {
  const trips = await tripService.findAll();
  res.status(200).json(new ApiResponse(200, trips));
});