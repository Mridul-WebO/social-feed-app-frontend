import { configureStore } from '@reduxjs/toolkit';
import { createApiInstance } from './apis/createApiInstance';

export const store = configureStore({
  reducer: {
    [createApiInstance.reducerPath]: createApiInstance.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createApiInstance.middleware),
});
