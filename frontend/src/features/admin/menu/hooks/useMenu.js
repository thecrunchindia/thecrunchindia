import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axios";
import { toast } from "sonner";
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";

export const useMenu = (filters) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    section: "OTHERS",
    category: "",
    actual_price: "",
    offer_price: "",
    quantity: "",
    image: null,
    previewUrl: null,
    banner_image: null,
    bannerPreviewUrl: null,
    dietary_preference: "VEG",
    is_available: true,
    has_variants: false,
    variants: [],
  });

  const queryKey = [
    "menuItems",
    filters.searchQuery,
    filters.activeCategory,
    filters.activeSection,
    filters.isLowStock,
    filters.showUnavailable,
    page,
  ];

  // 1. Fetching Menu Items
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const params = {
        search: filters.searchQuery || undefined,
        category: filters.activeCategory !== "All" ? filters.activeCategory : undefined,
        section: filters.activeSection !== "All" ? filters.activeSection : undefined,
        page: page,
        low_stock: filters.isLowStock ? "true" : undefined,
        available: filters.showUnavailable ? "false" : undefined,
      };
      const response = await api.get("/inventory/admin/menu-items/", { params });
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  const items = data?.results || [];
  const totalCount = data?.count || 0;
  const hasNextPage = !!data?.next;
  const hasPreviousPage = !!data?.previous;

  // 2. Add/Update Mutation
  const mutation = useMutation({
    mutationFn: async (payload) => {
      if (editingId) {
        return api.patch(`/inventory/admin/menu-items/${editingId}/`, payload);
      }
      return api.post("/inventory/admin/menu-items/", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      queryClient.invalidateQueries({ queryKey: ["homeData"] });
      toast.success(editingId ? "Item updated successfully!" : "Item added successfully!");
      resetForm();
    },
    onError: (err) => {
      toast.error(extractErrorMessages(err));
    },
  });

  // 3. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/inventory/admin/menu-items/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      toast.success("Item removed");
    },
    onError: () => toast.error("Delete failed"),
  });

  const handleImageChange = (e, type = "product") => {
    const file = e.target.files[0];
    if (file) {
      if (type === "banner") {
        setFormData((prev) => ({ ...prev, banner_image: file, bannerPreviewUrl: URL.createObjectURL(file) }));
      } else {
        setFormData((prev) => ({ ...prev, image: file, previewUrl: URL.createObjectURL(file) }));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      section: "OTHERS",
      category: "",
      actual_price: "",
      offer_price: "",
      quantity: "",
      image: null,
      previewUrl: null,
      banner_image: null,
      bannerPreviewUrl: null,
      dietary_preference: "VEG",
      is_available: true,
      has_variants: false,
      variants: [],
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // MODIFIED: Only Character Limit Validation (150 chars max)
    const description = formData.description || "";
    if (description.length > 150) {
      toast.error("Description must not exceed 150 characters.");
      return false;
    }

    // Price Validation
    if (formData.has_variants) {
      if (formData.variants.length === 0) {
        toast.error("Please add at least one variant.");
        return false;
      }
      const invalidVariant = formData.variants.find(
        (v) => v.offer_price && parseFloat(v.offer_price) > parseFloat(v.actual_price)
      );
      if (invalidVariant) {
        toast.error("Invalid Pricing: Variant offer price must be less than or equal to MRP");
        return false;
      }
    } else {
      const mrp = parseFloat(formData.actual_price);
      const offer = parseFloat(formData.offer_price);
      if (offer > mrp) {
        toast.error("Invalid Pricing: Offer price must be less than or equal to MRP");
        return false;
      }
    }

    const data = new FormData();

    // Append regular fields
    Object.keys(formData).forEach((key) => {
      if (!["previewUrl", "bannerPreviewUrl", "image", "banner_image", "variants"].includes(key)) {
        if (key === "is_available" || key === "has_variants") {
          data.append(key, formData[key] ? "true" : "false");
        } else if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      }
    });

    // Append variants in Array format using indexes
    if (formData.has_variants) {
      formData.variants.forEach((variant, index) => {
        // Creates keys like variants[0]size_name, variants[0]actual_price etc.
        data.append(`variants[${index}]size_name`, variant.size_name || "");
        data.append(`variants[${index}]actual_price`, variant.actual_price || "");
        data.append(`variants[${index}]offer_price`, variant.offer_price || "");
        data.append(`variants[${index}]quantity`, variant.quantity || "");
        data.append(`variants[${index}]is_available`, variant.is_available ? "true" : "false");
      });
    }

    if (formData.image instanceof File) data.append("image", formData.image);
    if (formData.banner_image instanceof File) data.append("banner_image", formData.banner_image);

    try {
      await mutation.mutateAsync(data);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      ...item,
      previewUrl: item.image,
      bannerPreviewUrl: item.banner_image,
      image: null,
      banner_image: null,
      has_variants: item.has_variants || false,
      variants: item.variants || [],
      actual_price: item.actual_price || "",
      offer_price: item.offer_price || "",
      quantity: item.quantity || "",
    });
  };

  return {
    items,
    totalCount,
    formData,
    setFormData,
    editingId,
    loading: mutation.isPending,
    fetching: isFetching,
    isLoading,
    error: error ? "Failed to fetch menu items" : null,
    fileInputRef,
    bannerInputRef,
    handleImageChange,
    handleSubmit,
    handleEdit,
    handleDelete: deleteMutation.mutate,
    resetForm,
    page,
    setPage,
    hasNextPage,
    hasPreviousPage,
  };
};