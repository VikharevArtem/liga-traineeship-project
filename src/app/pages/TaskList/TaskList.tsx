import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { NavButton } from '../Layout/components/Header/components/NavButton/NavButton';
import { TaskListItem } from './components/TaskListItem/TaskListItem';
import { TaskFilterForm } from './components/TaskFilterForm/TaskFilterForm';
import { useAppSelector } from 'src/hooks/redux';
import { selectTasks } from 'src/slices/tasks/tasksSlice';
import { filterTasks } from 'utils/filterTasks';

export const TaskList = (): JSX.Element => {
  const [searchParams] = useSearchParams();

  const tasks = useAppSelector(selectTasks);

  const filters = useMemo(() => {
    const searchName = searchParams.get('searchName') || '';
    const isCompleted = searchParams.get('isCompleted') === 'true' || null;
    const isImportant = searchParams.get('isImportant') === 'true' || null;

    return { searchName, isCompleted, isImportant };
  }, [searchParams]);

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, filters);
  }, [tasks, filters]);

  return (
    <Layout
      headerChildren={
        <>
          <NavButton to={'/task/new'} text={'Создать задачу'} />
          <TaskFilterForm />
        </>
      }>
      <h1>Список задач</h1>
      {filteredTasks.length > 0 ? (
        <ul>
          {filteredTasks.map((task) => (
            <TaskListItem key={task.id} task={task} />
          ))}
        </ul>
      ) : (
        <div>
          <h2>Задачи не найдены</h2>
          <p>Попробуйте изменить параметры фильтра</p>
        </div>
      )}
    </Layout>
  );
};
