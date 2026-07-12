import { ApiError } from '../utils/apiError.js';
import { STATUS_CODES } from '../config/constants.js';

export const validate = (schema) => async (req, res, next) => {
  try {
    const parsed = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    req.body = parsed.body;
    req.query = parsed.query;
    req.params = parsed.params;
    return next();
  } catch (error) {
    return next(new ApiError(STATUS_CODES.BAD_REQUEST, 'Validation Error', error.errors));
  }
};
