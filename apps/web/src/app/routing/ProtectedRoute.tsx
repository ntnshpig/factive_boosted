import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

import { selectIsAuthenticated } from '@/entities/session';
import { routes } from '@/shared/config';

export function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) return <Navigate to={routes.login} replace />;

  return <Outlet />;
}
