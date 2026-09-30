import { Button, Stack, Typography } from '@mui/material';

interface ErrorFallbackProps {
  title?: string;
}

export function ErrorFallback({ title = 'Something went wrong' }: ErrorFallbackProps) {
  return (
    <Stack spacing={2} sx={{ p: 4, alignItems: 'flex-start' }}>
      <Typography variant="h1">{title}</Typography>
      <Button variant="contained" href="/">
        Go to home page
      </Button>
    </Stack>
  );
}
