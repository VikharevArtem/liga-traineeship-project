import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import type { RootState } from 'src/store/store';
import type { components } from 'types/api';
import { getTasks, createTask, updateTask, deleteTask, getTaskById } from 'api/tasks';
import type { Task, CreateTask, UpdateTask } from 'types/Task.types';

type ApiError = components['schemas']['Error'];

export type TaskFilters = {
  searchName?: string;
  isCompleted?: boolean;
  isImportant?: boolean;
};

export const fetchTasks = createAsyncThunk<Task[], { filters?: TaskFilters }, { rejectValue: string }>(
  'tasks/fetchTasks',
  async ({ filters = {} }, { rejectWithValue }) => {
    try {
      const data = await getTasks(filters);
      return data;
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      return rejectWithValue(error.response?.data?.error || 'Не удалось загрузить задачи');
    }
  }
);
export const fetchTask = createAsyncThunk<Task, number, { rejectValue: string }>(
  'tasks/fetchTask',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getTaskById(id);
      return data;
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      return rejectWithValue(error.response?.data?.error || 'Не удалось загрузить задачу');
    }
  }
);

export const addNewTask = createAsyncThunk<Task, CreateTask, { rejectValue: string }>(
  'tasks/addNewTask',
  async (newTaskData, { rejectWithValue }) => {
    try {
      const newTask = await createTask(newTaskData);
      return newTask;
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      return rejectWithValue(error.response?.data?.error || 'Не удалось создать задачу');
    }
  }
);

export const updateTaskAsync = createAsyncThunk<
  Task,
  { id: number; updatedData: Partial<UpdateTask> },
  { rejectValue: string }
>('tasks/updateTaskAsync', async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const updated = await updateTask(id, updatedData);
    return updated;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    return rejectWithValue(error.response?.data?.error || 'Не удалось обновить задачу');
  }
});

export const deleteTaskAsync = createAsyncThunk<number, number, { rejectValue: string }>(
  'tasks/deleteTaskAsync',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTask(id);
      return id;
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      return rejectWithValue(error.response?.data?.error || 'Не удалось удалить задачу');
    }
  }
);

const taskAdapter = createEntityAdapter<Task>();

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: taskAdapter.getInitialState<{ loading: boolean; error: string | null; task: Task | null }>({
    loading: false,
    error: null,
    task: null,
  }),
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        taskAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки';
      })
      .addCase(fetchTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || 'Ошибка загрузки задачи';
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        taskAdapter.addOne(state, action.payload);
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.error = action.payload || action.error.message || 'Ошибка создания';
      })

      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        taskAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.error = action.payload || action.error.message || 'Ошибка обновления';
      })

      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        taskAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.error = action.payload || action.error.message || 'Ошибка удаления';
      });
  },
});

export default tasksSlice.reducer;

export const { selectAll: selectAllTasks, selectById: selectTaskById } = taskAdapter.getSelectors<RootState>(
  (state) => state.tasks
);

export const selectTasks = selectAllTasks;
export const { clearError } = tasksSlice.actions;
