import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { env } from '@/shared/config';

/**
 * Single RTK Query API for the app. It has no endpoints of its own:
 * entities and features add theirs with `baseApi.injectEndpoints`.
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: env.apiUrl }),
  endpoints: () => ({}),
});
