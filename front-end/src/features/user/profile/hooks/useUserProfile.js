import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axios"; 
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";
import { toast } from "sonner";
import { useState } from "react";

export const useUserProfile = () => {
  const queryClient = useQueryClient();
  const [validationError, setValidationError] = useState(null);

  const profileQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const response = await api.get("/auth/profile/"); 
        return response.data;
      } catch (err) {
        const errorMessage = extractErrorMessages(err);
        throw new Error(errorMessage || "Failed to load profile");
      }
    },
    staleTime: 0,
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      setValidationError(null);
      
      if (updatedData.name.trim().length < 3) {
        throw new Error("Name must be at least 3 characters long");
      }

      try {
        const { name, email } = updatedData;
        const response = await api.patch("/auth/profile/", { name, email });
        return response.data;
      } catch (err) {
        const errorMessage = extractErrorMessages(err);
        throw new Error(errorMessage || "Update failed");
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["userProfile"], data);
      toast.success("Profile updated successfully!");
      setValidationError(null);
    },
    onError: (error) => {
      setValidationError(error.message);
      toast.error(error.message);
    },
  });

  const clearErrors = () => setValidationError(null);

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    refetchProfile: profileQuery.refetch,
    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    validationError,
    clearErrors
  };
};

export default useUserProfile;