import { api } from '@/lib/http';

export type LoginCredentials = {
  username: string;
  password: string;
  remember?: boolean;
};

export type LoginResponse = {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: {
    id?: string;
    name?: string;
    email?: string;
    roles?: string[] | string;
    cpfCnpj?: string;
  };
};

export async function login(credentials: LoginCredentials) {
  const response = await api<LoginResponse>('/auth', {
    method: 'POST',
    body: credentials,
    auth: false,
  });
  return response;
}

export type Profile = {
  id?: string;
  name?: string;
  email?: string;
  roles?: string[];
  cpfCnpj?: string;
};

export async function fetchProfile() {
  return api<Profile>('/auth/me', { method: 'GET' });
}
