import { Task } from 'types/Task.types';

export const filterTasks = (
  tasks: Task[],
  filters: { searchName: string; isCompleted: boolean | null; isImportant: boolean | null }
) => {
  const { searchName, isCompleted, isImportant } = filters;

  return tasks.filter((task) => {
    const matchesName = !searchName || task.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesCompleted = isCompleted === null || task.isCompleted === isCompleted;
    const matchesImportant = isImportant === null || task.isImportant === isImportant;

    return matchesName && matchesCompleted && matchesImportant;
  });
};
