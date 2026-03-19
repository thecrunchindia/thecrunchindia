import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../../api/axios';
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';
import { toast } from 'sonner';

export const useOrderHistory = () => {
  const queryClient = useQueryClient();

  // Fetch Orders
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get('/orders/history/');
      return response.data.sort((a, b) => b.id - a.id);
    },
  });

  // Cancel Order Mutation
  const cancelMutation = useMutation({
    mutationFn: async (orderId) => {
      return await api.post(`/orders/cancel/${orderId}/`);
    },
    onSuccess: () => {
      toast.success("Order cancelled successfully");
      queryClient.invalidateQueries(['orders']); 
    },
    onError: (err) => {
      toast.error(extractErrorMessages(err));
    }
  });

  return { 
    orders, 
    isLoading, 
    error: error ? extractErrorMessages(error) : null,
    cancelOrder: cancelMutation.mutate,
    isCancelling: cancelMutation.isPending
  };
};