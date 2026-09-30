import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FolderOpen, ImageOff, SearchX, Upload } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { EmptyState } from '@/shared/ui/empty-state';

const meta = {
  title: 'Shared/Feedback/EmptyState',
  component: EmptyState,
  args: {
    icon: ImageOff,
    title: 'No media yet',
    description: 'Upload images or videos to start building your media pool.',
    size: 'md',
  },
  argTypes: {
    icon: { control: false },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { action: <Button startIcon={Upload}>Upload media</Button> },
};

export const Examples: Story = {
  render: () => (
    <Stack spacing={2}>
      <Card>
        <EmptyState
          icon={FolderOpen}
          title="No projects"
          description="Create your first ACTIV8 project."
          action={<Button>New project</Button>}
        />
      </Card>
      <Card>
        <EmptyState
          size="sm"
          icon={SearchX}
          title="Nothing found"
          description="Try other words or clear the filters."
          action={
            <Button variant="text" size="sm">
              Clear filters
            </Button>
          }
        />
      </Card>
      <Card>
        <EmptyState size="sm" title="No history yet" />
      </Card>
    </Stack>
  ),
};
