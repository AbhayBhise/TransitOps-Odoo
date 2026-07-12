import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { authService } from '../services/auth.service.js';
import { STATUS_CODES } from '../config/constants.js';

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  res.status(STATUS_CODES.CREATED).json(
    new ApiResponse(STATUS_CODES.CREATED, user, 'User registered successfully')
  );
});

export const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  res.status(STATUS_CODES.OK).json(
    new ApiResponse(STATUS_CODES.OK, data, 'User logged in successfully')
  );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(STATUS_CODES.OK).json(
    new ApiResponse(STATUS_CODES.OK, req.user, 'Current user retrieved')
  );
});

export const logout = asyncHandler(async (req, res) => {
  // Client is responsible for deleting the token from their side
  res.status(STATUS_CODES.OK).json(
    new ApiResponse(STATUS_CODES.OK, null, 'Logged out successfully')
  );
});
