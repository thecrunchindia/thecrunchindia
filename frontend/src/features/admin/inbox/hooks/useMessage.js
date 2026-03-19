import { useState } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../../api/axios';
import { toast } from 'sonner';

export const useInbox = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  // 1. TanStack Infinite Query for Fetching & Searching
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['messages', searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get('/admin/contacts/', {
        params: { page: pageParam, search: searchQuery },
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
    staleTime: 5000,
    refetchInterval: 10000, 
    refetchIntervalInBackground: true,
  });

  // Flat existing pages into a single messages array
  const messages = data?.pages.flatMap((page) => page.data) || [];
  const totalItems = data?.pages[0]?.total_items || 0;

  // 2. Mutation for Sending Reply
  const replyMutation = useMutation({
    mutationFn: async ({ id, replyText }) => {
      const response = await api.post(`/admin/contacts/${id}/reply/`, {
        reply_message: replyText
      });
      return { id, replyText, ...response.data };
    },
    onSuccess: () => {
      // ഡാറ്റ റിഫ്രഷ് ചെയ്യാതെ തന്നെ ലിസ്റ്റിൽ അപ്ഡേറ്റ് കാണാൻ
      queryClient.invalidateQueries(['messages']);
      toast.success("Reply sent successfully!");
    },
    onError: () => {
      toast.error("Failed to send reply. Please try again.");
    }
  });

  const handleSeeMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

const handleShowLess = () => {
  queryClient.setQueryData(['messages', searchQuery], (oldData) => {
    if (!oldData) return undefined;
    return {
      pages: [oldData.pages[0]],
      pageParams: [oldData.pageParams[0]],
    };
  });

  const topElement = document.getElementById('top-of-page');
  if (topElement) {
    topElement.scrollIntoView({ behavior: 'smooth' });
  }
};

  const toggleMessage = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const sendReply = async (id, replyText) => {
    try {
      await replyMutation.mutateAsync({ id, replyText });
      return true;
    } catch {
      return false;
    }
  };

  return { 
    messages, 
    searchQuery,
    setSearchQuery,
    hasMore: hasNextPage,
    loadingMore: isFetchingNextPage,
    page: data?.pages.length || 1,
    totalItems,
    handleSeeMore,
    handleShowLess,
    expandedId, 
    isLoading, 
    error: isError ? "Failed to load messages" : null, 
    toggleMessage, 
    sendReply 
  };
};