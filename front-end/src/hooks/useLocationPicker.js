import { useState, useCallback, useRef } from "react";
import { fetchLocationDetails } from "../utils/addressHelper";

const TOKEN = import.meta.env.VITE_LOCATION_IQ_TOKEN;

export const useLocationPicker = (initialPos) => {
  const [position, setPosition] = useState(initialPos || { lat: 10.0159, lng: 76.3419 });
  const [details, setDetails] = useState({ address: "Fetching...", pincode: "" });
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  const searchTimeoutRef = useRef(null);
  const debounceTimerRef = useRef(null); 

  const updatePosition = useCallback(async (newPos) => {
    setPosition(newPos);
    
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(async () => {
        const res = await fetchLocationDetails(newPos.lat, newPos.lng);
        if (res) setDetails({ address: res.formattedAddress, pincode: res.pincode });
    }, 800);
  }, []);

  const handleSearch = useCallback(async (query) => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://us1.locationiq.com/v1/search.php?key=${TOKEN}&q=${encodeURIComponent(query)}&format=json`
        );
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        setSearchResults([]); 
      } finally {
        setIsSearching(false);
      }
    }, 500); 
  }, []);

  return { position, details, searchResults, isSearching, updatePosition, handleSearch, setSearchResults };
};