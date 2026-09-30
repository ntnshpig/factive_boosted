import { AppBar, Container, Link, Toolbar } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router';

import { routes } from '@/shared/config';

export function AppLayout() {
  return (
    <>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar>
          <Link
            component={RouterLink}
            to={routes.root}
            variant="h3"
            color="inherit"
            underline="none"
          >
            Factive Boosted
          </Link>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}
