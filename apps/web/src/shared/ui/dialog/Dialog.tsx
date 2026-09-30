import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog as MuiDialog,
} from '@mui/material';
import { X } from 'lucide-react';
import { useId, type ReactNode } from 'react';

import { IconButton } from '@/shared/ui/icon-button';

export type DialogSize = 'sm' | 'md' | 'lg';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  /** Buttons in the footer. */
  actions?: ReactNode;
  size?: DialogSize;
  /** Shows the close button in the header. */
  closable?: boolean;
  /** Blocks closing by backdrop click and Escape, e.g. while saving. */
  persistent?: boolean;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  size = 'sm',
  closable = true,
  persistent = false,
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <MuiDialog
      open={open}
      onClose={persistent ? undefined : onClose}
      maxWidth={size}
      fullWidth
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
    >
      <DialogTitle id={titleId} sx={{ pr: closable ? 7 : 3 }}>
        {title}
      </DialogTitle>
      {closable && (
        <IconButton
          icon={X}
          label="Close"
          size="sm"
          showTooltip={false}
          onClick={onClose}
          disabled={persistent}
          sx={{ position: 'absolute', top: 12, right: 12 }}
        />
      )}
      {(description ?? children) && (
        <DialogContent>
          {description && (
            <DialogContentText id={descriptionId} sx={{ mb: children ? 2 : 0 }}>
              {description}
            </DialogContentText>
          )}
          {children}
        </DialogContent>
      )}
      {actions && <DialogActions sx={{ px: 3, pb: 2 }}>{actions}</DialogActions>}
    </MuiDialog>
  );
}
