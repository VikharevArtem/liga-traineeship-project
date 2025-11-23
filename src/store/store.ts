import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import tasksReducer from '../slices/tasks/tasksSlice';

const isDev = process.env.NODE_ENV === 'development';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (isDev) {
      const logger = createLogger({ collapsed: true });
      return getDefaultMiddleware().concat(logger as Middleware);
    }
    return getDefaultMiddleware();
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
