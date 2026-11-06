import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { registerLimiter } from '../middleware/rateLimiters.js';
import { registerSchema } from '../validators/auth.validator.js';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerLimiter, validate(registerSchema), authController.register);

export default router;
