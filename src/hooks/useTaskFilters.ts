import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { TaskFilters } from 'app/pages/TaskList/components/TaskFilterForm/TaskFilterForm.types';
import { stringToBoolean } from 'utils/stringsToBolean';
import { useDebounce } from 'src/hooks/useDebounce';
import { SEARCH_DEBOUNCE_DELAY } from 'constants/debounceConstants';

export const useTaskFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlValues = useMemo(() => {
    return {
      searchName: searchParams.get('searchName') || '',
      important: stringToBoolean(searchParams.get('important')),
      completed: stringToBoolean(searchParams.get('completed')),
    };
  }, [searchParams]);

  const form = useForm<TaskFilters>({
    defaultValues: urlValues,
    mode: 'onChange',
  });

  const { watch } = form;
  const searchName = watch('searchName');
  const debouncedSearch = useDebounce(searchName, SEARCH_DEBOUNCE_DELAY);

  useEffect(() => {
    const formSearch = form.getValues('searchName');
    const formImportant = form.getValues('important');
    const formCompleted = form.getValues('completed');

    const needsUpdate =
      formSearch !== urlValues.searchName ||
      formImportant !== urlValues.important ||
      formCompleted !== urlValues.completed;

    if (needsUpdate) {
      form.reset(
        {
          searchName: urlValues.searchName,
          important: urlValues.important,
          completed: urlValues.completed,
        },
        { keepDirty: false, keepErrors: false }
      );
    }
  }, [urlValues, form]);

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
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('important');
    newParams.delete('completed');
    setSearchParams(newParams, { replace: true });
  };

  const hasActiveFilters =
    stringToBoolean(searchParams.get('important')) !== null || stringToBoolean(searchParams.get('completed')) !== null;

  return {
    form,
    setFilter,
    resetFilters,
    hasActiveFilters,
  };
};
