import '@fontsource-variable/inter';
import '@fontsource-variable/roboto';
import '@fontsource-variable/fira-code';

import { CssBaseline, ThemeProvider } from '@mui/material';
import type { Preview } from '@storybook/react-vite';

import { theme } from '@/shared/ui/theme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
};

export default preview;
