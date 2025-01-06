import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/api';
import authReducer from './slices/auth.slice';
import dataReducer from './slices/data.slice'; 
import storydataReducer from './slices/data.slice'; 

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    data: dataReducer, 
    storydata:storydataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
