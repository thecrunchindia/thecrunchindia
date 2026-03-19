import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/axios'; 
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

const useRevenue = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['revenue-stats'],
    queryFn: async () => {
      const response = await api.get('/revenue/profit-tracker/');
      return response.data;
    },
    refetchInterval: 60000, 
  });

  return {
    totalSales: data?.total_sales_income || 0,
    todaysIncome: data?.todays_income || { amount: 0, growth_percentage: 0 },
    salesPerformance: data?.sales_performance?.map(item => ({
      date: item.date,
      amount: item.revenue
    })) || [],
    isLoading,
    isError,
    error: extractErrorMessages(error),
    refetch
  };
};

export default useRevenue;