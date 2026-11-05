import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();
const DB_STATES = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

router.get('/', (_req, res) => {
  const dbState = DB_STATES[mongoose.connection.readyState];
  const ok = dbState === 'connected';
  res.status(ok ? 200 : 503).json({
    success: ok,
    status: ok ? 'ok' : 'degraded',
    db: dbState,
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

export default router;
