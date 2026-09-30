import { createSlice } from '@reduxjs/toolkit';

interface SessionState {
  isAuthenticated: boolean;
}

const initialState: SessionState = {
  isAuthenticated: false,
};

// Stub until real auth exists: nothing changes this flag yet.
export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  selectors: {
    selectIsAuthenticated: (state) => state.isAuthenticated,
  },
});

export const { selectIsAuthenticated } = sessionSlice.selectors;
