import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../../api/axios';
import { toast } from 'sonner';
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

export const usePreparingOrders = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['admin-orders', 'PREPARING'],
    queryFn: async () => {
      const response = await api.get(`/orders/admin/?status=PREPARING`);
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
      if (variables.status === 'ON_THE_WAY') {
        toast.success("Order is out for delivery!");
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