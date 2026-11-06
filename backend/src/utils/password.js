import bcrypt from 'bcryptjs';

// Cost 12: ~250ms/hash, so brute force is expensive. Cost 4 in test env to keep tests fast.
const COST = process.env.NODE_ENV === 'test' ? 4 : 12;

export const hashPassword = async (plain) => {
  if (typeof plain !== 'string' || plain.length < 8) throw new Error('Password must be at least 8 characters');
  return bcrypt.hash(plain, COST);
};

export const comparePassword = (plain, hash) => bcrypt.compare(plain, hash);
