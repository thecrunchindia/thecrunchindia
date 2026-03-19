import React, { useState, useEffect } from 'react';
import { MapPin, ChevronLeft, ArrowRight, Home, Briefcase, Plus, Edit3, Loader2, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useAddress } from '../../profile/hooks/useAddress';
import AddressForm from '../../profile/components/AddressForm';
import { handleLocationUpdate } from '../../../../hooks/locationActions';
import { clearError } from '../../../../redux/locationSlice';
import { toast } from 'sonner';

export const AddressSection = ({ selectedAddress, setSelectedAddress, onNext, onBack }) => {
  const { addresses, isLoading, addAddress, updateAddress } = useAddress();
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const dispatch = useDispatch();
  const { errorPopup } = useSelector((state) => state.location);

  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddress) {
      const defaultAddr = addresses.find(addr => addr.is_default) || addresses[0];
      setSelectedAddress(defaultAddr);
    }
  }, [addresses, selectedAddress, setSelectedAddress]);

  useEffect(() => {
    if (errorPopup) {
      dispatch(clearError());
    }
  }, [errorPopup, dispatch]);

  const handleEdit = (e, addr) => {
    if (e) e.stopPropagation();
    setEditingAddress(addr);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  // 1. handleFormSubmit
  const handleFormSubmit = async (data) => {
    try {
      let updatedAddr;
      if (editingAddress) {
        updatedAddr = await updateAddress({ id: editingAddress.id, data });

        if (selectedAddress?.id === editingAddress.id) {
          setSelectedAddress(updatedAddr);
        }
      } else {
        updatedAddr = await addAddress(data);
        setSelectedAddress(updatedAddr);
      }
      setShowForm(false);
    } catch (err) {
      console.error("Form submit error", err);
    }
  };

  const handleConfirmAddress = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    if (!selectedAddress.latitude || !selectedAddress.longitude) {
      toast.error("Location details missing. Please edit address.");
      handleEdit(null, selectedAddress);
      return;
    }

    setIsVerifying(true);
    try {
      const isDeliverable = await dispatch(
        handleLocationUpdate(
          Number(selectedAddress.latitude),
          Number(selectedAddress.longitude),
          false
        )
      );

      if (isDeliverable) {
        onNext();
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      toast.error("Location verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#f9a602]" size={32} />
        <p className="text-[10px] font-black uppercase tracking-widest mt-4 text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Heading Section */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h2 className="text-md md:text-3xl font-black uppercase tracking-tight italic text-black">
          Delivery <span className="text-[#f9a602]">Address</span>
        </h2>
        <button
          onClick={handleAddNew}
          className="cursor-pointer group flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-black hover:text-[#f9a602] transition-all"
        >
          <Plus size={14} className="group-hover:rotate-90 transition-transform" />
          Add New
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Address List */}
        <div className="lg:col-span-2 space-y-5">
          {addresses.length === 0 ? (
            <div className="p-16 border-2 border-dashed border-gray-100 rounded-[2.5rem] text-center">
              <MapPin className="mx-auto text-gray-300 mb-4" size={40} />
              <p className="font-black text-gray-500 uppercase tracking-widest text-xs">No addresses saved</p>
              <button onClick={handleAddNew} className="mt-4 text-[10px] font-black uppercase text-[#f9a602]">Add one now</button>
            </div>
          ) : (
            addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => setSelectedAddress(addr)}
                className={`p-5 md:p-8 rounded-[1.8rem] md:rounded-[2.5rem] border-2 cursor-pointer transition-all duration-300 group relative overflow-hidden min-h-[140px] md:min-h-[160px] flex flex-col justify-center ${selectedAddress?.id === addr.id
                  ? 'border-black bg-white shadow-xl ring-1 ring-black/5'
                  : 'border-gray-200 bg-white hover:border-gray-400 shadow-sm'
                  }`}
              >
                {/* Edit Icon - Top Right with safe padding */}
                <button
                  onClick={(e) => handleEdit(e, addr)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 bg-gray-200 text-gray-500 hover:text-black hover:bg-gray-200 rounded-full cursor-pointer transition-all z-10"
                >
                  <Edit3 size={15} />
                </button>

                <div className="flex justify-between items-center pr-10 md:pr-12">
                  <div className="flex gap-4 md:gap-6 items-center min-w-0">
                    <div className={`shrink-0 p-4 md:p-5 rounded-[1.2rem] md:rounded-[1.5rem] transition-colors ${selectedAddress?.id === addr.id ? 'bg-[#f9a602] text-black shadow-lg shadow-[#f9a602]/20' : 'bg-gray-100 text-gray-600'
                      }`}>
                      {addr.address_type === "Work" ? <Briefcase size={22} /> : <Home size={22} />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black uppercase text-[12px] md:text-sm tracking-widest mb-1">{addr.address_type}</p>
                      <div className="space-y-0.5">
                        <p className="text-[10px] md:text-xs text-gray-500 font-bold leading-relaxed line-clamp-2 pr-4 truncate">
                          {addr.complete_address}, {addr.landmark}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500 font-black tracking-widest uppercase">
                          PIN: {addr.pincode}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Radio-style Indicator - Bottom Right with safe padding */}
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                    <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center transition-all ${selectedAddress?.id === addr.id ? 'border-black bg-black' : 'border-gray-500 bg-gray-50'
                      }`}>
                      {selectedAddress?.id === addr.id && (
                        <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          className="w-2.5 h-2.5 bg-[#f9a602] rounded-full shadow-[0_0_10px_#f9a602]"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Selection Summary */}
        <div className="lg:sticky lg:top-32 h-fit">
          <div className="bg-gray-100 border-2 border-gray-200 rounded-[2.5rem] p-8">
            <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-6">Selection Summary</h4>
            <div className="space-y-5">
              <div className="p-5 bg-white rounded-2xl border border-gray-300 shadow-sm">
                <p className="text-[9px] font-black text-gray-500 uppercase mb-1.5 tracking-widest">Deliver To</p>
                <p className="text-[11px] font-black text-black uppercase truncate ">
                  {selectedAddress ? `${selectedAddress.address_type} (${selectedAddress.pincode})` : "Select an address"}
                </p>
              </div>
              <div className="flex flex-col gap-3.5">
                <button
                  onClick={handleConfirmAddress}
                  disabled={!selectedAddress || isVerifying}
                  className={`cursor-pointer w-full bg-black text-white py-4.5 rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] transition-all active:scale-[0.97] flex items-center justify-center gap-3 shadow-xl h-14
    ${isVerifying ? 'pointer-events-none' : 'hover:bg-[#f9a602] hover:text-black'}
    ${!selectedAddress ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}
  `}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Confirm Address <ArrowRight size={16} />
                    </>
                  )}
                </button>
                <button onClick={onBack} className="cursor-pointer w-full py-3 rounded-xl font-black uppercase text-[9px] text-gray-800 hover:text-black transition-colors tracking-widest">
                  {"< "}Back to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Responsive Error Modal --- */}
      <AnimatePresence>
        {showErrorModal && (
          <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowErrorModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-[500px] rounded-[1.5rem]  p-4 sm:p-8 flex flex-col items-center shadow-2xl"
            >
              <div className="bg-red-50 p-5 rounded-full mb-5">
                <AlertCircle size={32} className="text-red-500" />
              </div>
              <h3 className="text-xl font-black text-black uppercase tracking-tight mb-2">Out of Range</h3>
              <p className="text-gray-600 text-[11px] font-bold text-center leading-relaxed mb-8 px-2">
                This location is outside our delivery zone. Please update the map location to continue.
              </p>
              <div className="flex flex-col w-full gap-3">
                <button
                  onClick={() => { setShowErrorModal(false); handleEdit(null, selectedAddress); }}
                  className="cursor-pointer w-full py-4.5 bg-black text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#f9a602] hover:text-black transition-all"
                >
                  Update Location
                </button>
                <button onClick={() => setShowErrorModal(false)} className="cursor-pointer w-full py-3 text-gray-800 font-black uppercase text-[9px] tracking-widest">
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <AddressForm initialData={editingAddress} onClose={() => setShowForm(false)} onSubmit={handleFormSubmit} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddressSection;