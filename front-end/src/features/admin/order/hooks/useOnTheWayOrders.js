import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../../api/axios';
import { toast } from 'sonner';
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

export const useOnTheWayOrders = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['admin-orders', 'ON_THE_WAY'],
    queryFn: async () => {
      const response = await api.get(`/orders/admin/?status=ON_THE_WAY`);
      return response.data;
    },
    refetchInterval: 5000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }) => {
      const response = await api.patch(`/orders/admin/${orderId}/status/`, {
        status: status
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['admin-orders']);
      if (variables.status === 'DELIVERED') {
        toast.success("Order marked as Delivered!");
      } else if (variables.status === 'CANCELLED') {
        toast.success("Order cancelled");
      }
    },
    onError: (error) => {
      toast.error(extractErrorMessages(error));
    }
  });

  return {
    orders: data || [],
    isLoading,
    isError,
    error: extractErrorMessages(error),
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending
  };
};