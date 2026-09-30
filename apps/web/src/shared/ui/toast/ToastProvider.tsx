import { Snackbar } from '@mui/material';
import { useCallback, useMemo, useState, type ReactNode } from 'react';

import { Alert } from '@/shared/ui/alert';

import { ToastContext, type ToastApi, type ToastOptions } from './context';

const DEFAULT_DURATION = 5000;

interface QueuedToast extends ToastOptions {
  id: number;
}

let nextId = 0;

/** Shows one toast at a time, bottom-left. Later toasts wait in a queue. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<QueuedToast[]>([]);
  const [open, setOpen] = useState(true);
  const current = queue[0];

  const show = useCallback((options: ToastOptions) => {
    setQueue((items) => [...items, { ...options, id: nextId++ }]);
  }, []);

  const api = useMemo<ToastApi>(
    () => ({
      show,
      success: (message) => {
        show({ message, severity: 'success' });
      },
      error: (message) => {
        show({ message, severity: 'error' });
      },
      info: (message) => {
        show({ message, severity: 'info' });
      },
      warning: (message) => {
        show({ message, severity: 'warning' });
      },
    }),
    [show],
  );

  const close = (_event?: unknown, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  // After the exit animation, drop the toast and let the next one in.
  const handleExited = () => {
    setQueue((items) => items.slice(1));
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Snackbar
        key={current?.id}
        open={Boolean(current) && open}
        autoHideDuration={current?.duration === undefined ? DEFAULT_DURATION : current.duration}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{ transition: { onExited: handleExited } }}
      >
        {current && (
          <div>
            <Alert
              severity={current.severity ?? 'info'}
              variant="filled"
              title={current.title}
              action={current.action}
              onClose={close}
            >
              {current.message}
            </Alert>
          </div>
        )}
      </Snackbar>
    </ToastContext.Provider>
  );
}
