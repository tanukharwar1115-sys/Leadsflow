import { ApiError } from '../utils/ApiError.js';

// validate(schema) => replaces req.body with the parsed + cleaned data.
export const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const details = result.error.issues.map((i) => ({ field: i.path.join('.'), message: i.message }));
    return next(ApiError.badRequest('Validation failed', details));
  }
  req.body = result.data;
  next();
};
