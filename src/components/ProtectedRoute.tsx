import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectPath?: string;
  fallback?: React.ReactNode;
};

export function ProtectedRoute({ children, requireAuth = true, redirectPath = '/login', fallback }: ProtectedRouteProps) {
  const { isAuthenticated, initialized } = useAuth();
  const location = useLocation();

  if (!requireAuth) {
    return <>{children}</>;
  }

  if (!initialized) {
    return fallback ?? (
      <div className="flex items-center justify-center py-20 text-sm text-muted-foreground">
        Carregando…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
