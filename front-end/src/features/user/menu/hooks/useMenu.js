import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import api from "../../../../api/axios";
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";

export const useMenu = () => {
  const [searchParams] = useSearchParams();
  const urlCategoryId = searchParams.get('category'); 
  const searchQueryURL = searchParams.get('search'); 

  const [activeCategoryId, setActiveCategoryId] = useState(urlCategoryId || 'All');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    setActiveCategoryId(urlCategoryId || 'All');
  }, [urlCategoryId]);

  // 1. Fetch Categories 
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await api.get("/inventory/public/categories/");
        return Array.isArray(res.data) ? res.data : res.data.results || [];
      } catch (err) {
        throw new Error(extractErrorMessages(err));
      }
    },
    staleTime: 0,
  });

  // 2. Fetch ALL Menu Items 
  const { data: allItems = [] } = useQuery({
    queryKey: ["allMenuItemsMaster"],
    queryFn: async () => {
      try {
        const res = await api.get("/inventory/public/menu-items/");
        return Array.isArray(res.data) ? res.data : res.data.results || [];
      } catch (err) {
        return [];
      }
    },
    staleTime: 0,
  });

  // 3. Fetch Filtered Menu Items 
  const { data: menuItems, isLoading, error, refetch } = useQuery({
    queryKey: ["menuItems", activeCategoryId, filterType, searchQueryURL],
    queryFn: async () => {
      try {
        let params = new URLSearchParams();

        if (searchQueryURL) params.append('search', searchQueryURL);
        
        if (activeCategoryId !== 'All') params.append('category', activeCategoryId);

        if (filterType !== 'All') params.append('diet', filterType.toUpperCase());

        const res = await api.get(`/inventory/public/menu-items/`, { params });
        return Array.isArray(res.data) ? res.data : res.data.results || [];
      } catch (err) {
        throw new Error(extractErrorMessages(err));
      }
    },
  });

  const categories = [{ id: 'All', name: 'All' }, ...(categoriesData || [])];

  return {
    categories,
    activeCategory: activeCategoryId,
    setActiveCategory: setActiveCategoryId,
    filterType,
    setFilterType,
    filteredItems: menuItems || [], 
    allItems, 
    isLoading,
    refetch,
    error,
    searchQuery: searchQueryURL 
  };
};

export default useMenu;