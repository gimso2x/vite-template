import type { MiddlewareHandler } from 'hono';

/**
 * JWT authentication middleware.
 * Extracts the Bearer token from Authorization header and passes it through.
 * TODO: Add actual JWT verification (e.g. jose / jsonwebtoken).
 */
export function authMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    const authorization = c.req.header('Authorization');

    if (!authorization?.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // TODO: JWT 검증 로직 추가
    // const token = authorization.slice(7);
    // const payload = await verifyJwt(token, SECRET);
    // c.set('user', payload);

    await next();
  };
}
