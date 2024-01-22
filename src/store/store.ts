// src/app/store.ts

import { dropboxSlice } from '../features/dropboxSlice';
import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from '../features/loadingSlice';

export const store = configureStore({
  reducer: {
    dropbox: dropboxSlice.reducer,
    loading: loadingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
