import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { login as loginService, fetchProfile, type LoginCredentials, type LoginResponse, type Profile } from '@/services/auth';
import { decodeJwt, type JwtPayload } from '@/lib/jwt';
import { setAuthToken, registerUnauthorizedListener } from '@/lib/authStore';

type LogoutReason = 'manual' | 'expired' | 'unauthorized';

export type AuthUser = {
  id?: string;
  name?: string;
  email?: string;
  roles?: string[];
  cpfCnpj?: string;
  raw?: Record<string, unknown>;
};

type StoredAuth = {
  token: string;
  expiresAt: number | null;
  user: AuthUser | null;
  remember?: boolean;
};

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  initialized: boolean;
  isLoggingIn: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: (reason?: LogoutReason) => void;
};

const AUTH_STORAGE_KEY = 'araguaina:auth';

export const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

const deriveUserFromPayload = (payload: JwtPayload | null | undefined): AuthUser | null => {
  if (!payload) return null;
  const roles =
    payload.roles == null
      ? undefined
      : Array.isArray(payload.roles)
        ? payload.roles.map(role => String(role))
        : String(payload.roles)
            .split(',')
            .map(role => role.trim())
            .filter(Boolean);
  const given = (payload.given_name ?? payload.name ?? '') as string;
  const family = (payload.family_name ?? '') as string;
  const composedName = `${given ?? ''} ${family ?? ''}`.trim();
  const name = payload.name ?? (composedName || undefined);
  const cpfCnpj =
    typeof (payload as Record<string, unknown>).cpfCnpj === 'string'
      ? (payload as Record<string, unknown>).cpfCnpj
      : typeof (payload as Record<string, unknown>).cpf === 'string'
        ? (payload as Record<string, unknown>).cpf
        : undefined;

  return {
    id: typeof payload.sub === 'string' ? payload.sub : undefined,
    name: typeof name === 'string' ? name : undefined,
    email: typeof payload.email === 'string' ? payload.email : undefined,
    roles,
    cpfCnpj,
    raw: payload as Record<string, unknown>,
  };
};

const mapProfileToUser = (profile?: Profile | null): AuthUser | null => {
  if (!profile) return null;
  const roles = Array.isArray(profile.roles)
    ? profile.roles
    : typeof profile.roles === 'string'
      ? profile.roles.split(',').map(role => role.trim()).filter(Boolean)
      : undefined;
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    roles,
    cpfCnpj: profile.cpfCnpj,
  };
};

const mergeUsers = (...users: Array<AuthUser | null | undefined>): AuthUser | null => {
  const valid = users.filter(Boolean) as AuthUser[];
  if (!valid.length) return null;
  const base: AuthUser = { ...valid[0] };
  for (const next of valid.slice(1)) {
    base.id ??= next.id;
    base.name ??= next.name;
    base.email ??= next.email;
    base.cpfCnpj ??= next.cpfCnpj;
    if (next.raw) base.raw = { ...(base.raw ?? {}), ...next.raw };
    if (next.roles?.length) {
      base.roles = Array.from(new Set([...(base.roles ?? []), ...next.roles]));
    }
  }
  return base;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [expiresAt, setExpiresAt] = React.useState<number | null>(null);
  const [initialized, setInitialized] = React.useState(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const storageTypeRef = React.useRef<'local' | 'session'>('local');
  const logoutTimerRef = React.useRef<number>();

  const clearLogoutTimer = React.useCallback(() => {
    if (logoutTimerRef.current !== undefined) {
      window.clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = undefined;
    }
  }, []);

  const logout = React.useCallback(
    (reason: LogoutReason = 'manual') => {
      clearLogoutTimer();
      setToken(null);
      setUser(null);
      setExpiresAt(null);
      setAuthToken(null);
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(AUTH_STORAGE_KEY);
          window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch {
        /* ignore storage errors */
      }
      queryClient.clear();
      if (reason === 'expired') {
        toast({ title: 'Sessão expirada', description: 'Faça login novamente para continuar.' });
      } else if (reason === 'unauthorized') {
        toast({ title: 'Sessão encerrada', description: 'Seu acesso foi revogado. Entre novamente.' });
      }
    },
    [clearLogoutTimer, queryClient, toast]
  );

  const scheduleLogout = React.useCallback(
    (target: number | null) => {
      clearLogoutTimer();
      if (!target) return;
      const msUntilExpiry = target - Date.now();
      if (msUntilExpiry <= 0) {
        logout('expired');
        return;
      }
      const timeout = Math.max(msUntilExpiry - 60_000, 0); // renew/logout 1 min before
      logoutTimerRef.current = window.setTimeout(() => logout('expired'), timeout);
    },
    [clearLogoutTimer, logout]
  );

  const persistAuthState = React.useCallback(
    (nextToken: string, nextExpiresAt: number | null, nextUser: AuthUser | null, remember?: boolean) => {
      if (typeof window === 'undefined') return;
      const effectiveRemember = remember ?? (storageTypeRef.current === 'local');
      storageTypeRef.current = effectiveRemember ? 'local' : 'session';
      const payload: StoredAuth = {
        token: nextToken,
        expiresAt: nextExpiresAt,
        user: nextUser,
        remember: effectiveRemember,
      };
      try {
        const primary = effectiveRemember ? window.localStorage : window.sessionStorage;
        const backup = effectiveRemember ? window.sessionStorage : window.localStorage;
        primary.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
        backup.removeItem(AUTH_STORAGE_KEY);
      } catch {
        /* ignore storage write errors */
      }
    },
    []
  );

  const handleLoginSuccess = React.useCallback(
    (loginResult: LoginResponse, remember: boolean) => {
      const resultToken = loginResult.accessToken ?? loginResult.token;
      if (!resultToken) {
        throw new Error('Token não recebido na resposta de autenticação.');
      }
      setAuthToken(resultToken);
      setToken(resultToken);
      const payload = decodeJwt(resultToken);

      const inferredExpiresAt =
        payload?.exp != null ? payload.exp * 1000 : loginResult.expiresIn ? Date.now() + loginResult.expiresIn * 1000 : null;
      setExpiresAt(inferredExpiresAt);

      const payloadUser = deriveUserFromPayload(payload);
      const responseUser = loginResult.user
        ? mergeUsers({
            ...loginResult.user,
            roles: Array.isArray(loginResult.user.roles)
              ? loginResult.user.roles
              : typeof loginResult.user.roles === 'string'
                ? loginResult.user.roles.split(',').map(role => role.trim()).filter(Boolean)
                : undefined,
          } as AuthUser)
        : null;
      const resolvedUser = mergeUsers(payloadUser, responseUser);

      setUser(resolvedUser);
      scheduleLogout(inferredExpiresAt);
      persistAuthState(resultToken, inferredExpiresAt, resolvedUser, remember);

      return { payload, resolvedUser, token: resultToken, expiresAt: inferredExpiresAt, remember };
    },
    [persistAuthState, scheduleLogout]
  );

  const login = React.useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoggingIn(true);
      try {
        const response = await loginService(credentials);
        const rememberFlag = credentials.remember !== false;
        const {
          payload,
          resolvedUser,
          token: activeToken,
          expiresAt: activeExpiresAt,
        } = handleLoginSuccess(response, rememberFlag);

        if (!response.user) {
          try {
            const profile = await fetchProfile();
            const profileUser = mapProfileToUser(profile);
            const merged = mergeUsers(resolvedUser, profileUser, deriveUserFromPayload(payload));
            setUser(merged);
            persistAuthState(activeToken, activeExpiresAt ?? null, merged);
          } catch {
            /* profile fetch is optional */
          }
        }
        return response;
      } catch (error) {
        setAuthToken(null);
        throw error;
      } finally {
        setIsLoggingIn(false);
      }
    },
    [handleLoginSuccess, persistAuthState]
  );

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      setInitialized(true);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const storages: Array<{ storage: Storage; type: 'local' | 'session' }> = [
          { storage: window.localStorage, type: 'local' },
          { storage: window.sessionStorage, type: 'session' },
        ];
        let parsed: StoredAuth | null = null;
        let storageType: 'local' | 'session' = 'local';
        for (const { storage, type } of storages) {
          const raw = storage.getItem(AUTH_STORAGE_KEY);
          if (!raw) continue;
          try {
            parsed = JSON.parse(raw) as StoredAuth;
            storageType = type;
            break;
          } catch {
            storage.removeItem(AUTH_STORAGE_KEY);
          }
        }
        if (!parsed?.token) return;
        const payload = decodeJwt(parsed.token);
        const exp = payload?.exp != null ? payload.exp * 1000 : parsed.expiresAt;
        if (exp && exp <= Date.now()) {
          window.localStorage.removeItem(AUTH_STORAGE_KEY);
          window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
          return;
        }
        const remember = parsed.remember ?? storageType === 'local';
        storageTypeRef.current = remember ? 'local' : 'session';
        if (cancelled) return;
        setAuthToken(parsed.token);
        setToken(parsed.token);
        const initialUser = mergeUsers(parsed.user, deriveUserFromPayload(payload));
        setUser(initialUser);
        setExpiresAt(exp ?? null);
        scheduleLogout(exp ?? null);

        if (!parsed.user) {
          try {
            const profile = await fetchProfile();
            if (!cancelled) {
              const profileUser = mapProfileToUser(profile);
              const merged = mergeUsers(initialUser, profileUser, deriveUserFromPayload(payload));
              setUser(merged);
              persistAuthState(parsed.token, exp ?? null, merged, remember);
            }
          } catch {
            /* ignore profile load errors */
          }
        }
      } catch {
        try {
          window.localStorage.removeItem(AUTH_STORAGE_KEY);
          window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
        } catch {
          /* ignore storage errors */
        }
      } finally {
        if (!cancelled) setInitialized(true);
      }
    })();
    return () => {
      cancelled = true;
      clearLogoutTimer();
    };
  }, [clearLogoutTimer, persistAuthState, scheduleLogout]);

  React.useEffect(() => {
    return registerUnauthorizedListener(reason => logout(reason ?? 'unauthorized'));
  }, [logout]);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      expiresAt,
      isAuthenticated: Boolean(token),
      initialized,
      isLoggingIn,
      login,
      logout,
    }),
    [token, user, expiresAt, initialized, isLoggingIn, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
