import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert, type AlertSeverity, type AlertVariant } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';

const severities: AlertSeverity[] = ['info', 'success', 'warning', 'error'];
const variants: AlertVariant[] = ['soft', 'outlined', 'filled'];

const meta = {
  title: 'Shared/Feedback/Alert',
  component: Alert,
  args: {
    severity: 'info',
    variant: 'soft',
    title: '',
    children: 'Media is being processed. It will appear in the pool in a minute.',
  },
  argTypes: {
    severity: { control: 'inline-radio', options: severities },
    variant: { control: 'inline-radio', options: variants },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack spacing={4}>
      {variants.map((variant) => (
        <Stack key={variant} spacing={1.5}>
          {severities.map((severity) => (
            <Alert key={severity} severity={severity} variant={variant}>
              {variant} {severity}: something worth knowing happened.
            </Alert>
          ))}
        </Stack>
      ))}
    </Stack>
  ),
};

export const WithTitleAndActions: Story = {
  render: () => (
    <Stack spacing={1.5}>
      <Alert severity="warning" title="Credits running low" onClose={() => undefined}>
        You have 40 credits left this month. AI operations stop at zero.
      </Alert>
      <Alert
        severity="error"
        title="Generation failed"
        action={
          <Button size="sm" variant="text" color="danger">
            Retry
          </Button>
        }
      >
        The provider did not respond. Your credits were returned.
      </Alert>
      <Alert severity="success" variant="filled" onClose={() => undefined}>
        Story saved.
      </Alert>
    </Stack>
  ),
};
