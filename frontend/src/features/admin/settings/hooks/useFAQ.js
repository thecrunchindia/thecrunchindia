import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axios";
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";

export const useFAQ = () => {
  const queryClient = useQueryClient();

  // Fetch FAQs
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const response = await api.get(`/faq/admin/list-create/`);
      return response.data;
    },
    staleTime: 5000,
  });

  // Create FAQ Mutation
  const createMutation = useMutation({
    mutationFn: async (newFaq) => {
      const response = await api.post(`/faq/admin/list-create/`, newFaq);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["faqs"]),
  });

  // Update FAQ Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.patch(`/faq/admin/edit/${id}/`, data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["faqs"]),
  });

  // Delete FAQ Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/faq/admin/delete/${id}/`);
    },
    onSuccess: () => queryClient.invalidateQueries(["faqs"]),
  });

  const faqs = Array.isArray(data) ? data : data?.results || [];

  return {
    faqs,
    loading: isLoading,
    error: isError ? extractErrorMessages(error) : null,
    createFAQ: createMutation.mutate,
    isCreating: createMutation.isPending || createMutation.isLoading,
    updateFAQ: updateMutation.mutate,
    isUpdating: updateMutation.isPending || updateMutation.isLoading,
    deleteFAQ: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending || deleteMutation.isLoading,
    refresh: refetch,
    isLimitReached: faqs.length >= 5,
  };
};

export default useFAQ;