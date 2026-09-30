import { Box, Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

const meta = {
  title: 'Shared/Feedback/Skeleton',
  component: Skeleton,
  args: { variant: 'text', lines: 3, animated: true },
  argTypes: { variant: { control: 'inline-radio', options: ['text', 'rect', 'circle'] } },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 360 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Skeleton variant="text" lines={3} />
      <Skeleton variant="rect" height={160} />
      <Skeleton variant="circle" />
      <Skeleton variant="text" lines={2} animated={false} />
    </Stack>
  ),
};

export const MediaCardPlaceholder: Story = {
  render: () => (
    <Card padding="none">
      <Skeleton variant="rect" height={180} />
      <Stack spacing={1.5} sx={{ p: 2 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Skeleton variant="circle" width={32} height={32} />
          <Skeleton variant="text" width="50%" />
        </Stack>
        <Skeleton variant="text" lines={2} />
      </Stack>
    </Card>
  ),
};
