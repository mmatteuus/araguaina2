import { getAuthToken, notifyUnauthorized } from '@/lib/authStore';

export const API_BASE = (import.meta.env.VITE_API_BASE as string) || '/api';
type Q = Record<string, string | number | boolean>;

type ApiOptions = RequestInit & { query?: Q; auth?: boolean };

const isFormData = (body: unknown): body is FormData => typeof FormData !== 'undefined' && body instanceof FormData;

export async function api<T>(path: string, opts: ApiOptions = {}): Promise<T> {
  const href = `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`.replace(/([^:]\/)\/+/g, '$1');
  const url = new URL(href, window.location.origin);
  if (opts.query) Object.entries(opts.query).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const token = opts.auth === false ? null : getAuthToken();

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Accept-Language': 'pt-BR',
  };

  // Merge custom headers preserving caller provided values
  if (opts.headers) {
    const init = opts.headers as HeadersInit;
    if (init instanceof Headers) {
      init.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(init)) {
      init.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      Object.entries(init).forEach(([key, value]) => {
        headers[key] = value as string;
      });
    }
  }

  if (!isFormData(opts.body) && headers['Content-Type'] == null) {
    headers['Content-Type'] = 'application/json';
  }

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const body =
    opts.body == null
      ? undefined
      : typeof opts.body === 'string' || isFormData(opts.body)
        ? opts.body
        : JSON.stringify(opts.body);

  const res = await fetch(url.toString(), {
    ...opts,
    method: opts.method ?? 'GET',
    headers,
    body,
    cache: opts.cache ?? 'no-store',
    mode: opts.mode ?? 'cors',
    credentials: opts.credentials ?? 'omit',
  });

  if ((res.status === 401 || res.status === 403) && token) {
    notifyUnauthorized('unauthorized');
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }
  if (res.status === 204 || res.status === 205) return undefined as T;
  const contentType = res.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return (await res.json()) as T;
  }
  if (contentType.includes('application/pdf')) {
    const blob = await res.blob();
    return blob as unknown as T;
  }
  try {
    return (await res.json()) as T;
  } catch {
    return undefined as T;
  }
}

