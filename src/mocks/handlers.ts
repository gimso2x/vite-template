import { http, HttpResponse } from 'msw';
import { findUser, createUser, generateToken } from './data/auth';

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
      token: generateToken(),
    });
  }),

  http.post('*/api/v1/auth/signup', async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string; name?: string };

    if (!body?.email || !body?.password || !body?.name) {
      return HttpResponse.json({ message: '모든 필드를 입력하세요' }, { status: 400 });
    }

    const user = createUser(body.email, body.password, body.name);
    return HttpResponse.json({
      user,
      token: generateToken(),
    });
  }),

  http.get('*/api/v1/auth/me', ({ request }) => {
    const auth = request.headers.get('Authorization');
    if (!auth?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({
      user: { id: '1', email: 'user@example.com', name: '테스트 사용자' },
    });
  }),
];
