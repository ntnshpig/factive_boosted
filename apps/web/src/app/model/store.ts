import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { sessionSlice } from '@/entities/session';
import { baseApi } from '@/shared/api';

const rootReducer = combineSlices(baseApi, sessionSlice);

export function setupStore(preloadedState?: Partial<ReturnType<typeof rootReducer>>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  });
}
