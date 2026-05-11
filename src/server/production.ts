import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import app from './app.ts';
import { ogInjector } from './middleware/og-injector.ts';

const distPath = resolve(import.meta.dirname ?? '.', '../../dist');
const indexHtml = readFileSync(resolve(distPath, 'index.html'), 'utf-8');

// Static assets (JS, CSS, images, fonts)
app.use('/assets/*', serveStatic({ root: distPath }));
app.use('/favicon.svg', serveStatic({ root: distPath, path: '/favicon.svg' }));

// SPA fallback: OG injection for crawlers, plain HTML for everyone else
app.get('*', ogInjector(indexHtml), (c) => c.html(indexHtml));

const port = Number(process.env.PORT ?? 3000);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Server running on http://localhost:${info.port}`);
});
