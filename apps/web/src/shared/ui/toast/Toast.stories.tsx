import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/shared/ui/button';
import { ToastProvider, useToast } from '@/shared/ui/toast';

function ToastDemo() {
  const toast = useToast();

  return (
    <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap' }}>
      <Button
        variant="soft"
        onClick={() => {
          toast.success('Media uploaded');
        }}
      >
        Success
      </Button>
      <Button
        variant="soft"
        onClick={() => {
          toast.info('Generation started');
        }}
      >
        Info
      </Button>
      <Button
        variant="soft"
        onClick={() => {
          toast.warning('Only 40 credits left');
        }}
      >
        Warning
      </Button>
      <Button
        variant="soft"
        color="danger"
        onClick={() => {
          toast.error('Upload failed');
        }}
      >
        Error
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          toast.show({
            title: 'Moved to archive',
            message: '3 media items will be deleted in 7 days.',
            severity: 'info',
            duration: null,
            action: (
              <Button size="sm" color="secondary">
                Undo
              </Button>
            ),
          });
        }}
      >
        Persistent with action
      </Button>
      <Button
        variant="text"
        onClick={() => {
          toast.info('First');
          toast.info('Second');
          toast.info('Third');
        }}
      >
        Queue of three
      </Button>
    </Stack>
  );
}

const meta = {
  title: 'Shared/Feedback/Toast',
  component: ToastDemo,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Wrap the app in `ToastProvider` (done in `app/App.tsx`) and call `useToast()` anywhere. One toast is visible at a time, the rest wait in a queue.',
      },
    },
  },
} satisfies Meta<typeof ToastDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
