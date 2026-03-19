import { useQuery } from "@tanstack/react-query";
import api from "../api/axios"; 

const DEFAULT_INFO = {
  appName: "App Name",
  email: "info@example.com",
  phone: "91000 00000",
  type_address: "123, Food Street, Gourmet City",
  footerDescription: "Deliciously crafted meals delivered to your doorstep. Experience the best crunch in town.",
  socials: {
    instagram: "#",
    facebook: "#",
    twitter: "#",
    whatsapp: "0000000000"
  },
  workingHours: {
    weekdays: "10:00 AM - 11:00 PM",
    sunday: "11:00 AM - 11:30 PM"
  }
};

export const useSiteInfo = () => {
  return useQuery({
    queryKey: ["site-info"],
    queryFn: async () => {
      try {
        const res = await api.get("/site-settings/info/");
        // If data is empty or missing appName (typical after DB reset), use default
        if (!res.data || !res.data.appName) {
          return DEFAULT_INFO;
        }
        return res.data;
      } catch (error) {
        console.error("Failed to fetch site info:", error);
        return DEFAULT_INFO;
      }
    },
   
    placeholderData: DEFAULT_INFO,
    staleTime: 0,
    retry: 1, 
  });
};