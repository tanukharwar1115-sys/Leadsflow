import crypto from 'node:crypto';
import { Organization } from '../models/Organization.js';
import { User } from '../models/User.js';
import { ROLES } from '../constants/roles.js';
import { ApiError } from '../utils/ApiError.js';

const slugify = (name) =>
  name.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50) || 'agency';

async function createOrganization({ agencyName, country, timezone }) {
  const base = slugify(agencyName);
  // Try the plain slug first, add a random suffix on collision. The unique index is the final guard (for races).
  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = attempt === 0 ? base : `${base}-${crypto.randomBytes(2).toString('hex')}`;
    try {
      return await Organization.create({ name: agencyName, slug, country, timezone });
    } catch (err) {
      if (err.code !== 11000) throw err;
    }
  }
  throw ApiError.conflict('Could not generate a unique agency URL, please try again');
}

export async function registerAgency({ agencyName, name, email, password, country, timezone }) {
  if (await User.exists({ email })) throw ApiError.conflict('An account with this email already exists');

  const passwordHash = await User.hashPassword(password);
  const organization = await createOrganization({ agencyName, country, timezone });

  try {
    // The server decides the role: the first user is always agency_admin.
    const user = await User.create({ organizationId: organization._id, name, email, passwordHash, role: ROLES.AGENCY_ADMIN });
    return { user, organization };
  } catch (err) {
    // No transactions on a standalone mongod => compensating rollback (an orphan organization must not remain).
    await Organization.deleteOne({ _id: organization._id });
    throw err; // duplicate email race => errorHandler 11000 => 409
  }
}
