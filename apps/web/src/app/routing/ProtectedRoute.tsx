import { Navigate, Outlet } from 'react-router';

import { selectIsAuthenticated } from '@/entities/session';
import { routes } from '@/shared/config';
import { useAppSelector } from '@/shared/lib/redux';

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) return <Navigate to={routes.login} replace />;

  return <Outlet />;
}
