import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from 'react-final-form';
import { fn } from 'storybook/test';
import { boolean, object, string } from 'yup';

import { validateWithSchema } from '@/shared/lib/form';
import { Button } from '@/shared/ui/button';
import {
  FormCheckbox,
  FormPasswordField,
  FormSelect,
  FormSwitch,
  FormTextField,
} from '@/shared/ui/form';

interface ExampleValues {
  name: string;
  email: string;
  password: string;
  platform: string;
  notifications: boolean;
  terms: boolean;
}

const schema = object({
  name: string().required('Name is required'),
  email: string().required('Email is required').email('Enter a valid email'),
  password: string().required('Password is required').min(8, 'At least 8 characters'),
  platform: string().required('Choose a platform'),
  notifications: boolean().required(),
  terms: boolean().oneOf([true], 'You must accept the terms').required(),
});

const validate = validateWithSchema(schema);

const initialValues: ExampleValues = {
  name: '',
  email: '',
  password: '',
  platform: '',
  notifications: true,
  terms: false,
};

interface ExampleFormProps {
  onSubmit: (values: ExampleValues) => void;
}

function ExampleForm({ onSubmit }: ExampleFormProps) {
  return (
    <Form<ExampleValues>
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, submitting }) => (
        <Stack
          component="form"
          noValidate
          spacing={2.5}
          sx={{ maxWidth: 400 }}
          onSubmit={(event) => void handleSubmit(event)}
        >
          <FormTextField name="name" label="Full name" autoComplete="name" />
          <FormTextField name="email" label="Email" type="email" autoComplete="email" />
          <FormPasswordField name="password" label="Password" autoComplete="new-password" />
          <FormSelect
            name="platform"
            label="Main platform"
            placeholder="Choose a platform"
            options={[
              { value: 'meta', label: 'Meta' },
              { value: 'linkedin', label: 'LinkedIn' },
              { value: 'youtube', label: 'YouTube' },
            ]}
          />
          <FormSwitch name="notifications" label="Email me when media is ready" />
          <FormCheckbox name="terms" label="I accept the terms" />
          <Button type="submit" loading={submitting}>
            Create account
          </Button>
        </Stack>
      )}
    />
  );
}

const meta = {
  title: 'Shared/Form fields/Final Form',
  component: ExampleForm,
  args: { onSubmit: fn() },
  parameters: {
    docs: {
      description: {
        component:
          'Form* components bind shared fields to React Final Form. Errors appear after a field is touched or on submit. Validation uses `validateWithSchema` from `@/shared/lib/form`.',
      },
    },
  },
} satisfies Meta<typeof ExampleForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignUpExample: Story = {};
