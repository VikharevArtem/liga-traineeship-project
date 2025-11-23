import { useSearchParams } from 'react-router-dom';
import { FilterKey } from './TaskFilterForm.types';
import { stringToBoolean } from 'utils/stringsToBolean';

export const useTaskFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    searchName: searchParams.get('searchName') || '',
    important: stringToBoolean(searchParams.get('important')),
    completed: stringToBoolean(searchParams.get('completed')),
  };

  const setFilter = (key: FilterKey, value: boolean | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }

    setSearchParams(newParams, { replace: true });
  };

  const setSearchName = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('searchName', value);
    } else {
      newParams.delete('searchName');
    }
    setSearchParams(newParams, { replace: true });
  };

  const resetFilters = () => {
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters = filters.searchName || filters.important !== null || filters.completed !== null;

  return {
    filters,
    setFilter,
    setSearchName,
    resetFilters,
    hasActiveFilters,
  };
};
