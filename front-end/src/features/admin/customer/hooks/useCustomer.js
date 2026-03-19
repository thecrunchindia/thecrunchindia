import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from "../../../../api/axios";
import { toast } from "sonner";
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";

const useCustomer = (searchTerm, statusFilter) => {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isError
  } = useInfiniteQuery({
    queryKey: ['customers', searchTerm, statusFilter],
    queryFn: async ({ pageParam = 1 }) => {
      const params = { search: searchTerm, page: pageParam };
      
      if (statusFilter === "Blocked") {
        params.status = "blocked"; 
      } else if (statusFilter === "Active") {
        params.status = "active";  
      }

      const response = await api.get("/customers/", { params });
      return response.data; 
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return url.searchParams.get('page');
      }
      return undefined;
    },
  });

  const resetList = async () => {
    await queryClient.resetQueries({ queryKey: ['customers', searchTerm, statusFilter] });
  };

  const handleShowLess = async () => {
    await resetList(); 
    const topElement = document.getElementById('top-of-customers');
    if (topElement) {
      topElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMutation = useMutation({
    mutationFn: async (id) => {
      const res = await api.post(`/customers/${id}/toggle-block/`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Status updated");
      queryClient.invalidateQueries(['customers']);
    },
    onError: (err) => {
      toast.error(extractErrorMessages(err));
    }
  });

  const exportToCSV = async () => {
    try {
      const res = await api.get(`/customers/export/csv/`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "customers.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("CSV downloaded");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };

  const customers = data?.pages.flatMap(page => page.results) || [];
  const totalCount = data?.pages[0]?.count || 0;

  return {
    customers,
    isLoading,
    isError,
    totalCount,
    isMoreLoading: isFetchingNextPage,
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
    toggleBlockStatus: toggleMutation.mutate,
    exportToCSV,
    handleShowLess,
    isExporting: false,
    error: error ? extractErrorMessages(error) : null,
    resetList
  };
};

export default useCustomer;