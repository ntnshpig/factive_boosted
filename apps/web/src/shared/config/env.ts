const apiUrl = import.meta.env.VITE_API_URL;
const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

if (!apiUrl) {
  throw new Error('VITE_API_URL is not set. Copy apps/web/.env.example to apps/web/.env.');
}

export const env = {
  apiUrl,
  // An empty value in .env means "Sentry disabled".
  sentryDsn: sentryDsn === '' ? undefined : sentryDsn,
  mode: import.meta.env.MODE,
} as const;
