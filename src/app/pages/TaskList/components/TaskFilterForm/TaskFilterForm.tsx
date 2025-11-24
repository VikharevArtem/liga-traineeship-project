import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { taskFilterConfig } from './TaskFilterForm.config';
import { FilterKey } from './TaskFilterForm.types';
import { useTaskFilters } from 'src/hooks/useTaskFilters';
import { Button } from 'components/Button/Button';
import { SearchInput } from 'components/SearchInput';
import './TaskFilterForm.css';

export function TaskFilterForm() {
  const { form, setFilter, resetFilters, hasActiveFilters } = useTaskFilters();
  const { control, setValue } = form;

  const [filtersOpen, setFiltersOpen] = useState(false);
  const toggleFilters = () => setFiltersOpen((prev) => !prev);

  return (
    <div className="filter-wrap">
      <div className="filter-control">
        <label>
          Поиск по названию
          <Controller
            name="searchName"
            control={control}
            render={({ field }) => (
              <SearchInput
                value={field.value}
                onChange={field.onChange}
                onReset={() => setValue('searchName', '')}
                placeholder="Введите название"
              />
            )}
          />
        </label>
        <div onClick={toggleFilters} role="button" tabIndex={0} aria-label="Фильтры">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 1024 1024">
            <path
              fill="currentColor"
              d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48"
            />
          </svg>
        </div>
      </div>

      <div className="filter-params">
        {filtersOpen && (
          <>
            <p>Выберите фильтры</p>
            {(Object.keys(taskFilterConfig) as Array<FilterKey>).map((key) => {
              const config = taskFilterConfig[key];
              const selectedOption = config.options.find((opt) => opt.boolean === form.getValues()[key]);
              const selectValue = selectedOption?.value || '';

              return (
                <label key={key}>
                  {config.label}
                  <Controller
                    name={key}
                    control={control}
                    render={({ field }) => (
                      <select
                        value={selectValue}
                        onChange={(e) => {
                          const option = config.options.find((opt) => opt.value === e.target.value);
                          const booleanValue = option ? option.boolean : null;
                          field.onChange(booleanValue);
                          setFilter(key, booleanValue);
                        }}>
                        <option value="">Все задачи</option>
                        {config.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
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
