import { useState } from 'react';
import { taskFilterConfig } from 'app/pages/TaskList/components/TaskFilterForm/TaskFilterForm.config';
import { FilterKey } from 'app/pages/TaskList/components/TaskFilterForm/TaskFilterForm.types';
import { useTaskFilters } from 'src/hooks/useTaskFilters';
import { Button } from 'components/Button/Button';
import { SearchInput } from 'components/SearchInput';
import 'app/pages/TaskList/components/TaskFilterForm/TaskFilterForm.css';

export function TaskFilterForm() {
  const { filters, setSearchName, setFilter, resetFilters, hasActiveFilters } = useTaskFilters();

  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const toggleFilters = () => setFiltersOpen(!filtersOpen);

  const handleSearchReset = () => {
    setSearchName('');
  };

  const handleChange = (key: FilterKey) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const options = taskFilterConfig[key].options;
    const option = options.find((opt) => opt.value === value);
    setFilter(key, option ? option.boolean : null);
  };

  const getSelectValue = (key: FilterKey): string => {
    const options = taskFilterConfig[key].options;
    const option = options.find((opt) => opt.boolean === filters[key]);
    return option?.value || '';
  };

  return (
    <div className="filter-wrap">
      <div className="filter-control">
        <label>
          Поиск по названию
          <SearchInput
            value={filters.searchName}
            onChange={setSearchName}
            onReset={handleSearchReset}
            placeholder="Введите название"
          />
        </label>
        <a onClick={toggleFilters}>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 1024 1024">
            <path
              fill="currentColor"
              d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48"
            />
          </svg>
        </a>
      </div>
      <div className="filter-params">
        {filtersOpen && (
          <>
            <p>Выбирете фильтры</p>
            {(Object.keys(taskFilterConfig) as Array<FilterKey>).map((key) => {
              const config = taskFilterConfig[key];
              return (
                <label key={key}>
                  {config.label}
                  <select value={getSelectValue(key)} onChange={handleChange(key)}>
                    <option value="">Все задачи</option>
                    {config.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
              );
            })}
            <Button onClick={resetFilters} disabled={!hasActiveFilters}>
              Сбросить фильтры
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
