import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce';
import { useClientPagination } from './useClientPagination';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { fetchTasks } from 'src/slices/tasks/tasksSlice';
import type { RootState } from 'src/store/store';
import { stringToBoolean } from 'utils/stringsToBolean';

const selectTaskState = (state: RootState) => ({
  tasks: state.tasks.tasks,
  loading: state.tasks.loading,
  error: state.tasks.error,
});

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector(selectTaskState);
  const [searchParams] = useSearchParams();

  const filters = useMemo(() => {
    return {
      searchName: searchParams.get('searchName') || undefined,
      isCompleted: stringToBoolean(searchParams.get('completed')),
      isImportant: stringToBoolean(searchParams.get('important')),
    };
  }, [searchParams]);

  const apiFiltersKey = useMemo(() => {
    return JSON.stringify(
      {
        name_like: filters.searchName,
        isCompleted: filters.isCompleted,
        isImportant: filters.isImportant,
      },
      Object.keys({ name_like: 1, isCompleted: 1, isImportant: 1 }).sort()
    );
  }, [filters]);

  const debouncedApiapiFiltersKey = useDebounce(apiFiltersKey, 500);

  useEffect(() => {
    const parsed = JSON.parse(debouncedApiapiFiltersKey);
    dispatch(fetchTasks({ filters: parsed }));
  }, [dispatch, debouncedApiapiFiltersKey]);

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
