import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axios";
import { extractErrorMessages } from "../../../../utils/extractErrorMessages"; 

export const useReviews = () => {
  const queryClient = useQueryClient(); 
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reviews", page, searchTerm], 
    queryFn: async () => {
      const response = await api.get(`/feedback/admin/list/`, {
        params: { 
          page: page,
          search: searchTerm 
        },
      });
      return response.data;
    },
    keepPreviousData: true,
    staleTime: 5000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ reviewId, isApproved }) => {
      const response = await api.patch(`/feedback/admin/${reviewId}/update/`, {
        is_approved: isApproved,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const reviews = data?.results || []; 
  const totalItems = data?.count || 0;
  
  const totalPages = Math.ceil(totalItems / 12) || 1;

  return {
    reviews,
    page,
    setPage,
    searchTerm,
    setSearchTerm, 
    totalItems,
    totalPages, 
    loading: isLoading,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isLoading,
    error: isError ? extractErrorMessages(error) : null, 
    refresh: refetch,
    hasNextPage: !!data?.next,    
    hasPrevPage: !!data?.previous,
  };
};

export default useReviews;