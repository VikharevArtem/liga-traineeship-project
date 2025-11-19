export interface Task {
  id: number;
  name: string;
  info?: string;
  isImportant?: boolean;
  isCompleted?: boolean;
}

export type CreateTask = Omit<Task, 'id'>;

export type UpdateTask = Partial<Task>;
