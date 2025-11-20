import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CreateTask, Task } from 'types/Task.types';
import { myTasks } from 'mocks/myTasks';

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: myTasks,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<CreateTask>) => {
      const newId = state.tasks.length > 0 ? Math.max(...state.tasks.map((task) => task.id)) + 1 : 1;
      const newTask: Task = { id: newId, ...action.payload };
      state.tasks.push(newTask);
    },
    updateTask: (state, action: PayloadAction<{ id: number; updatedData: Partial<Task> }>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload.updatedData } : task
      );
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;

export const selectTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
export const selectTaskById = (state: { tasks: TasksState }, id: number) => {
  return state.tasks.tasks.find((task) => task.id === id);
};

export default tasksSlice.reducer;
