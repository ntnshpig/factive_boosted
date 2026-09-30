import type { RequestHandler } from 'msw';

// Default handlers shared by all tests. Tests override them with `server.use(...)`.
export const handlers: RequestHandler[] = [];
