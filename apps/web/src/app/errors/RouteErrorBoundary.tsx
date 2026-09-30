import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router';

import { ErrorFallback } from './ErrorFallback';

export function RouteErrorBoundary() {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  useEffect(() => {
    if (!isRouteErrorResponse(error)) Sentry.captureException(error);
  }, [error]);

  return <ErrorFallback title={isNotFound ? 'Page not found' : undefined} />;
}
