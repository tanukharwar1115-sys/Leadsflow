import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Organization } from '../../src/models/Organization.js';
import { connectTestDB, dropTestDB } from '../helpers/db.js';

const valid = (over = {}) => ({ name: 'Acme Realty', slug: 'acme-realty', country: 'us', ...over });

describe('Organization model', () => {
  beforeAll(async () => {
    await connectTestDB('org');
    await Organization.init(); // let indexes build (needed for the unique test)
  });
  afterAll(dropTestDB);

  it('creates with defaults and normalises fields', async () => {
    const org = await Organization.create(valid());
    expect(org.status).toBe('active');
    expect(org.timezone).toBe('UTC');
    expect(org.country).toBe('US'); // uppercase
    expect(org.createdAt).toBeInstanceOf(Date);
    expect(org.updatedAt).toBeInstanceOf(Date);
  });

  it('requires name and slug', async () => {
    const err = await new Organization({}).validate().catch((e) => e);
    expect(Object.keys(err.errors)).toEqual(expect.arrayContaining(['name', 'slug']));
  });

  it.each(['Bad Slug', 'under_score', '-lead', 'trail-', 'a--b'])('rejects invalid slug %s', async (slug) => {
    const err = await new Organization(valid({ slug })).validate().catch((e) => e);
    expect(err.errors.slug).toBeDefined();
  });

  it('rejects invalid status and country', async () => {
    const err = await new Organization(valid({ status: 'deleted', country: 'USA' })).validate().catch((e) => e);
    expect(err.errors.status).toBeDefined();
    expect(err.errors.country).toBeDefined();
  });

  it('enforces unique slug at DB level', async () => {
    await Organization.create(valid({ slug: 'dup-slug' }));
    await expect(Organization.create(valid({ slug: 'dup-slug' }))).rejects.toMatchObject({ code: 11000 });
  });

  it('declares expected indexes', async () => {
    const keys = (await Organization.collection.indexes()).map((i) => JSON.stringify(i.key));
    expect(keys).toContain(JSON.stringify({ slug: 1 }));
    expect(keys).toContain(JSON.stringify({ status: 1, createdAt: -1 }));
  });
});
