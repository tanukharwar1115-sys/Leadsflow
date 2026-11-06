import mongoose from 'mongoose';
import { ORG_STATUS } from '../constants/status.js';

// Organization = tenant (one agency/business). All tenant data (users, leads, ...) is isolated by its _id.
const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Organization name is required'], trim: true, minlength: 2, maxlength: 100 },
    // URL-safe unique identifier (e.g. "acme-realty"). Generate service layer (2.2) karegi.
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 2,
      maxlength: 60,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers and hyphens'],
    },
    status: { type: String, enum: Object.values(ORG_STATUS), default: ORG_STATUS.ACTIVE },
    // USA/UK/international: ISO-3166 alpha-2 country and IANA timezone (used by appointments/analytics)
    country: { type: String, uppercase: true, trim: true, match: [/^[A-Z]{2}$/, 'Country must be ISO 3166-1 alpha-2'] },
    timezone: { type: String, trim: true, default: 'UTC' },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  },
);

// The unique slug index comes from field-level `unique: true`. Index for the Super Admin list filter:
organizationSchema.index({ status: 1, createdAt: -1 });

export const Organization = mongoose.model('Organization', organizationSchema);
