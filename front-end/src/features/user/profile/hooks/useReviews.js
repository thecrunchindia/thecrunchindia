import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../../api/axios';
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';
import { toast } from 'sonner';

export const useReviews = () => {
  const queryClient = useQueryClient();

  const token = localStorage.getItem('user_access');
  const isLoggedIn = !!token;

  // 1. Eligibility Check
  const { data: eligibility } = useQuery({
    queryKey: ['review-eligibility'],
    queryFn: async () => {
      const response = await api.get('/feedback/eligibility/');
      return response.data;
    },
    enabled: isLoggedIn,
  });

  // 2. Fetch Reviews List
  const { data: reviews = [], isLoading, error } = useQuery({
    queryKey: ['user-reviews'],
    queryFn: async () => {
      const response = await api.get('/feedback/list/');
      return Array.isArray(response.data) ? response.data : [];
    },
    enabled: isLoggedIn,
  });

  // 3. Create Review Mutation
  const createReviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      const response = await api.post('/feedback/create/', reviewData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Review submitted for approval!");
      queryClient.invalidateQueries(['user-reviews']);
      queryClient.invalidateQueries(['review-eligibility']);
    },
    onError: (err) => {
      toast.error(extractErrorMessages(err));
    }
  });

  return {
    reviews,
    eligibility,
    isLoading,
    error: error ? extractErrorMessages(error) : null,
    createReview: createReviewMutation.mutate,
    isSubmitting: createReviewMutation.isPending
  };
};