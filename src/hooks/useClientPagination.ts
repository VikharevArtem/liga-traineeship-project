import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useClientPagination = (totalItems: number, defaultLimit = 5) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = searchParams.get('p');
  const page = useMemo(() => {
    const num = rawPage ? parseInt(rawPage, 10) : 1;
    return isNaN(num) || num < 1 ? 1 : num;
  }, [rawPage]);

  const rawLimit = searchParams.get('l');
  const limit = useMemo(() => {
    const num = rawLimit ? parseInt(rawLimit, 10) : defaultLimit;
    return isNaN(num) || num < 1 ? defaultLimit : num;
  }, [rawLimit, defaultLimit]);

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

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage > 0) {
      params.set('p', newPage.toString());
    } else {
      params.delete('p');
    }
    setSearchParams(params);
  };

  const setLimit = (newLimit: number) => {
    const params = new URLSearchParams(searchParams);
    if (newLimit > 0) {
      params.set('l', newLimit.toString());
    } else {
      params.delete('l');
    }
    params.set('p', '1');
    setSearchParams(params);
  };

  return {
    pagination: {
      page: safePage,
      limit,
      totalPages,
      totalResults,
    },
    paginatedItems,
    goToPage,
    setLimit,
  };
};
