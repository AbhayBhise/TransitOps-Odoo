import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { STATUS_CODES } from '../config/constants.js';

export const checkHealth = asyncHandler(async (req, res) => {
  // User specifically requested this response format
  return res.status(STATUS_CODES.OK).json({
    success: true,
    message: "TransitOps Backend Running"
  });
});
