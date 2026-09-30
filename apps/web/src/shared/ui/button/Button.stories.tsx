import { Stack, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Plus, Sparkles, Trash2, Upload } from 'lucide-react';
import { fn } from 'storybook/test';

import { Button, type ButtonColor, type ButtonVariant } from '@/shared/ui/button';

const variants: ButtonVariant[] = ['contained', 'soft', 'outlined', 'text'];
const colors: ButtonColor[] = ['primary', 'secondary', 'danger'];

const meta = {
  title: 'Shared/Actions/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    color: { control: 'inline-radio', options: colors },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    startIcon: { control: false },
    endIcon: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={2}>
      {colors.map((color) => (
        <Stack key={color} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography variant="overline" sx={{ width: 96 }}>
            {color}
          </Typography>
          {variants.map((variant) => (
            <Button key={variant} {...args} variant={variant} color={color}>
              {variant}
            </Button>
          ))}
        </Stack>
      ))}
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <Button {...args} size="sm" startIcon={Plus}>
        Small
      </Button>
      <Button {...args} size="md" startIcon={Plus}>
        Medium
      </Button>
      <Button {...args} size="lg" startIcon={Plus}>
        Large
      </Button>
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2}>
      <Button {...args} startIcon={Upload}>
        Upload media
      </Button>
      <Button {...args} variant="soft" startIcon={Sparkles}>
        Generate
      </Button>
      <Button {...args} variant="outlined" endIcon={ArrowRight}>
        Continue
      </Button>
      <Button {...args} variant="text" color="danger" startIcon={Trash2}>
        Delete
      </Button>
    </Stack>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack spacing={2}>
      {variants.map((variant) => (
        <Stack key={variant} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography variant="overline" sx={{ width: 96 }}>
            {variant}
          </Typography>
          <Button {...args} variant={variant}>
            Default
          </Button>
          <Button {...args} variant={variant} disabled>
            Disabled
          </Button>
          <Button {...args} variant={variant} loading>
            Loading
          </Button>
          <Button {...args} variant={variant} startIcon={Upload} loading>
            Uploading
          </Button>
        </Stack>
      ))}
    </Stack>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Sign in' },
};
