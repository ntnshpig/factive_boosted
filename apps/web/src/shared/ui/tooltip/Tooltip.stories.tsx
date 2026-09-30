import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/shared/ui/button';
import { Tooltip } from '@/shared/ui/tooltip';

const meta = {
  title: 'Shared/Display/Tooltip',
  component: Tooltip,
  args: {
    title: 'Costs 4 credits',
    placement: 'top',
    children: <Button variant="soft">Hover me</Button>,
  },
  argTypes: {
    placement: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <Stack sx={{ p: 6, alignItems: 'center' }}>
        <Story />
      </Stack>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Placements: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2}>
      {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
        <Tooltip key={placement} {...args} placement={placement} title={`On the ${placement}`}>
          <Button variant="outlined">{placement}</Button>
        </Tooltip>
      ))}
    </Stack>
  ),
};

export const AlwaysOpen: Story = {
  args: { open: true, title: 'Explains the control' },
};
