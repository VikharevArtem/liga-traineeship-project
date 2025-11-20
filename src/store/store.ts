import { configureStore, Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import tasksReducer from '../slices/tasks/tasksSlice';

const logger = createLogger({ collapsed: true });

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV !== 'production'
      ? getDefaultMiddleware().concat(logger as unknown as Middleware)
      : getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
