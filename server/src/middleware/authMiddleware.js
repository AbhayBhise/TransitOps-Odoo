import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';
import { STATUS_CODES } from '../config/constants.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'Unauthorized request');
  }

  try {
    const decodedToken = jwt.verify(token, env.JWT_SECRET);
    
    // In a real application, you might want to verify the user exists in DB
    req.user = decodedToken;
    next();
  } catch (error) {
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'Invalid Access Token');
  }
});
