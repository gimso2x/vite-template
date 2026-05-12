import { http, HttpResponse } from 'msw';
import {
  findUser,
  createUser,
  findUserById,
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
  revokeRefreshToken,
} from './data/auth';

function extractBearerToken(request: Request): string | null {
  const auth = request.headers.get('Authorization');
  return auth?.startsWith('Bearer ') ? auth.slice(7) : null;
}

const accessTokenToUser = new Map<string, string>();

function issueTokenPair(userId: string) {
  const accessToken = generateAccessToken();
  const refreshToken = generateRefreshToken(userId);
  accessTokenToUser.set(accessToken, userId);
  return { accessToken, refreshToken };
}

function resolveUserByAccessToken(token: string) {
  const userId = accessTokenToUser.get(token);
  return userId ? findUserById(userId) : undefined;
}

export const handlers = [
  http.post('*/api/v1/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string };

    if (!body?.email || !body?.password) {
      return HttpResponse.json({ message: '이메일과 비밀번호를 입력하세요' }, { status: 400 });
    }

    const user = findUser(body.email, body.password);
    if (!user) {
      return HttpResponse.json({ message: '이메일 또는 비밀번호가 올바르지 않습니다' }, { status: 401 });
    }

    return HttpResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
      ...issueTokenPair(user.id),
    });
  }),

  http.post('*/api/v1/auth/signup', async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string; name?: string };

    if (!body?.email || !body?.password || !body?.name) {
      return HttpResponse.json({ message: '모든 필드를 입력하세요' }, { status: 400 });
    }

    const user = createUser(body.email, body.password, body.name);
    return HttpResponse.json({ user, ...issueTokenPair(user.id) });
  }),

  http.post('*/api/v1/auth/refresh', async ({ request }) => {
    const body = (await request.json()) as { refreshToken?: string };

    if (!body?.refreshToken) {
      return HttpResponse.json({ message: 'Refresh token is required' }, { status: 400 });
    }

    const userId = validateRefreshToken(body.refreshToken);
    if (!userId) {
      return HttpResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
    }

    return HttpResponse.json(issueTokenPair(userId));
  }),

  http.post('*/api/v1/auth/logout', async ({ request }) => {
    const body = (await request.json()) as { refreshToken?: string };
    if (body?.refreshToken) {
      revokeRefreshToken(body.refreshToken);
    }
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('*/api/v1/auth/me', ({ request }) => {
    const token = extractBearerToken(request);
    if (!token) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = resolveUserByAccessToken(token);
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({ user: { id: user.id, email: user.email, name: user.name } });
  }),
];
