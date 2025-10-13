export type JwtPayload = {
  exp?: number;
  name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  sub?: string;
  roles?: string[] | string;
  [key: string]: unknown;
};

function base64UrlDecode(segment: string): string {
  const normalized = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  const decode =
    typeof globalThis.atob === 'function'
      ? globalThis.atob
      : (input: string) => {
          if (typeof Buffer !== 'undefined') {
            return Buffer.from(input, 'base64').toString('binary');
          }
          throw new Error('No base64 decoder available');
        };

  const binary = decode(padded);
  try {
    // Handle UTF-8 payloads
    return decodeURIComponent(
      binary
        .split('')
        .map(char => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join('')
    );
  } catch {
    return binary;
  }
}

export function decodeJwt<T extends JwtPayload = JwtPayload>(token: string): T | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload) as T;
  } catch {
    return null;
  }
}
