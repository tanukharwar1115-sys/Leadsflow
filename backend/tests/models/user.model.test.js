import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { User } from '../../src/models/User.js';
import { hashPassword } from '../../src/utils/password.js';
import { connectTestDB, dropTestDB } from '../helpers/db.js';

const orgId = new mongoose.Types.ObjectId();
let hash;
const valid = (over = {}) => ({
  organizationId: orgId,
  name: 'Jane Agent',
  email: 'jane@acme.com',
  passwordHash: hash,
  ...over,
});

describe('User model', () => {
  beforeAll(async () => {
    await connectTestDB('user');
    await User.init();
    hash = await hashPassword('Str0ngPass!');
  });
  afterAll(dropTestDB);

  describe('password handling', () => {
    it('hash is bcrypt, never the plain password', () => {
      expect(hash).not.toContain('Str0ngPass!');
      expect(hash).toMatch(/^\$2[aby]\$/);
    });

    it('rejects too-short passwords', async () => {
      await expect(hashPassword('short')).rejects.toThrow(/at least 8/);
    });

    it('passwordHash is excluded from queries and JSON by default', async () => {
      await User.create(valid({ email: 'hidden@acme.com' }));
      const found = await User.findOne({ email: 'hidden@acme.com' });
      expect(found.passwordHash).toBeUndefined();
      const withPw = await User.findByEmailWithPassword(' HIDDEN@acme.com ');
      expect(withPw.passwordHash).toBeDefined();
      expect(withPw.toJSON().passwordHash).toBeUndefined();
      expect(withPw.toJSON().__v).toBeUndefined();
    });

    it('verifyPassword accepts right and rejects wrong password', async () => {
      const u = await User.findByEmailWithPassword('hidden@acme.com');
      expect(await u.verifyPassword('Str0ngPass!')).toBe(true);
      expect(await u.verifyPassword('wrong-pass')).toBe(false);
    });

    it('verifyPassword throws if hash was not selected', async () => {
      const u = await User.findOne({ email: 'hidden@acme.com' });
      expect(() => u.verifyPassword('x')).toThrow(/not loaded/);
    });
  });

  describe('validation', () => {
    it('creates with defaults and normalised email', async () => {
      const u = await User.create(valid({ email: '  Mixed@Acme.COM ' }));
      expect(u.email).toBe('mixed@acme.com');
      expect(u.role).toBe('agent');
      expect(u.status).toBe('active');
      expect(u.emailVerified).toBe(false);
      expect(u.createdAt).toBeInstanceOf(Date);
    });

    it('requires name, email, passwordHash', async () => {
      const err = await new User({ organizationId: orgId }).validate().catch((e) => e);
      expect(Object.keys(err.errors)).toEqual(expect.arrayContaining(['name', 'email', 'passwordHash']));
    });

    it('rejects invalid email, role, status', async () => {
      const err = await new User(valid({ email: 'nope', role: 'owner', status: 'gone' })).validate().catch((e) => e);
      expect(err.errors.email).toBeDefined();
      expect(err.errors.role).toBeDefined();
      expect(err.errors.status).toBeDefined();
    });
  });

  describe('tenant rules', () => {
    it('agent / agency_admin require organizationId', async () => {
      for (const role of ['agent', 'agency_admin']) {
        const err = await new User(valid({ role, organizationId: undefined })).validate().catch((e) => e);
        expect(err.errors.organizationId).toBeDefined();
      }
    });

    it('super_admin must NOT have organizationId', async () => {
      const err = await new User(valid({ role: 'super_admin' })).validate().catch((e) => e);
      expect(err.errors.organizationId).toBeDefined();
    });

    it('super_admin without organization is valid', async () => {
      const u = await User.create(valid({ role: 'super_admin', organizationId: undefined, email: 'root@technowib.com' }));
      expect(u.organizationId).toBeNull();
    });
  });

  describe('indexes', () => {
    it('email is globally unique (even across organizations)', async () => {
      await User.create(valid({ email: 'dup@acme.com' }));
      const other = new mongoose.Types.ObjectId();
      await expect(User.create(valid({ email: 'DUP@acme.com', organizationId: other }))).rejects.toMatchObject({ code: 11000 });
    });

    it('declares tenant-scoped indexes', async () => {
      const keys = (await User.collection.indexes()).map((i) => JSON.stringify(i.key));
      expect(keys).toContain(JSON.stringify({ email: 1 }));
      expect(keys).toContain(JSON.stringify({ organizationId: 1, role: 1 }));
      expect(keys).toContain(JSON.stringify({ organizationId: 1, status: 1 }));
    });
  });
});
