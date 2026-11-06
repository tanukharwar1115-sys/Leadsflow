import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiters.js';

const app = express();

app.disable('x-powered-by');
app.use(pinoHttp({ logger }));
app.use(helmet());
// credentials:true => HTTP-only cookies work cross-origin (Vite dev); origins are whitelisted, never '*'.
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use('/api', apiLimiter);

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
