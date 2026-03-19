import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Navigation, Loader2, AlertCircle, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useAddress } from "../hooks/useAddress";
import LocationPicker from "../../../../components/common/LocationPicker";
import { fetchLocationDetails } from "../../../../utils/addressHelper";

const AddressForm = ({ initialData, onClose, onSubmit }) => {
  const { isLocating, getCurrentLocation } = useAddress();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [localError, setLocalError] = useState(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const [formData, setFormData] = useState({
    address_type: initialData?.address_type || "Home",
    complete_address: initialData?.complete_address || "",
    landmark: initialData?.landmark || "",
    pincode: initialData?.pincode || "",
    latitude: initialData?.latitude || null,
    longitude: initialData?.longitude || null,
    is_default: initialData?.is_default || false,
    map_address_display: initialData ? "Loading location..." : ""
  });

  useEffect(() => {
    const getInitialPlaceName = async () => {
      if (initialData?.latitude && initialData?.longitude) {
        try {
          const details = await fetchLocationDetails(initialData.latitude, initialData.longitude);
          if (details) {
            setFormData(prev => ({
              ...prev,
              map_address_display: details.formattedAddress
            }));
          }
        } catch (error) {
          setFormData(prev => ({ ...prev, map_address_display: "Location Pinned" }));
        }
      }
    };

    if (initialData) {
      getInitialPlaceName();
    }
  }, [initialData]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  const handleMapConfirm = (data) => {
    setFormData(prev => ({
      ...prev,
      latitude: parseFloat(data.lat).toFixed(6),
      longitude: parseFloat(data.lng).toFixed(6),
      map_address_display: data.address,
      pincode: data.pincode || prev.pincode
    }));
    setShowMap(false);
    toast.success("Location Pinned!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    if (formData.pincode.length !== 6) {
      setLocalError("Please enter a valid 6-digit pincode");
      return;
    }
    setIsSubmitting(true);
    try {
      const { map_address_display, ...submitData } = formData;
      await onSubmit(submitData);
    } catch (error) {
      setLocalError("Failed to save address.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    initial: { y: "100%", opacity: 0.5 },
    animate: { y: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 280, mass: 0.5 } },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center overflow-hidden p-0 md:p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={(!isSubmitting && !showMap) ? onClose : undefined}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
      />

      <motion.div
        variants={modalVariants} initial="initial" animate="animate" exit="exit"
        drag={(isMobile && !isSubmitting && !showMap) ? "y" : false}
        dragConstraints={{ top: 0 }} dragElastic={0.1}
        onDragEnd={(e, { offset, velocity }) => {
          if (offset.y > 80 || velocity.y > 500) onClose();
        }}
        className="relative bg-white w-full max-w-lg rounded-t-[2rem] md:rounded-[2rem] shadow-2xl flex flex-col h-[86vh] md:h-auto max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence>
          {showMap && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute inset-0 z-[100] bg-white flex flex-col">
              <div className="flex justify-between items-center p-5 border-b bg-white sticky top-0 z-10">
                <div>
                  <h4 className="font-black text-[12px] uppercase tracking-widest text-gray-900">Pin Location</h4>
                  <p className="text-[9px] font-bold text-gray-600 uppercase">Move map to adjust address</p>
                </div>
                <button type="button" onClick={() => setShowMap(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-hidden relative">
                <LocationPicker
                  initialPos={formData.latitude ? { lat: parseFloat(formData.latitude), lng: parseFloat(formData.longitude) } : null}
                  onConfirm={handleMapConfirm} isLocating={isLocating} getCurrentLocation={getCurrentLocation}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="md:hidden flex justify-center pt-3 shrink-0"><div className="w-12 h-1 bg-gray-200 rounded-full" /></div>

        <div className="p-6 md:p-8 pt-5 md:pt-8 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-gray-900 leading-none">{initialData ? "Update" : "New"} Address</h3>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Delivery Details</p>
            </div>
            <button type="button" disabled={isSubmitting} onClick={onClose} className="p-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"><X size={20} /></button>
          </div>

          <AnimatePresence>
            {localError && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-100 rounded-xl text-red-600">
                <AlertCircle size={14} /><span className="text-[10px] font-bold uppercase tracking-tight">{localError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4 pb-4">
            <div className="flex gap-1 p-1 bg-gray-200 rounded-xl">
              {["Home", "Work", "Other"].map((t) => (
                <button key={t} type="button" onClick={() => setFormData({ ...formData, address_type: t })} className={`cursor-pointer flex-1 py-2.5 rounded-lg font-black text-[10px] uppercase transition-all ${formData.address_type === t ? "bg-white text-primary shadow-md" : "text-gray-600"}`}>{t}</button>
              ))}
            </div>

            <div onClick={() => !isSubmitting && setShowMap(true)} className={`group cursor-pointer w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${formData.latitude ? "border-primary/20 bg-primary/5" : "border-dashed border-gray-400 bg-gray-50 hover:border-primary/50"}`}>
              <div className="flex items-center gap-3 overflow-hidden">
                <div className={`p-2 rounded-lg shrink-0 ${formData.latitude ? "bg-primary text-white" : "bg-white text-gray-400 shadow-sm"}`}><Navigation size={18} /></div>
                <div className="flex flex-col overflow-hidden text-left">
                  <span className="text-[10px] font-black uppercase text-gray-900 tracking-tight leading-tight">{formData.latitude ? "Location Selected" : "Use Current Location / Map"}</span>
                  <p className="text-[9px] font-bold text-gray-400 uppercase truncate w-[180px]">{formData.map_address_display || "Tap to point location"}</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gray-200 shrink-0 overflow-hidden border border-white shadow-sm relative">
                <img src="https://img.freepik.com/free-vector/map-with-location-pin_23-2148290130.jpg" alt="map" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center"><MapPin size={12} className="text-primary" /></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-600 ml-1">Complete Address</label>
                <input required disabled={isSubmitting} className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-transparent outline-none text-[12px] font-bold text-gray-900 focus:bg-white focus:border-primary/20 transition-all" placeholder="House No, Building, Street" value={formData.complete_address} onChange={(e) => setFormData({ ...formData, complete_address: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-600 ml-1">Landmark</label>
                  <input required disabled={isSubmitting} className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-transparent outline-none text-[12px] font-bold text-gray-900 focus:bg-white focus:border-primary/20 transition-all" placeholder="e.g. Near Mall" value={formData.landmark} onChange={(e) => setFormData({ ...formData, landmark: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-600 ml-1">Pincode</label>
                  <input required disabled={isSubmitting} inputMode="numeric" className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-transparent outline-none text-[12px] font-bold text-gray-900 focus:bg-white focus:border-primary/20 transition-all" placeholder="6-digit" value={formData.pincode} onChange={(e) => { const val = e.target.value; if (/^\d*$/.test(val) && val.length <= 6) setFormData({ ...formData, pincode: val }); }} />
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer py-1 w-fit">
              <input type="checkbox" className="cursor-pointer h-4 w-4 rounded accent-slate-900 border-gray-300" checked={formData.is_default} onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })} />
              <span className="text-[9px] font-black uppercase text-gray-600 tracking-wider">Set as default</span>
            </label>

            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg active:scale-[0.98] transition-all disabled:opacity-80 flex items-center justify-center gap-2">
              {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Saving</> : (initialData ? "Update" : "Save Address")}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddressForm;