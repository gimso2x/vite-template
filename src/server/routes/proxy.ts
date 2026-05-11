import { Hono } from 'hono';

const INT_API = process.env.INT_API_URL ?? 'http://localhost:8080';
const INT_API2 = process.env.INT_API2_URL ?? 'http://localhost:8081';

/**
 * Forward the incoming request to the target, preserving method/headers/body.
 */
async function forwardRequest(c: { req: { method: string; raw: Request } }, targetUrl: string): Promise<Response> {
  const res = await fetch(targetUrl, {
    method: c.req.method,
    headers: c.req.raw.headers,
    body: c.req.method !== 'GET' && c.req.method !== 'HEAD' ? c.req.raw.body : undefined,
    // @ts-expect-error -- Node 22 supports duplex but TS lib hasn't caught up
    duplex: 'half',
  });

  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

const app = new Hono();

// int-api proxy: /api/v1/** → INT_API/**
app.all('/v1/*', (c) => {
  const path = c.req.path.replace('/api/v1', '');
  return forwardRequest(c, `${INT_API}${path}`);
});

// int-api2 proxy: /api/v2/** → INT_API2/**
app.all('/v2/*', (c) => {
  const path = c.req.path.replace('/api/v2', '');
  return forwardRequest(c, `${INT_API2}${path}`);
});

export { app as proxyRoutes };
