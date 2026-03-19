import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/axios'; 
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

 const useDashboard = () => {
  const { data, isLoading, isError, error ,refetch } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const response = await api.get('/dashboard/admin-stats/');
      return response.data;
    },
    refetchInterval: 30000, 
  });

  return {
    stats: data?.stats || {},
    weeklyVolume: data?.weekly_volume || [],
    leaderboard: data?.leaderboard || [],
    attentionNeeded: data?.attention_needed || [],
    activeDispatch: data?.active_dispatch || [],
    isLoading,
    isError,
    refetch,
    error: extractErrorMessages(error),
  };
};

export default useDashboard;