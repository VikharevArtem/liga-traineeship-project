import { useEffect, useState } from 'react';
import { CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  StyledContainer,
  HeaderBox,
  TitleTypography,
  ErrorTypography,
  CircularProgressBox,
  TaskListWrapper,
  EmptyStateBox,
  PaginationBox,
} from 'app/pages/TaskList/TaskList.styles';
import { TaskFilterForm } from 'app/pages/TaskList/components/TaskFilterForm/TaskFilterForm';
import { TaskListItem } from 'app/pages/TaskList/components/TaskListItem/TaskListItem';
import { NavButton } from 'app/pages/Layout/components/Header/components/NavButton/NavButton';
import { Layout } from 'app/pages/Layout/Layout';
import { useTasks } from 'src/hooks/useTasks';
import { MyPagination } from 'components/Pagination/Pagination';
import { clearError } from 'src/slices/tasks/tasksSlice';
import { useAppDispatch } from 'src/hooks/redux';

export const TaskList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error, pagination, goToPage } = useTasks();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <Layout
      headerChildren={
        <>
          <NavButton to={'/task/new'} text={'Создать задачу'} />
        </>
      }
      sidebarPosition="left"
      childrenSidebar={sidebarOpen ? <TaskFilterForm onClose={() => setSidebarOpen(false)} /> : null}>
      <StyledContainer>
        <HeaderBox>
          <Tooltip title="Показать фильтры">
            <IconButton aria-label="search" onClick={toggleSidebar}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <TitleTypography variant="h1">Список задач</TitleTypography>
        </HeaderBox>

        {error && <ErrorTypography variant="body1">Ошибка: {error}</ErrorTypography>}

        {loading ? (
          <CircularProgressBox>
            <CircularProgress />
          </CircularProgressBox>
        ) : (
          <>
            {tasks.length > 0 ? (
              <TaskListWrapper>
                {tasks.map((task) => (
                  <TaskListItem key={task.id} task={task} />
                ))}
              </TaskListWrapper>
            ) : (
              <EmptyStateBox>
                <Typography variant="h4" component="h3">
                  Задачи не найдены
                </Typography>
                <Typography variant="body1">Попробуйте изменить фильтры</Typography>
              </EmptyStateBox>
            )}
          </>
        )}

        {!loading && (
          <PaginationBox>
            <MyPagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              itemsPerPage={pagination.limit}
              onPageChange={goToPage}
            />
          </PaginationBox>
        )}
      </StyledContainer>
    </Layout>
  );
};
