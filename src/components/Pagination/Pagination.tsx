import { Pagination } from '@mui/material';
import { PaginationProps } from './Pagination.types';
import { StyledPaginationWrapper } from './Pagination.styles';

export const MyPagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <StyledPaginationWrapper>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        color="primary"
        size="medium"
      />
    </StyledPaginationWrapper>
  );
};
