import React, { useState } from "react";
import { Home, Briefcase, Edit3, Trash2, Plus, Loader2, MapPin, AlertCircle, Podcast } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAddress } from "../hooks/useAddress";
import AddressForm from "./AddressForm";
import DeleteConfirmation from "./DeleteConfirmation";
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";

const AddressBook = () => {
  const {
    addresses,
    isLoading,
    addAddress,
    addressError,
    refetchAddresses,
    updateAddress,
    deleteAddress,
    isDeleting,
  } = useAddress();

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const handleEdit = (addr) => {
    setEditingAddress(addr);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-gray-100 p-4 md:p-6 rounded-[1.5rem] animate-pulse">
            <div className="flex justify-between mb-4">
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-gray-200 rounded-2xl" />
                <div className="space-y-2">
                  <div className="w-12 h-2 bg-gray-200 rounded" />
                  <div className="w-8 h-2 bg-gray-100 rounded" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-xl" />
                <div className="w-8 h-8 bg-gray-100 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
              <div className="h-3 bg-gray-50 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (addressError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center p-10 text-center"
      >
        <div className="w-16 h-16 text-red-500 rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-lg font-black uppercase tracking-tighter text-gray-900">Connection Error</h3>
        <p className="text-xs font-bold text-gray-500 mt-2 max-w-[250px] leading-relaxed">
          {extractErrorMessages(addressError) || "Could not fetch your addresses. Please try again later."}
        </p>
        <button
          onClick={() => refetchAddresses()}
          className="mt-6 flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg active:scale-95 transition-all"
        >
          Retry
        </button>
      </motion.div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Address List Grid */}
      {addresses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-12  text-center"
        >
          <div className="w-20 h-20 bg-white shadow-xl shadow-gray-200/50 text-gray-500 rounded-full flex items-center justify-center mb-6">
            <MapPin size={40} />
          </div>
          <h3 className="text-[15px] sm:text-2xl font-black uppercase tracking-tighter text-gray-900 leading-none">No Addresses Saved</h3>
          <p className="text-[8px] sm:text-[12px] font-bold text-gray-600 mt-3 uppercase tracking-widest ">
            Add your first delivery address to get started
          </p>
          <button
            onClick={handleAddNew}
            className="cursor-pointer mt-8 flex items-center gap-2 px-10 py-3 sm:py-4 whitespace-nowrap sm:px-8 bg-primary text-white text-[8px] sm:text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={18} />
            Add New Address
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {addresses.map((addr) => (
            <motion.div
              layout
              key={addr.id}
              className={`group relative bg-white border ${addr.is_default ? 'border-primary/20 ring-1 ring-primary/5' : 'border-gray-100'} p-4 md:p-6 rounded-[1.5rem] transition-all shadow-xl hover:shadow-gray-200/50`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 md:w-11 md:h-11 rounded-2xl flex items-center justify-center transition-colors ${addr.is_default ? 'bg-primary text-white' : 'bg-gray-50 text-gray-700 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                    {addr.address_type === "Work" ? <Briefcase size={18} /> : <Home size={18} />}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 block">{addr.address_type}</span>
                    {addr.is_default && (
                      <span className="text-[8px] font-bold text-primary uppercase tracking-tighter flex items-center gap-0.5">Default</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => handleEdit(addr)} className="cursor-pointer p-2 bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-xl transition-all">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => setDeleteId(addr.id)} className="cursor-pointer p-2 bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-[10px] md:text-[12px] text-gray-700 leading-tight truncate">{addr.complete_address}</h4>
                <p className="text-[10px] md:text-[11px] font-medium text-gray-600 leading-relaxed">
                  <span className="text-gray-400 mr-1">📍</span> {addr.landmark}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Podcast size={11} className="text-gray-400  shrink-0" />
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-[9px] font-black rounded-md tracking-wider">{addr.pincode}</span>
                </div>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <MapPin size={11} className="text-primary shrink-0" />
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tight truncate">{addr.placeName || "Location Pinned"}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* New Address Button in Grid */}
          <button
            onClick={handleAddNew}
            className="cursor-pointer group min-h-[140px] border-2 border-dashed border-gray-400 bg-gray-50/50 rounded-[1.5rem] md:rounded-[2.2rem] p-6 flex flex-col items-center justify-center gap-3 hover:border-primary/40 hover:bg-white hover:shadow-lg transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:scale-110 transition-all">
              <Plus size={22} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-primary">New Address</span>
          </button>
        </div>
      )}

      {/* Address Form Logic */}
      <AnimatePresence>
        {showForm && (
          <AddressForm
            key="address-modal"
            initialData={editingAddress}
            onClose={() => setShowForm(false)}
            onSubmit={async (data) => {
              try {
                if (editingAddress) {
                  await updateAddress({ id: editingAddress.id, data });
                } else {
                  await addAddress(data);
                }
                setShowForm(false);
              } catch (err) {
                console.error("Submit error", err);
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Logic */}
      <DeleteConfirmation
        isOpen={!!deleteId}
        isLoading={isDeleting}
        error={deleteError}
        onClose={() => { if (!isDeleting) setDeleteId(null); }}
        onConfirm={async () => {
          try {
            await deleteAddress(deleteId);
            setDeleteId(null);
          } catch (err) {
            setDeleteError(extractErrorMessages(err));
          }
        }}
      />
    </div>
  );
};

export default AddressBook;