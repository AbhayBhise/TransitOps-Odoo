import { logger } from '../config/logger.js';
import { ApiError } from '../utils/apiError.js';
import { env } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (err.code) {
    switch (err.code) {
      case 'P2002':
        error = new ApiError(409, `Duplicate value for ${err.meta?.target ? err.meta.target.join(', ') : 'field'}`);
        break;
      case 'P2025':
        error = new ApiError(404, 'Record not found');
        break;
      case 'P2003':
        error = new ApiError(400, `Foreign key violation on ${err.meta?.field_name || 'field'}`);
        break;
    }
  }

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

  if (err.clientVersion && response.stack) {
    delete response.stack;
  }

  logger.error(`Error: ${error.message}`, { 
    path: req.originalUrl,
    method: req.method,
    stack: error.stack
  });

  return res.status(error.statusCode).json(response);
};
