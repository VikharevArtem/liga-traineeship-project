export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange(page: number): void;
  onLimitChange(limit: number): void;
  limitOptions?: number[];
}
