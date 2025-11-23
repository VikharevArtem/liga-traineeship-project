import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce';
import { useClientPagination } from './useClientPagination';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { fetchTasks } from 'src/slices/tasks/tasksSlice';
import type { RootState } from 'src/store/store';
import { stringToBoolean } from 'utils/stringsToBolean';

const selectTaskSlice = (state: RootState) => state.tasks;

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const tasksData = useAppSelector(selectTaskSlice);

  const { tasks, loading, error } = useMemo(() => {
    return {
      tasks: tasksData.tasks,
      loading: tasksData.loading,
      error: tasksData.error,
    };
  }, [tasksData.tasks, tasksData.loading, tasksData.error]);

  const [searchParams] = useSearchParams();

  const filters = useMemo(() => {
    const searchName = searchParams.get('searchName');
    const completedParam = searchParams.get('completed');
    const importantParam = searchParams.get('important');

    return {
      searchName: searchName || undefined,
      isCompleted: stringToBoolean(completedParam) ?? undefined,
      isImportant: stringToBoolean(importantParam) ?? undefined,
    };
  }, [searchParams]);

  const apiFilters = useMemo(() => {
    return {
      name_like: filters.searchName,
      isCompleted: filters.isCompleted,
      isImportant: filters.isImportant,
    };
  }, [filters]);

  const debouncedApiFilters = useDebounce(apiFilters, 500);

  useEffect(() => {
    dispatch(fetchTasks({ filters: debouncedApiFilters }));
  }, [dispatch, debouncedApiFilters]);

  const { pagination, paginatedItems, goToPage, setLimit } = useClientPagination(tasks.length, 5);

  const paginatedTasks = useMemo(() => {
    return tasks.slice(paginatedItems.from, paginatedItems.to);
  }, [tasks, paginatedItems]);

  return {
    tasks: paginatedTasks,
    loading,
    error,
    filters,
    pagination,
    goToPage,
    setLimit,
  };
};
