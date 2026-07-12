import { ApiError } from '../utils/apiError.js';
import { STATUS_CODES } from '../config/constants.js';

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    return next(new ApiError(STATUS_CODES.BAD_REQUEST, 'Validation Error', error.errors));
  }
};
