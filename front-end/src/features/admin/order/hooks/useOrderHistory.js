import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/axios'; 
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

export const useOrderHistory = (page = 1, search = '') => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['admin-orders', 'HISTORY', page, search],
    queryFn: async () => {
      const searchParam = search ? `&order_id=${search}` : '';
      const response = await api.get(`/orders/admin/?status=HISTORY&page=${page}${searchParam}`);
      return response.data; 
    },
    refetchInterval: 30000, 
    keepPreviousData: true, 
  });

  return {
    orders: data?.results || [],
    totalCount: data?.count || 0,
    hasNext: !!data?.next,
    hasPrev: !!data?.previous,
    isLoading,
    isError,
    error: extractErrorMessages(error),
  };
};