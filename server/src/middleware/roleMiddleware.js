import { ApiError } from '../utils/apiError.js';
import { STATUS_CODES } from '../config/constants.js';

export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(new ApiError(STATUS_CODES.UNAUTHORIZED, 'User role not found'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(STATUS_CODES.FORBIDDEN, 'You do not have permission to perform this action'));
    }

    next();
  };
};
