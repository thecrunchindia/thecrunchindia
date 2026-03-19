import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../../api/axios'; 
import { toast } from 'sonner';
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

export const useNewOrders = () => {
  const queryClient = useQueryClient();

  // 1. Fetch Orders
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['admin-orders', 'PLACED'],
    queryFn: async () => {
      const response = await api.get(`/orders/admin/?status=PLACED`);
      return response.data;
    },
    refetchInterval: 5000, // Polling every 5 seconds
  });

  // 2. Update Status (Accept/Cancel)
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }) => {
      const response = await api.patch(`/orders/admin/${orderId}/status/`, {
        status: status
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['admin-orders']);
      let message = "Order Updated Successfully";
      if (variables.status === 'PREPARING') {
        message = "Order Accepted Successfully";
      } else if (variables.status === 'CANCELLED') {
        message = "Order Cancelled Successfully";
      }
      
      toast.success(message);
    },
    onError: (error) => {
      const message = extractErrorMessages(error);
      toast.error(message || "Failed to update order");
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