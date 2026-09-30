import { Box, Stack, Typography } from '@mui/material';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { Icon } from '@/shared/ui/icon';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  /** Usually a Button that fixes the empty state, e.g. "Upload media". */
  action?: ReactNode;
  /** `sm` for panels and table bodies, `md` for whole pages. */
  size?: 'sm' | 'md';
}

export function EmptyState({ title, description, icon, action, size = 'md' }: EmptyStateProps) {
  const small = size === 'sm';

  return (
    <Stack
      spacing={small ? 1 : 1.5}
      sx={{ alignItems: 'center', textAlign: 'center', py: small ? 3 : 6, px: 2 }}
    >
      {icon && (
        <Box
          sx={{
            display: 'grid',
            placeItems: 'center',
            width: small ? 40 : 56,
            height: small ? 40 : 56,
            borderRadius: '50%',
            bgcolor: 'grey.100',
            color: 'text.secondary',
          }}
        >
          <Icon icon={icon} size={small ? 'md' : 'lg'} />
        </Box>
      )}
      <Typography variant={small ? 'h4' : 'h3'} component="p">
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
          {description}
        </Typography>
      )}
      {action && <Box sx={{ pt: 1 }}>{action}</Box>}
    </Stack>
  );
}
