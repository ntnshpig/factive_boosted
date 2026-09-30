import { Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';

import { routes } from '@/shared/config';

export function RegisterPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Create an account</Typography>
      <Typography color="text.secondary">Registration form will live here.</Typography>
      <Link component={RouterLink} to={routes.login}>
        Already have an account? Sign in
      </Link>
    </Stack>
  );
}
