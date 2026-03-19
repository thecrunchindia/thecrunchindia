import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axios"; 
import { toast } from "sonner";
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";

export const useCategory = () => {
  const queryClient = useQueryClient();
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState("");

  // 1. Fetch Categories with useQuery
  const { 
    data: categories = [], 
    isLoading: fetching, 
    error: fetchError 
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get('/inventory/categories/');
      return response.data;
    },
    select: (data) => data,
    onError: (err) => toast.error(extractErrorMessages(err))
  });

  // 2. Add/Update Mutation
  const mutation = useMutation({
    mutationFn: async (newCat) => {
      const formData = new FormData();
      formData.append("name", newCat.name);
      if (newCat.image instanceof File) {
        formData.append("image", newCat.image);
      }

      if (editingCategory) {
        return api.patch(`/inventory/categories/${editingCategory.id}/`, formData);
      }
      return api.post('/inventory/categories/', formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(editingCategory ? "Category updated!" : "Category added!");
      closeModal();
    },
    onError: (err) => {
      setError(extractErrorMessages(err));
    }
  });

  // 3. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/inventory/categories/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted");
    },
    onError: () => toast.error("Failed to delete category")
  });

  const handleEditCategory = (cat) => {
    setEditingCategory(cat);
    setIsCatModalOpen(true);
  };

  const closeModal = () => {
    setIsCatModalOpen(false);
    setEditingCategory(null);
    setError("");
  };

  return { 
    categories, 
    isCatModalOpen, 
    setIsCatModalOpen, 
    addCategory: mutation.mutate, 
    deleteCategory: deleteMutation.mutate, 
    handleEditCategory,
    editingCategory, 
    closeModal, 
    loading: mutation.isPending, 
    fetching, 
    error, 
    fetchError: fetchError ? extractErrorMessages(fetchError) : "",
    fetchCategories: () => queryClient.invalidateQueries({ queryKey: ["categories"] })
  };
};