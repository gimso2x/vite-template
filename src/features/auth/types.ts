export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export type LoginParams = { email: string; password: string };
export type SignupParams = { email: string; password: string; name: string };
export type AuthResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};
