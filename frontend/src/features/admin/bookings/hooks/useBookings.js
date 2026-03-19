import { useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axios";
import { extractErrorMessages } from "../../../../utils/extractErrorMessages"; 

export const useBookings = () => {
  const queryClient = useQueryClient(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["bookings", searchTerm],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get(`/bookings/all/`, {
        params: { search: searchTerm, page: pageParam },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.next_page_url) {
        const url = new URL(lastPage.next_page_url);
        return url.searchParams.get("page");
      }
      return undefined;
    },
    staleTime: 0,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  const bookings = data?.pages.flatMap((page) => page.data) || [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const showLess = () => {
    queryClient.setQueryData(["bookings", searchTerm], (oldData) => {
      if (!oldData) return undefined;
      return {
        pages: [oldData.pages[0]],
        pageParams: [oldData.pageParams[0]],
      };
    });

     const topElement = document.getElementById('top-of-bookings');
  if (topElement) {
    topElement.scrollIntoView({ behavior: 'smooth' });
  }
  };

  const toggleRow = (id) => setExpandedRow((prev) => (prev === id ? null : id));
  const clearFilters = () => setSearchTerm("");

  return {
    searchTerm,
    setSearchTerm,
    expandedRow,
    toggleRow,
    bookings,
    clearFilters,
    loading: isLoading,
    loadingMore: isFetchingNextPage,
    hasNextPage,
    loadMore,
    showLess,
    currentPage: data?.pages.length || 1,
    error: isError ? extractErrorMessages(error) : null, 
    refresh: refetch,
  };
};

export default useBookings;