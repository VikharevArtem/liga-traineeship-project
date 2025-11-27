import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useClientPagination = (totalItems: number, defaultLimit = 5) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get('p');
  const page = useMemo(() => {
    const num = rawPage ? parseInt(rawPage, 10) : 1;
    return isNaN(num) || num < 1 ? 1 : num;
  }, [rawPage]);

  const limit = defaultLimit;

  const totalResults = totalItems;
  const totalPages = Math.ceil(totalResults / limit);

  const safePage = useMemo(() => {
    return page > totalPages && totalPages > 0 ? totalPages : page;
  }, [page, totalPages]);

  const from = (safePage - 1) * limit;
  const to = Math.min(from + limit, totalResults);

  const paginatedItems = useMemo(() => {
    return { from, to };
  }, [from, to]);

  const goToPage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams);
      if (newPage > 0) {
        params.set('p', newPage.toString());
      } else {
        params.delete('p');
      }
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  return {
    pagination: {
      page: safePage,
      limit,
      totalPages,
      totalResults,
    },
    paginatedItems,
    goToPage,
  };
};
