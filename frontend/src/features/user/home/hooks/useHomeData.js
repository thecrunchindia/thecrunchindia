import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axios";
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";

export const useHomeData = () => {
  return useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      try {
        const [bannersRes, combosRes, bestSellersRes, specialsRes, categoriesRes, feedbacksRes , faqsRes] = await Promise.all([
          api.get("/inventory/public/menu-items/?section=BANNER"),
          api.get("/inventory/public/menu-items/?section=COMBO MENU"),
          api.get("/inventory/public/menu-items/?section=BEST SELLER"),
          api.get("/inventory/public/menu-items/?section=TODAY'S SPECIAL"),
          api.get("/inventory/public/categories/"),
          api.get("/feedback/list/"),
          api.get("/faq/list/")
        ]);

        const getValidatedItems = (res, sectionName) => {
          const rawData = Array.isArray(res.data) ? res.data : res.data.results || [];
          return rawData.filter(item => item.section === sectionName);
        };

        return {
          banners: getValidatedItems(bannersRes, "BANNER"),
          combos: getValidatedItems(combosRes, "COMBO MENU"),
          bestSellers: getValidatedItems(bestSellersRes, "BEST SELLER"),
          specials: getValidatedItems(specialsRes, "TODAY'S SPECIAL"),
          categories: Array.isArray(categoriesRes.data) ? categoriesRes.data : categoriesRes.data.results || [],
          feedbacks: Array.isArray(feedbacksRes.data) ? feedbacksRes.data : feedbacksRes.data.results || [],
          faqs: Array.isArray(faqsRes.data) ? faqsRes.data : faqsRes.data.results || []
        };
      } catch (err) {
        const errorMessage = extractErrorMessages(err);
        throw new Error(errorMessage); 
      }
    },
    staleTime: 0, 
    refetchOnWindowFocus: true, 
  });
};

export default useHomeData;