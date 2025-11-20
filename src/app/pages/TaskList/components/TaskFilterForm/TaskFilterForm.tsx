import { useSearchParams } from 'react-router-dom';
import './TaskFilterForm.css';
import { Checkbox } from 'components/Checkbox';
import { SearchInput } from 'components/SearchInput';
import { Button } from 'components/Button/Button';

export function TaskFilterForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchName = searchParams.get('searchName') || '';
  const isCompleted = searchParams.get('isCompleted') === 'true';
  const isImportant = searchParams.get('isImportant') === 'true';

  const hasActiveFilters = searchName || isCompleted || isImportant;

  const updateSearchParams = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleSearchChange = (value: string) => {
    updateSearchParams('searchName', value === '' ? null : value);
  };

  const handleCompletedChange = () => {
    updateSearchParams('isCompleted', isCompleted ? null : 'true');
  };

  const handleImportantChange = () => {
    updateSearchParams('isImportant', isImportant ? null : 'true');
  };

  const handleReset = () => {
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="filter-wrap">
      <div className="filter-control">
        <SearchInput value={searchName} onChange={handleSearchChange} onReset={() => handleSearchChange('')} />
        <Checkbox label="Завершенные" checked={isCompleted} onChange={handleCompletedChange} />
        <Checkbox label="Важные" checked={isImportant} onChange={handleImportantChange} />
      </div>
      <Button
        buttonClassName={!hasActiveFilters ? 'btn-disabled' : ''}
        onClick={handleReset}
        disabled={!hasActiveFilters}>
        Сбросить фильтры
      </Button>
    </div>
  );
}
