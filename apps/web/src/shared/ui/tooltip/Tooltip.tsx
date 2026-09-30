import { Tooltip as MuiTooltip, type TooltipProps as MuiTooltipProps } from '@mui/material';

export interface TooltipProps extends Omit<MuiTooltipProps, 'title'> {
  /** Tooltip text. An empty value renders the child without a tooltip. */
  title: MuiTooltipProps['title'];
}

export function Tooltip({ title, children, ...props }: TooltipProps) {
  if (title === '' || title === null || title === undefined) return children;

  return (
    <MuiTooltip title={title} {...props}>
      {children}
    </MuiTooltip>
  );
}
