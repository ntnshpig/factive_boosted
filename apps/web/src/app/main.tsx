import '@fontsource-variable/inter';
import '@fontsource-variable/roboto';
import '@fontsource-variable/fira-code';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { initSentry } from './sentry/initSentry';

initSentry();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
