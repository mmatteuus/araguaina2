type TokenListener = (token: string | null) => void;
type UnauthorizedListener = (reason?: 'expired' | 'unauthorized') => void;

let currentToken: string | null = null;
const tokenListeners = new Set<TokenListener>();
const unauthorizedListeners = new Set<UnauthorizedListener>();

export function getAuthToken(): string | null {
  return currentToken;
}

export function setAuthToken(token: string | null) {
  currentToken = token;
  tokenListeners.forEach(listener => listener(currentToken));
}

export function subscribeToAuthChanges(listener: TokenListener) {
  tokenListeners.add(listener);
  return () => tokenListeners.delete(listener);
}

export function registerUnauthorizedListener(listener: UnauthorizedListener) {
  unauthorizedListeners.add(listener);
  return () => unauthorizedListeners.delete(listener);
}

export function notifyUnauthorized(reason: 'expired' | 'unauthorized' = 'unauthorized') {
  unauthorizedListeners.forEach(listener => listener(reason));
}
