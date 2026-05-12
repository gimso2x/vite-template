import type { AuthUser } from '@/store';

const users: Array<AuthUser & { password: string }> = [
  { id: '1', email: 'user@example.com', name: '테스트 사용자', password: 'password123' },
];

let nextId = 2;
const refreshTokens = new Map<string, string>();

export function findUser(email: string, password: string): (AuthUser & { password: string }) | undefined {
  return users.find((u) => u.email === email && u.password === password);
}

export function createUser(email: string, password: string, name: string): AuthUser {
  const user: AuthUser & { password: string } = {
    id: String(nextId++),
    email,
    name,
    password,
  };
  users.push(user);
  return { id: user.id, email: user.email, name: user.name };
}

export function findUserById(id: string): AuthUser | undefined {
  return users.find((u) => u.id === id);
}

export function generateAccessToken(): string {
  return `access-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function generateRefreshToken(userId: string): string {
  const token = `refresh-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  refreshTokens.set(token, userId);
  return token;
}

export function validateRefreshToken(token: string): string | null {
  return refreshTokens.get(token) ?? null;
}

export function revokeRefreshToken(token: string): void {
  refreshTokens.delete(token);
}
