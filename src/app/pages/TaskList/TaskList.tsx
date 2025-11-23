import { TaskListItem } from 'app/pages/TaskList/components/TaskListItem/TaskListItem';
import { TaskFilterForm } from 'app/pages/TaskList/components/TaskFilterForm/TaskFilterForm';
import { NavButton } from 'app/pages/Layout/components/Header/components/NavButton/NavButton';
import { Layout } from 'app/pages/Layout/Layout';
import { useTasks } from 'src/hooks/useTasks';
import { Loader } from 'components/Loader/Loader';
import { Pagination } from 'components/Pagination/Pagination';

export const TaskList = (): JSX.Element => {
  const { tasks, loading, error, pagination, goToPage, setLimit } = useTasks();
  return (
    <Layout
      pageContainerClassName="tasks-list-wrap"
      headerChildren={
        <>
          <NavButton to={'/task/new'} text={'Создать задачу'} />
        </>
      }
      sidebarPosition="left"
      childrenSidebar={<TaskFilterForm />}>
      <h1>Список задач</h1>
      {error && <p>Ошибка: {error}</p>}
      <Loader isLoading={loading} variant="circle">
        {tasks.length > 0 ? (
          <>
            <ul>
              {tasks.map((task) => (
                <TaskListItem key={task.id} task={task} />
              ))}
            </ul>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              itemsPerPage={pagination.limit}
              totalItems={pagination.totalResults}
              onPageChange={goToPage}
              onLimitChange={setLimit}
            />
          </>
        ) : (
          <div>
            <h2>Задачи не найдены</h2>
            <p>Попробуйте изменить фильтры</p>
          </div>
        )}
      </Loader>
    </Layout>
  );
};
