import { Task } from 'types/Task.types';

export type TaskItemProps = {
  task: Task;
  onDelete: (id: number) => void;
};
