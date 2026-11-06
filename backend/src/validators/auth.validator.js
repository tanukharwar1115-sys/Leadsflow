import { z } from 'zod';

const validTimezone = (tz) => {
  try { new Intl.DateTimeFormat('en', { timeZone: tz }); return true } catch { return false }
};

// bcrypt only uses the first 72 bytes => max 72, otherwise the password is silently truncated.
const password = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password must be at most 72 characters')
  .regex(/[A-Za-z]/, 'Password must contain a letter')
  .regex(/\d/, 'Password must contain a number');

// z.object strips unknown keys => role/organizationId/status can never come from the request body.
export const registerSchema = z.object({
  agencyName: z.string().trim().min(2, 'Agency name is too short').max(100),
  name: z.string().trim().min(2, 'Name is too short').max(100),
  email: z.string().trim().toLowerCase().pipe(z.email('Invalid email')).pipe(z.string().max(254)),
  password,
  country: z.string().trim().regex(/^[A-Za-z]{2}$/, 'Use 2-letter country code').optional(),
  timezone: z.string().trim().refine(validTimezone, 'Invalid timezone').optional(),
});
