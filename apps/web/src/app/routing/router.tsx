import { createBrowserRouter, Navigate } from 'react-router';

import { LoginPage } from '@/pages/login';
import { ProjectsPage } from '@/pages/projects';
import { RegisterPage } from '@/pages/register';
import { routes } from '@/shared/config';

import { RouteErrorBoundary } from '../errors/RouteErrorBoundary';
import { AppLayout } from '../layout/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <Navigate to={routes.projects} replace /> },
      // Public routes.
      { path: routes.login, element: <LoginPage /> },
      { path: routes.register, element: <RegisterPage /> },
      // Protected routes.
      {
        element: <ProtectedRoute />,
        children: [{ path: routes.projects, element: <ProjectsPage /> }],
      },
    ],
  },
]);
