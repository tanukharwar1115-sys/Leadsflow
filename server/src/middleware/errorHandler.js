import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

export function notFound(req, _res, next) {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  // Malformed JSON body
  if (err.type === 'entity.parse.failed') err = ApiError.badRequest('Invalid JSON body');
  // Mongoose: bad ObjectId / validation / duplicate key
  if (err.name === 'CastError') err = ApiError.badRequest(`Invalid ${err.path}`);
  if (err.name === 'ValidationError' && err.errors) {
    err = ApiError.badRequest('Validation failed', Object.values(err.errors).map((e) => e.message));
  }
  if (err.code === 11000) err = ApiError.conflict('Duplicate value');

  const statusCode = err.isOperational ? err.statusCode : 500;
  if (statusCode >= 500) req.log?.error({ err }, 'Unhandled error');

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal server error' : err.message,
    ...(err.details && { details: err.details }),
    // Stack sirf development mein
    ...(env.NODE_ENV === 'development' && statusCode === 500 && { stack: err.stack }),
  });
}
