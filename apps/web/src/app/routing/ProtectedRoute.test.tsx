import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';

import { setupStore } from '@/app/model/store';
import { routes } from '@/shared/config';

import { ProtectedRoute } from './ProtectedRoute';

function renderAt(path: string, isAuthenticated: boolean) {
  const store = setupStore({ session: { isAuthenticated } });
  const router = createMemoryRouter(
    [
      { path: routes.login, element: <p>Login page</p> },
      {
        element: <ProtectedRoute />,
        children: [{ path: routes.projects, element: <p>Projects page</p> }],
      },
    ],
    { initialEntries: [path] },
  );

  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
}

describe('ProtectedRoute', () => {
  it('redirects a guest to the login page', () => {
    renderAt(routes.projects, false);

    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Projects page')).not.toBeInTheDocument();
  });

  it('renders the protected page for an authenticated user', () => {
    renderAt(routes.projects, true);

    expect(screen.getByText('Projects page')).toBeInTheDocument();
  });
});
