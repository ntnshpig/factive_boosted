import * as Sentry from '@sentry/react';

import { env } from '@/shared/config';

export function initSentry() {
  if (!env.sentryDsn) return;

  Sentry.init({
    dsn: env.sentryDsn,
    environment: env.mode,
  });
}
