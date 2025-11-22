import { apiClient } from 'api/apiClient';
import { Task, CreateTask, UpdateTask } from 'types/Task.types';

export const getTasks = async (params?: {
  isImportant?: boolean;
  name_like?: string;
  isCompleted?: boolean;
}): Promise<Task[]> => {
  const response = await apiClient.get<Task[]>('/tasks', { params });
  return response.data;
};

export const getTaskById = async (id: number): Promise<Task> => {
  const response = await apiClient.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (data: CreateTask): Promise<Task> => {
  const response = await apiClient.post<Task>('/tasks', data);
  return response.data;
};

export const updateTask = async (id: number, data: UpdateTask): Promise<Task> => {
  const response = await apiClient.patch<Task>(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};
