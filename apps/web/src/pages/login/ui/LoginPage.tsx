import { Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';

import { routes } from '@/shared/config';

export function LoginPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Sign in</Typography>
      <Typography color="text.secondary">Sign-in form will live here.</Typography>
      <Link component={RouterLink} to={routes.register}>
        Create an account
      </Link>
    </Stack>
  );
}
