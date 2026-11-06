import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import { User } from '../../src/models/User.js';
import { Organization } from '../../src/models/Organization.js';
import { connectTestDB, dropTestDB } from '../helpers/db.js';

const payload = (over = {}) => ({
  agencyName: 'Acme Realty',
  name: 'Jane Admin',
  email: 'jane@acme.com',
  password: 'Str0ngPass1',
  country: 'us',
  timezone: 'America/New_York',
  ...over,
});
const post = (body) => request(app).post('/api/auth/register').send(body);

describe('POST /api/auth/register', () => {
  beforeAll(async () => {
    await connectTestDB('auth_register');
    await Promise.all([User.init(), Organization.init()]);
  });
  afterAll(dropTestDB);
  afterEach(async () => {
    vi.restoreAllMocks();
    await Promise.all([User.deleteMany({}), Organization.deleteMany({})]);
  });

  it('creates organization + agency_admin and never returns the password', async () => {
    const res = await post(payload());
    expect(res.status).toBe(201);
    const { user, organization } = res.body.data;
    expect(organization).toMatchObject({ name: 'Acme Realty', slug: 'acme-realty', country: 'US', status: 'active' });
    expect(user).toMatchObject({ email: 'jane@acme.com', role: 'agency_admin', organizationId: organization._id });
    expect(JSON.stringify(res.body)).not.toMatch(/passwordHash|Str0ngPass1|__v/);

    const stored = await User.findByEmailWithPassword('jane@acme.com');
    expect(stored.passwordHash).toMatch(/^\$2[aby]\$/);
    expect(await stored.verifyPassword('Str0ngPass1')).toBe(true);
  });

  it('ignores role / organizationId / status sent in body (mass-assignment)', async () => {
    const res = await post(payload({ role: 'super_admin', status: 'disabled', organizationId: '64b000000000000000000000', emailVerified: true }));
    expect(res.status).toBe(201);
    expect(res.body.data.user).toMatchObject({ role: 'agency_admin', status: 'active', emailVerified: false });
    expect(res.body.data.user.organizationId).toBe(res.body.data.organization._id);
  });

  it('normalises email (trim + lowercase)', async () => {
    const res = await post(payload({ email: '  JANE@Acme.COM ' }));
    expect(res.status).toBe(201);
    expect(res.body.data.user.email).toBe('jane@acme.com');
  });

  describe('validation => 400 with field details', () => {
    it.each([
      ['missing everything', {}, ['agencyName', 'name', 'email', 'password']],
      ['invalid email', payload({ email: 'nope' }), ['email']],
      ['short password', payload({ password: 'a1' }), ['password']],
      ['password without number', payload({ password: 'onlyletters' }), ['password']],
      ['password over 72 chars', payload({ password: 'a1' + 'x'.repeat(80) }), ['password']],
      ['bad country', payload({ country: 'USA' }), ['country']],
      ['bad timezone', payload({ timezone: 'Mars/Base' }), ['timezone']],
    ])('%s', async (_n, body, fields) => {
      const res = await post(body);
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      const got = res.body.details.map((d) => d.field);
      expect(got).toEqual(expect.arrayContaining(fields));
      expect(await User.countDocuments()).toBe(0);
      expect(await Organization.countDocuments()).toBe(0);
    });
  });

  it('duplicate email (any case) => 409 and no extra organization', async () => {
    await post(payload());
    const res = await post(payload({ email: 'JANE@acme.com', agencyName: 'Other Agency' }));
    expect(res.status).toBe(409);
    expect(await Organization.countDocuments()).toBe(1);
  });

  it('same agency name twice => unique slugs', async () => {
    const a = await post(payload());
    const b = await post(payload({ email: 'second@acme.com' }));
    expect(a.status).toBe(201);
    expect(b.status).toBe(201);
    expect(a.body.data.organization.slug).toBe('acme-realty');
    expect(b.body.data.organization.slug).toMatch(/^acme-realty-[0-9a-f]{4}$/);
  });

  it('non-latin agency name falls back to a valid slug', async () => {
    const res = await post(payload({ agencyName: '房产中介' }));
    expect(res.status).toBe(201);
    expect(res.body.data.organization.slug).toBe('agency');
  });

  it('rolls back the organization if user creation fails', async () => {
    vi.spyOn(User, 'create').mockRejectedValueOnce(new Error('boom'));
    const res = await post(payload());
    expect(res.status).toBe(500);
    expect(await Organization.countDocuments()).toBe(0);
  });
});
