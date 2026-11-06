import mongoose from 'mongoose';
import { ROLES, ROLE_VALUES } from '../constants/roles.js';
import { USER_STATUS } from '../constants/status.js';
import { comparePassword, hashPassword } from '../utils/password.js';

const userSchema = new mongoose.Schema(
  {
    // null for super admin; required for all other roles (see validator below).
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', default: null },
    name: { type: String, required: [true, 'Name is required'], trim: true, minlength: 2, maxlength: 100 },
    // Globally unique: login is by email only. Multi-agency membership will use a Membership collection later.
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email'],
    },
    // The plain password is never stored. select:false => excluded from queries by default.
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLE_VALUES, required: true, default: ROLES.AGENT },
    status: { type: String, enum: Object.values(USER_STATUS), default: USER_STATUS.ACTIVE },
    emailVerified: { type: Boolean, default: false },
    lastLoginAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Tenant rule: super_admin => no org; agency_admin/agent => org mandatory.
userSchema.pre('validate', function enforceTenantRule() {
  if (this.role === ROLES.SUPER_ADMIN && this.organizationId) {
    this.invalidate('organizationId', 'Super admin cannot belong to an organization');
  }
  if (this.role !== ROLES.SUPER_ADMIN && !this.organizationId) {
    this.invalidate('organizationId', 'organizationId is required for this role');
  }
});

// Tenant-scoped queries: "agents of this org", "active users of this org".
userSchema.index({ organizationId: 1, role: 1 });
userSchema.index({ organizationId: 1, status: 1 });

userSchema.statics.hashPassword = hashPassword;

// passwordHash is select:false, so it must be selected explicitly.
userSchema.statics.findByEmailWithPassword = function (email) {
  return this.findOne({ email: String(email).toLowerCase().trim() }).select('+passwordHash');
};

userSchema.methods.verifyPassword = function (plain) {
  if (!this.passwordHash) throw new Error('passwordHash not loaded; use findByEmailWithPassword');
  return comparePassword(plain, this.passwordHash);
};

export const User = mongoose.model('User', userSchema);
