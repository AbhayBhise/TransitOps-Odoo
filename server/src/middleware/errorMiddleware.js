import { logger } from '../config/logger.js';
import { ApiError } from '../utils/apiError.js';
import { env } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? error.statusCode : 500;
    const message = error.message || 'Something went wrong';
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(env.NODE_ENV === 'development' ? { stack: error.stack } : {})
  };

  logger.error(`Error: ${error.message}`, { 
    path: req.originalUrl,
    method: req.method,
    stack: error.stack
  });

  return res.status(error.statusCode).json(response);
};
