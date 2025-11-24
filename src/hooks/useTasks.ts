import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce';
import { useClientPagination } from './useClientPagination';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { fetchTasks, selectTasks } from 'src/slices/tasks/tasksSlice';
import { stringToBoolean } from 'utils/stringsToBolean';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  const { loading, error } = useAppSelector((state) => state.tasks);

  const [searchParams] = useSearchParams();
  const searchName = searchParams.get('searchName');
  const completedParam = searchParams.get('completed');
  const importantParam = searchParams.get('important');

  const filters = useMemo(() => {
    return {
      searchName: searchName || undefined,
      isCompleted: stringToBoolean(completedParam) ?? undefined,
      isImportant: stringToBoolean(importantParam) ?? undefined,
    };
  }, [searchName, completedParam, importantParam]);

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
