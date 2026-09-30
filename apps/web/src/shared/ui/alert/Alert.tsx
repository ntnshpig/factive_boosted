import { AlertTitle, Alert as MuiAlert } from '@mui/material';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

import { IconButton } from '@/shared/ui/icon-button';

export type AlertSeverity = 'info' | 'success' | 'warning' | 'error';
export type AlertVariant = 'soft' | 'outlined' | 'filled';

const muiVariant = { soft: 'standard', outlined: 'outlined', filled: 'filled' } as const;

export interface AlertProps {
  severity?: AlertSeverity;
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  /** Extra control on the right, e.g. a "Retry" button. */
  action?: ReactNode;
  /** Shows a close button. */
  onClose?: () => void;
}

export function Alert({
  severity = 'info',
  variant = 'soft',
  title,
  children,
  action,
  onClose,
}: AlertProps) {
  return (
    <MuiAlert
      severity={severity}
      variant={muiVariant[variant]}
      action={
        action || onClose ? (
          <>
            {action}
            {onClose && (
              <IconButton
                icon={X}
                label="Dismiss"
                size="sm"
                showTooltip={false}
                onClick={onClose}
                sx={{ color: 'inherit' }}
              />
            )}
          </>
        ) : undefined
      }
    >
      {title && <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>}
      {children}
    </MuiAlert>
  );
}
