import { Task } from 'types/Task.types';

export const initialTasks: Task[] = [
  {
    id: 1,
    name: 'Задача 1',
    info: 'Описание задачи 1',
    isCompleted: false,
    isImportant: true,
  },
  {
    id: 2,
    name: 'Задача 2',
    info: 'Описание задачи 2',
    isCompleted: true,
    isImportant: true,
  },
  {
    id: 3,
    name: 'Задача 3',
    info: 'Описание задачи 3',
    isCompleted: false,
    isImportant: true,
  },
];

let tasksState = [...initialTasks];

let idCounter = tasksState.length > 0 ? Math.max(...tasksState.map((t) => t.id)) + 1 : 1;

export const getTasks = (): Task[] => {
  return [...tasksState];
};

export const addTask = (task: Omit<Task, 'id'>): Task => {
  const newTask = { ...task, id: idCounter++ };
  tasksState = [...tasksState, newTask];
  return newTask;
};

export const updateTask = (id: number, updatedData: Partial<Task>): Task | null => {
  const index = tasksState.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const updatedTask = { ...tasksState[index], ...updatedData };
  tasksState = [...tasksState];
  tasksState[index] = updatedTask;

  return updatedTask;
};

export const deleteTask = (id: number): void => {
  const taskToDelete = tasksState.find((t) => t.id === id);
  if (taskToDelete) {
    console.log('Удаление задаччи');
  }
  tasksState = tasksState.filter((t) => t.id !== id);
};
