import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { Button } from '@/shared/ui/button';
import { ConfirmDialog, Dialog, type DialogProps } from '@/shared/ui/dialog';
import { TextField } from '@/shared/ui/text-field';

function DialogDemo(props: Omit<DialogProps, 'open' | 'onClose'>) {
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open dialog
      </Button>
      <Dialog
        {...props}
        open={open}
        onClose={close}
        actions={
          <>
            <Button variant="text" onClick={close}>
              Cancel
            </Button>
            <Button onClick={close}>Save</Button>
          </>
        }
      >
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField label="Project name" defaultValue="Spring campaign" />
          <TextField label="Description" multiline minRows={3} />
        </Stack>
      </Dialog>
    </>
  );
}

function ConfirmDemo({ danger, slow }: { danger: boolean; slow: boolean }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirm = () => {
    if (!slow) {
      setOpen(false);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1500);
  };

  return (
    <>
      <Button
        variant="soft"
        color={danger ? 'danger' : 'primary'}
        onClick={() => {
          setOpen(true);
        }}
      >
        {danger ? 'Delete media' : 'Deactivate project'}
      </Button>
      <ConfirmDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={confirm}
        loading={loading}
        danger={danger}
        title={danger ? 'Delete 3 media?' : 'Deactivate project?'}
        description={
          danger
            ? 'They move to the archive and are deleted for good after 7 days.'
            : 'The project becomes read-only. You can activate it again at any time.'
        }
        confirmLabel={danger ? 'Delete' : 'Deactivate'}
      />
    </>
  );
}

const meta = {
  title: 'Shared/Display/Dialog',
  component: Dialog,
  args: {
    open: true,
    onClose: fn(),
    title: 'Rename project',
    description: 'The new name is shown to everyone with access.',
    size: 'sm',
    closable: true,
    persistent: false,
  },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Dialog
      {...args}
      actions={
        <>
          <Button variant="text" onClick={args.onClose}>
            Cancel
          </Button>
          <Button onClick={args.onClose}>Save</Button>
        </>
      }
    >
      <TextField label="Project name" defaultValue="Spring campaign" />
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: ({ title, description, size, closable }) => (
    <DialogDemo title={title} description={description} size={size} closable={closable} />
  ),
};

export const Confirm: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <ConfirmDemo danger={false} slow={false} />
      <ConfirmDemo danger slow />
    </Stack>
  ),
};
