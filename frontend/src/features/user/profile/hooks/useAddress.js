import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import api from "../../../../api/axios"; 
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";
import { fetchLocationDetails } from "../../../../utils/addressHelper";
import { toast } from "sonner";

export const useAddress = () => {
  const queryClient = useQueryClient();
  const [isLocating, setIsLocating] = useState(false);
  
  const isLoggedIn = !!localStorage.getItem('user_access');

  const addressQuery = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await api.get("/auth/addresses/");
      return response.data; 
    },
    enabled: isLoggedIn, 
    staleTime: 60000, 
    retry: false,
  });

  const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        toast.error("GPS not supported on this browser.");
        return reject("Not supported");
      }
      
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const details = await fetchLocationDetails(latitude, longitude);
            setIsLocating(false);
            resolve({ latitude, longitude, ...details });
          } catch (err) {
            setIsLocating(false);
            reject(err);
          }
        },
        (error) => {
          setIsLocating(false);
          switch(error.code) {
            case error.PERMISSION_DENIED:
              toast.warning("Location access denied. Please enable it.");
              break;
            case error.POSITION_UNAVAILABLE:
              toast.warning("Please enable your location ");
              break;
            case error.TIMEOUT:
              toast.error("Location request timed out. Please try again.");
              break;
            default:
              toast.error("An unknown error occurred while getting location.");
              break;
          }
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } 
      );
    });
  };

  const addAddress = useMutation({
    mutationFn: (newData) => api.post("/auth/addresses/", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
      toast.success("Address added successfully");
    },
    onError: (err) => toast.error(extractErrorMessages(err))
  });

  const updateAddress = useMutation({
    mutationFn: ({ id, data }) => api.patch(`/auth/addresses/${id}/`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
      toast.success("Address updated successfully");
    },
    onError: (err) => toast.error(extractErrorMessages(err))
  });

  const deleteAddress = useMutation({
    mutationFn: (id) => api.delete(`/auth/addresses/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
      toast.success("Address deleted successfully");
    },
    onError: (err) => toast.error(extractErrorMessages(err))
  });

  return {
    addresses: addressQuery.data || [],
    isLoading: addressQuery.isLoading && isLoggedIn,
    isLocating,
    getCurrentLocation,
    addAddress: addAddress.mutateAsync,
    updateAddress: updateAddress.mutateAsync,
    deleteAddress: deleteAddress.mutateAsync,
    isAdding: addAddress.isPending,
  };
};

export default useAddress;