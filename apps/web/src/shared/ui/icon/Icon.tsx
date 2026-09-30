import type { LucideIcon } from 'lucide-react';

import { iconSize, type IconSize } from '@/shared/ui/theme';

export interface IconProps {
  icon: LucideIcon;
  size?: IconSize;
  /** Accessible name. Without it the icon is decorative and hidden from screen readers. */
  label?: string;
  className?: string;
}

/** Lucide icon on the design size scale. Takes the color of the surrounding text. */
export function Icon({ icon: IconComponent, size = 'md', label, className }: IconProps) {
  return (
    <IconComponent
      size={iconSize[size]}
      strokeWidth={2}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      focusable={false}
    />
  );
}
