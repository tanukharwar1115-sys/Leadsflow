import * as authService from '../services/auth.service.js';

export async function register(req, res) {
  const { user, organization } = await authService.registerAgency(req.body);
  res.status(201).json({ success: true, data: { user: user.toJSON(), organization: organization.toJSON() } });
}
