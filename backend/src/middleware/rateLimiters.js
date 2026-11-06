import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

const base = { standardHeaders: true, legacyHeaders: false };

// Saare /api routes par general limit.
export const apiLimiter = rateLimit({ ...base, windowMs: 15 * 60 * 1000, limit: 300 });

// Strict limit against signup spam (disabled in test env to avoid flaky tests).
export const registerLimiter = rateLimit({
  ...base,
  windowMs: 60 * 60 * 1000,
  limit: 20,
  skip: () => env.NODE_ENV === 'test',
  message: { success: false, message: 'Too many signup attempts, try again later' },
});
