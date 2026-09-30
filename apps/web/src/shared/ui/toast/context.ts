import { createContext, type ReactNode } from 'react';

import type { AlertSeverity } from '@/shared/ui/alert';

export interface ToastOptions {
  message: string;
  severity?: AlertSeverity;
  title?: string;
  /** For example an "Undo" button. */
  action?: ReactNode;
  /** Milliseconds before auto-hide. `null` keeps the toast until closed. */
  duration?: number | null;
}

export interface ToastApi {
  show: (options: ToastOptions) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

export const ToastContext = createContext<ToastApi | null>(null);
