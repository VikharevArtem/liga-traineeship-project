import 'components/Pagination/Pagination.css';
import { Button } from 'components/Button/Button';
import { PaginationProps } from 'components/Pagination/Pagination.types';

export const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onLimitChange,
  limitOptions = [5, 10, 20],
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
        {'Назад'}
      </Button>
      <span>
        Страница {currentPage} из {totalPages}{' '}
      </span>
      <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
        {'Вперед'}
      </Button>
      <label>
        На странице:
        <select value={itemsPerPage} onChange={(e) => onLimitChange(Number(e.target.value))}>
          {limitOptions.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
