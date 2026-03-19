import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import api from '../../../../api/axios'; 
import { fetchLocationDetails } from '../../../../utils/addressHelper';
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

export const useSettings = () => {
  const [settings, setSettings] = useState({
    appName: "",
    email: "",
    phone: "",
    address: "",
    type_address: "",
    latitude: null,
    longitude: null,
    deliveryRadius: 0,
    footerDescription: "",
    openingTime: "10:00:00",
    closingTime: "02:00:00",
    isManuallyOpen: true,
    isOpen: true,
    workingHours: { weekdays: "", sunday: "" },
    socials: { instagram: "", facebook: "", twitter: "", whatsapp: "" }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/site-settings/info/');
      if (response.data) {
        setSettings(prev => ({ ...prev, ...response.data }));
      }
    } catch (error) {
     const msg = extractErrorMessages(error);
      setError(msg); 
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const toggleShopStatus = useCallback(async () => {
    const previousStatus = settings.isManuallyOpen;
    const newStatus = !previousStatus;
    setSettings(prev => ({ ...prev, isManuallyOpen: newStatus }));

    try {
      // MODIFIED: Changed to PATCH and only sending the required field
      const response = await api.patch('/site-settings/info/', {
        isManuallyOpen: newStatus 
      });
      if (response.data) {
        setSettings(prev => ({ ...prev, ...response.data }));
      }
      toast.success(`Shop is now manually ${newStatus ? 'OPEN' : 'CLOSED'}`);
    } catch (error) {
      setSettings(prev => ({ ...prev, isManuallyOpen: previousStatus }));
      toast.error("Could not update shop status");
    }
  }, [settings]);

  const saveSettings = useCallback(async () => {
    setIsSaving(true);
    const toastId = toast.loading("Updating settings...");
    try {
      const ensureSeconds = (timeStr) => {
        if (!timeStr) return undefined; // MODIFIED: Changed to undefined
        const parts = timeStr.split(':');
        if (parts.length === 2) return `${timeStr}:00`;
        return timeStr;
      };

      const payload = {
        ...settings,
        deliveryRadius: parseFloat(settings.deliveryRadius) || 0,
        latitude: settings.latitude ? parseFloat(settings.latitude) : undefined,
        longitude: settings.longitude ? parseFloat(settings.longitude) : undefined,
        openingTime: ensureSeconds(settings.openingTime),
        closingTime: ensureSeconds(settings.closingTime),
      };

      // MODIFIED: Remove empty/null fields before sending the PATCH request
      Object.keys(payload).forEach(key => {
        if (payload[key] === "" || payload[key] === null || payload[key] === undefined) {
          delete payload[key];
        }
      });

      // MODIFIED: Changed from api.put to api.patch
      const response = await api.patch('/site-settings/info/', payload);
      
      if (response.data) {
        setSettings(prev => ({ ...prev, ...response.data }));
      }
      toast.success("Details updated successfully!", { id: toastId });
    } catch (error) {
      toast.error(extractErrorMessages(error), { id: toastId });
    } finally {
      setIsSaving(false);
    }
  }, [settings]);

  const handleMapClick = async (lat, lng, isLocked) => {
    if (isLocked) return;
    const fixedLat = parseFloat(lat.toFixed(6));
    const fixedLng = parseFloat(lng.toFixed(6));
    setSettings(prev => ({ ...prev, latitude: fixedLat, longitude: fixedLng }));
    try {
      const locationData = await fetchLocationDetails(fixedLat, fixedLng);
      if (locationData?.formattedAddress) {
        setSettings(prev => ({ ...prev, address: locationData.formattedAddress }));
        setSearchQuery("");
      }
    } catch (error) { console.error(error); }
  };

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) { toast.error("Geolocation not supported"); return; }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
        await handleMapClick(pos.coords.latitude, pos.coords.longitude, false);
        setIsLocating(false);
        toast.success("Location updated!");
      }, () => { setIsLocating(false); toast.error("Location access denied"); }
    );
  }, [handleMapClick]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length < 3) {
        searchResults.length && setSearchResults([]);
        showDropdown && setShowDropdown(false);
        return;
      }
      setIsSearching(true);
      try {
        const TOKEN = import.meta.env.VITE_LOCATION_IQ_TOKEN;
        const res = await fetch(`https://us1.locationiq.com/v1/search.php?key=${TOKEN}&q=${searchQuery}&format=json&limit=5`);
        if (res.ok) {
          setSearchResults(await res.json());
          setShowDropdown(true);
        }
      } catch (e) { console.error(e); } finally { setIsSearching(false); }
    }, 600);
    return () => clearTimeout(delayDebounceFn);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return {
    settings, isLoading, error, fetchSettings, isSaving, isLocating, getCurrentLocation,
    handleChange, handleNestedChange, handleMapClick, saveSettings,
    toggleShopStatus, searchQuery, setSearchQuery, searchResults, 
    isSearching, showDropdown, setShowDropdown
  };
};