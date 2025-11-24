import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TaskFilters } from 'app/pages/TaskList/components/TaskFilterForm/TaskFilterForm.types';
import { stringToBoolean } from 'utils/stringsToBolean';
import { useDebounce } from 'src/hooks/useDebounce';
import { SEARCH_DEBOUNCE_DELAY } from 'constants/debounceConstants';

export const useTaskFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Читаем фильтры из URL
  const defaultValues = {
    searchName: searchParams.get('searchName') || '',
    important: stringToBoolean(searchParams.get('important')),
    completed: stringToBoolean(searchParams.get('completed')),
  };

  const form = useForm<TaskFilters>({
    defaultValues,
  });

  const { watch, reset } = form;
  const searchName = watch('searchName');
  const debouncedSearch = useDebounce(searchName, SEARCH_DEBOUNCE_DELAY);

  // Синхронизация: если URL изменился — обновляем форму
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  // Обновляем URL для searchName после debounce
  useEffect(() => {
    const current = searchParams.get('searchName') || '';
    if (debouncedSearch !== current) {
      const newParams = new URLSearchParams(searchParams);
      if (debouncedSearch) {
        newParams.set('searchName', debouncedSearch);
      } else {
        newParams.delete('searchName');
      }
      setSearchParams(newParams, { replace: true });
    }
  }, [debouncedSearch, searchParams, setSearchParams]);

  // Универсальная функция для других фильтров
  const setFilter = <K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === null || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
    setSearchParams(newParams, { replace: true });
  };

  const resetFilters = () => {
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters =
    !!searchParams.get('searchName') ||
    stringToBoolean(searchParams.get('important')) !== null ||
    stringToBoolean(searchParams.get('completed')) !== null;

  return {
    form,
    setFilter,
    resetFilters,
    hasActiveFilters,
  };
};
