import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { TaskListItem } from './components/TaskListItem/TaskListItem';
import { TaskFilterForm } from './components/TaskFilterForm/TaskFilterForm';
import { deleteTask, getTasks } from 'mocks/myTasks';
import { Task } from 'types/Task.types';
import { Button } from 'components/Button/Button';

export const TaskList = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>(getTasks());

  const refershTasks = () => {
    setTasks(getTasks());
  };

  const filters = useMemo(() => {
    const searchName = searchParams.get('searchName') || '';
    const isCompleted = searchParams.get('isCompleted') === 'true' || null;
    const isImportant = searchParams.get('isImportant') === 'true' || null;

    return { searchName, isCompleted, isImportant };
  }, [searchParams]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filters.searchName && !task.name.toLowerCase().includes(filters.searchName.toLowerCase())) {
        return false;
      }
      if (filters.isCompleted !== null && task.isCompleted !== filters.isCompleted) {
        return false;
      }
      if (filters.isImportant !== null && task.isImportant !== filters.isImportant) {
        return false;
      }

      return true;
    });
  }, [tasks, filters]);

  const handleDeleteTask = (id: number) => {
    deleteTask(id);
    refershTasks();
  };

  return (
    <Layout>
      <Button>
        <Link to="/task/new">Создать задачу</Link>
      </Button>
      <h1>Список задач</h1>
      <TaskFilterForm />
      <ul>
        {filteredTasks.map((task) => (
          <TaskListItem key={task.id} task={task} onDelete={handleDeleteTask} />
        ))}
      </ul>
    </Layout>
  );
};
