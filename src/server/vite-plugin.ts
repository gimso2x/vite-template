import type { Plugin } from 'vite';

/**
 * Vite plugin that forwards /api/* requests to Hono during development.
 * Keeps the SPA dev server (HMR, index.html) completely untouched.
 */
export function honoDevMiddleware(): Plugin {
  return {
    name: 'hono-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api')) {
          return next();
        }

        try {
          // Dynamic import so Vite transforms the TS source
          const mod = await server.ssrLoadModule('/src/server/app.ts');
          const app = mod.default;

          const protocol = req.headers['x-forwarded-proto'] ?? 'http';
          const host = req.headers.host ?? 'localhost';
          const url = new URL(req.url, `${protocol}://${host}`);

          // Build a Web API Request from the Node IncomingMessage
          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
          }

          const body: BodyInit | undefined =
            req.method !== 'GET' && req.method !== 'HEAD'
              ? await new Promise<string>((resolve) => {
                  const chunks: string[] = [];
                  req.setEncoding('utf-8');
                  req.on('data', (chunk: string) => chunks.push(chunk));
                  req.on('end', () => resolve(chunks.join('')));
                })
              : undefined;

          const request = new Request(url.toString(), {
            method: req.method,
            headers,
            body,
          });

          const response: Response = await app.fetch(request);

          res.statusCode = response.status;
          response.headers.forEach((value, key) => {
            res.setHeader(key, value);
          });

          const arrayBuffer = await response.arrayBuffer();
          res.end(Buffer.from(arrayBuffer));
        } catch (err) {
          console.error('[hono-dev-middleware]', err);
          next(err);
        }
      });
    },
  };
}
