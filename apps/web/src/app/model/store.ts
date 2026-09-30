import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { sessionSlice } from '@/entities/session';
import { baseApi } from '@/shared/api';

const rootReducer = combineSlices(baseApi, sessionSlice);

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  });
}

type AppStore = ReturnType<typeof setupStore>;

declare global {
  type RootState = ReturnType<typeof rootReducer>;
  type AppDispatch = AppStore['dispatch'];
}
