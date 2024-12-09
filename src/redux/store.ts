import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/auth';
import { apiSlice } from './services/api';
import authReducer from './slices/auth.slice';
import dataReducer from './slices/data.slice'; 

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    data: dataReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
