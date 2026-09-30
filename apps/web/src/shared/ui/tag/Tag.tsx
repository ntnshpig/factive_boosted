import { Chip } from '@mui/material';
import { Check, type LucideIcon } from 'lucide-react';

import { Icon } from '@/shared/ui/icon';
import { muiColor, type Tone } from '@/shared/ui/theme';

export type TagVariant = 'soft' | 'filled' | 'outlined';

export interface TagProps {
  label: string;
  color?: Tone;
  variant?: TagVariant;
  size?: 'sm' | 'md';
  icon?: LucideIcon;
  /** Shows a remove button. */
  onRemove?: () => void;
  /** Makes the tag a toggle. Use with `selected`. */
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export function Tag({
  label,
  color = 'neutral',
  variant = 'soft',
  size = 'md',
  icon,
  onRemove,
  onClick,
  selected,
  disabled,
}: TagProps) {
  const selectable = selected !== undefined;
  const leadingIcon = selectable && selected ? Check : icon;

  return (
    <Chip
      label={label}
      color={color === 'neutral' ? 'default' : muiColor(color)}
      variant={selectable && selected && variant !== 'filled' ? 'filled' : variant}
      size={size === 'sm' ? 'small' : 'medium'}
      icon={
        leadingIcon ? <Icon icon={leadingIcon} size={size === 'sm' ? 'xs' : 'sm'} /> : undefined
      }
      onDelete={onRemove}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selectable ? selected : undefined}
    />
  );
}
