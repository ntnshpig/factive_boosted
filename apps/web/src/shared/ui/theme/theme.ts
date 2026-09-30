import { alpha, createTheme, type Palette, type PaletteColor } from '@mui/material/styles';
import { ChevronDown, CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';
import { createElement } from 'react';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    soft: true;
  }
}

// Tokens come from docs/DESIGN.md.
const fontBody = '"Inter Variable", system-ui, sans-serif';
const fontDisplay = '"Roboto Variable", system-ui, sans-serif';
const fontMono = '"Fira Code Variable", ui-monospace, monospace';

const base = createTheme({
  palette: {
    primary: { main: '#6442D6' },
    secondary: { main: '#C8B3FD' },
    success: { main: '#16A34A' },
    warning: { main: '#D97706' },
    error: { main: '#DC2626' },
    background: { default: '#FFFFFF', paper: '#FFFFFF' },
    text: { primary: '#111827' },
  },
  // MUI components assume an 8px unit. Scale 4/8/12/16/24/32 = spacing(0.5/1/1.5/2/3/4).
  spacing: 8,
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: fontBody,
    // Scale 12/14/16/20/24/32.
    h1: { fontFamily: fontDisplay, fontSize: '2rem', fontWeight: 600 },
    h2: { fontFamily: fontDisplay, fontSize: '1.5rem', fontWeight: 600 },
    h3: { fontFamily: fontDisplay, fontSize: '1.25rem', fontWeight: 600 },
    h4: { fontFamily: fontDisplay, fontSize: '1rem', fontWeight: 600 },
    h5: { fontFamily: fontDisplay, fontSize: '0.875rem', fontWeight: 600 },
    h6: { fontFamily: fontDisplay, fontSize: '0.75rem', fontWeight: 600 },
    subtitle1: { fontSize: '1rem' },
    subtitle2: { fontSize: '0.875rem' },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
    button: { fontSize: '0.875rem', fontWeight: 600, textTransform: 'none' },
    caption: { fontSize: '0.75rem' },
    overline: { fontFamily: fontMono, fontSize: '0.75rem' },
  },
});

type PaletteKey = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
const paletteKeys: PaletteKey[] = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];

// Readable text on a tinted background. Light colors (secondary) need the dark shade.
function softText(palette: Palette, key: PaletteKey) {
  const color: PaletteColor = palette[key];
  return key === 'secondary' ? palette.text.primary : color.dark;
}

export const theme = createTheme(base, {
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: base.shape.borderRadius, whiteSpace: 'nowrap' },
      },
      variants: [
        ...paletteKeys.map((key) => ({
          props: { variant: 'soft', color: key },
          style: {
            color: softText(base.palette, key),
            backgroundColor: alpha(base.palette[key].main, 0.12),
            '&:hover': { backgroundColor: alpha(base.palette[key].main, 0.2) },
            '&.Mui-disabled': {
              color: base.palette.action.disabled,
              backgroundColor: base.palette.action.disabledBackground,
            },
          },
        })),
        // Secondary is too light for text on white: keep the tint for borders only.
        {
          props: { variant: 'outlined', color: 'secondary' },
          style: { color: base.palette.text.primary, borderColor: base.palette.secondary.main },
        },
        {
          props: { variant: 'text', color: 'secondary' },
          style: { color: base.palette.text.primary },
        },
      ],
    },
    MuiChip: {
      defaultProps: { deleteIcon: createElement(X, { size: 14 }) },
      styleOverrides: { root: { fontWeight: 500 } },
      variants: [
        {
          props: { variant: 'soft', color: 'default' },
          style: {
            color: base.palette.text.primary,
            backgroundColor: base.palette.grey[100],
            '&.MuiChip-clickable:hover': { backgroundColor: base.palette.grey[200] },
          },
        },
        ...paletteKeys.map((key) => ({
          props: { variant: 'soft', color: key },
          style: {
            color: softText(base.palette, key),
            backgroundColor: alpha(base.palette[key].main, 0.12),
            '&.MuiChip-clickable:hover': { backgroundColor: alpha(base.palette[key].main, 0.2) },
            '& .MuiChip-deleteIcon': { color: 'inherit', opacity: 0.7 },
          },
        })),
      ],
    },
    MuiSelect: {
      defaultProps: { IconComponent: ChevronDown },
      styleOverrides: { icon: { width: 20, height: 20, right: 12 } },
    },
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          info: createElement(Info, { size: 20 }),
          success: createElement(CircleCheck, { size: 20 }),
          warning: createElement(TriangleAlert, { size: 20 }),
          error: createElement(CircleAlert, { size: 20 }),
        },
      },
      styleOverrides: { root: { alignItems: 'flex-start' } },
    },
    MuiTooltip: {
      defaultProps: { arrow: true, enterDelay: 300 },
    },
    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: { root: { borderRadius: 12 } },
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: 12 } },
    },
    MuiTextField: {
      defaultProps: { fullWidth: true },
    },
  },
});
