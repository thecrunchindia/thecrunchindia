import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/axios';

export const useOrderStats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-order-stats'],
    queryFn: async () => {
      const response = await api.get('/orders/admin/stats');
      const resData = response.data;
      return {
        'NEW ORDERS': resData.new_orders || 0,
        'PREPARING': resData.preparing || 0,
        'ON THE WAY': resData.on_the_way || 0,
        'HISTORY': resData.history || 0
      };
    },
    refetchInterval: 5000, 
  });

  return {
    stats: data || { 'NEW ORDERS': 0, 'PREPARING': 0, 'ON THE WAY': 0, 'HISTORY': 0 },
    isLoading
  };
};