import { Box, Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from '@/shared/ui/spinner';

const meta = {
  title: 'Shared/Feedback/Spinner',
  component: Spinner,
  args: { size: 'md', color: 'primary', label: 'Loading', showLabel: false, centered: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    color: { control: 'inline-radio', options: ['primary', 'inherit'] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Box sx={{ color: 'text.secondary' }}>
        <Spinner color="inherit" />
      </Box>
    </Stack>
  ),
};

export const WithLabel: Story = {
  args: { showLabel: true, label: 'Loading projects…' },
};

export const Centered: Story = {
  args: { centered: true, size: 'lg', showLabel: true, label: 'Loading media pool…' },
  decorators: [
    (Story) => (
      <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
        <Story />
      </Box>
    ),
  ],
};
