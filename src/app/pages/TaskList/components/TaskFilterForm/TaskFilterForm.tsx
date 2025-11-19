import { useSearchParams } from 'react-router-dom';
import './TaskFilterForm.css';
import { Checkbox } from 'components/Checkbox';
import { SearchInput } from 'components/SearchInput';
import { Button } from 'components/Button/Button';

export function TaskFilterForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchName = searchParams.get('searchName') || '';
  const isCompletedParam = searchParams.get('isCompleted');
  const isImportantParam = searchParams.get('isImportant');

  const isCompleted = isCompletedParam === 'true';
  const isImportant = isImportantParam === 'true';

  const handleSearchChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('searchName', value);
    } else {
      newParams.delete('searchName');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleCompletedChange = () => {
    const newParams = new URLSearchParams(searchParams);
    if (isCompleted) {
      newParams.delete('isCompleted');
    } else {
      newParams.set('isCompleted', 'true');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleImportantChange = () => {
    const newParams = new URLSearchParams(searchParams);
    if (isImportant) {
      newParams.delete('isImportant');
    } else {
      newParams.set('isImportant', 'true');
    }
    setSearchParams(newParams, { replace: true });
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
      <Button onClick={handleReset}>Сбросить фильтры</Button>
    </div>
  );
}
