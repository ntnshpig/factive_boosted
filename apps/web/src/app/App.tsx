import { CssBaseline, ThemeProvider } from '@mui/material';
import * as Sentry from '@sentry/react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { theme } from '@/shared/ui/theme';
import { ToastProvider } from '@/shared/ui/toast';

import { ErrorFallback } from './errors/ErrorFallback';
import { setupStore } from './model/store';
import { router } from './routing/router';

const store = setupStore();

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
        <Provider store={store}>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </Provider>
      </Sentry.ErrorBoundary>
    </ThemeProvider>
  );
}
