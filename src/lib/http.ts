export const API_BASE = (import.meta.env.VITE_API_BASE as string) || '/api';
type Q = Record<string, string | number | boolean>;

export async function api<T>(path: string, opts: RequestInit & { query?: Q } = {}): Promise<T> {
  const href = `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`.replace(/([^:]\/)\/+/g, '$1');
  const url = new URL(href, window.location.origin);
  if (opts.query) Object.entries(opts.query).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const res = await fetch(url.toString(), {
    method: opts.method ?? 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Accept-Language': 'pt-BR', ...(opts.headers || {}) },
    body: opts.body != null ? (typeof opts.body === 'string' ? opts.body : JSON.stringify(opts.body)) : undefined,
    cache: 'no-store',
    mode: 'cors',
    credentials: 'omit',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }
  if (res.status === 204 || res.status === 205) return undefined as T;
  try { return (await res.json()) as T; } catch { return undefined as T; }
}

