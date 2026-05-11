import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { healthRoute } from './routes/health';
import { proxyRoutes } from './routes/proxy';
import { authMiddleware } from './middleware/auth';

const app = new Hono();

// --- common middleware ---
app.use('*', logger());

// --- health check (no auth) ---
app.route('/api/health', healthRoute);

// --- authenticated API proxy ---
app.use('/api/*', cors());
app.use('/api/*', authMiddleware());
app.route('/api', proxyRoutes);

export default app;
