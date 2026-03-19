import React, { useState, useEffect } from "react";
import { User, Phone, Mail, Edit3, Check, X, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserProfile } from "../hooks/useUserProfile"; 

const ProfileOverview = () => {
  const { 
    profile, 
    isLoading, 
    isError, 
    error, 
    refetchProfile, 
    updateProfile, 
    isUpdating, 
    validationError, 
    clearErrors 
  } = useUserProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (profile) {
      setTempData({ name: profile.name || "", email: profile.email || "" });
    }
  }, [profile]);

  const handleSave = () => {
    updateProfile({ name: tempData.name, email: tempData.email }, {
      onSuccess: () => setIsEditing(false)
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (clearErrors) clearErrors();
    setTempData({ name: profile?.name || "", email: profile?.email || "" });
  };

  // 1. LOADING SKELETON
  if (isLoading) {
    return (
      <div className="w-full mx-auto animate-pulse">
        <div className="flex justify-between items-end mb-6 md:mb-10 border-b border-gray-50 pb-4">
          <div className="space-y-2">
            <div className="h-6 w-32 bg-gray-200 rounded-lg"></div>
            <div className="h-3 w-20 bg-gray-100 rounded"></div>
          </div>
          <div className="h-9 w-24 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-3 md:gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <div className="h-2 w-16 bg-gray-200 rounded mb-2 ml-1"></div>
              <div className="flex items-center gap-3 p-3.5 md:p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="p-2 rounded-lg bg-gray-200 w-8 h-8"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-full bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. ERROR STATE WITH RETRY BUTTON
  if (isError) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full flex flex-col items-center justify-center p-10 text-center"
      >
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-3xl flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900">Profile Error</h3>
        <p className="text-[10px] font-bold text-gray-500 mt-2 max-w-[280px] leading-relaxed uppercase tracking-wider">
          {error?.message || "Something went wrong while loading your profile."}
        </p>
        <button 
          onClick={() => refetchProfile()}
          className="mt-6 flex items-center gap-2 px-8 py-3 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl active:scale-95 transition-all"
        >
          <Loader2 size={14} className={isLoading ? "animate-spin" : "hidden"} />
          Retry Connection
        </button>
      </motion.div>
    );
  }

  const fields = [
    { id: 'name', label: 'Full Name', value: profile?.name || "N/A", icon: <User size={16}/>, editable: true },
    { id: 'phone_number', label: 'Phone', value: profile?.phone_number || "N/A", icon: <Phone size={16}/>, editable: false },
    { id: 'email', label: 'Email', value: profile?.email || "Add email", icon: <Mail size={16}/>, editable: true },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full mx-auto"
    >
      <div className="bg-white rounded-3xl p-1">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-6 md:mb-10 border-b border-gray-50 pb-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
               <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-gray-900">Account</h3>
               <ShieldCheck size={16} className="text-green-500" />
            </div>
            <p className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">Personal Details</p>
          </div>
          
          <button 
            onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-black text-[9px] uppercase tracking-widest ${
                isEditing 
                ? 'bg-red-50 text-red-500 border border-red-100' 
                : 'bg-gray-900 text-white shadow-lg shadow-gray-200'
            }`}
          >
            {isEditing ? <><X size={14}/> Cancel</> : <><Edit3 size={14}/> Edit</>}
          </button>
        </div>

        {/* Validation Error Message */}
        <AnimatePresence>
          {isEditing && validationError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-2xl text-red-600"
            >
              <AlertCircle size={16} />
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider">{validationError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Fields Area */}
        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-3 md:gap-4">
          {fields.map((field) => (
            <div key={field.id} className="relative">
              <label className="text-[8px] sm:text-[10px] font-black uppercase text-gray-600 tracking-widest ml-1 mb-1 block">
                {field.label}
              </label>
              
              <div className={`flex items-center gap-3 p-3.5 md:p-4 rounded-2xl transition-all border ${
                isEditing && field.editable
                ? 'bg-white border-gray-900 ring-4 ring-gray-900/5' 
                : 'bg-gray-100/50 border-gray-200'
              }`}>
                <div className={`p-2 rounded-lg ${isEditing && field.editable ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 shadow-sm'}`}>
                  {field.icon}
                </div>
                
                <div className="flex-1">
                  {isEditing && field.editable ? (
                    <input 
                      type="text" 
                      value={tempData[field.id]}
                      onChange={(e) => setTempData({...tempData, [field.id]: e.target.value})}
                      className="w-full bg-transparent outline-none text-[11px] sm:text-[12px] font-bold text-gray-800 "
                    />
                  ) : (
                    <p className="text-[11px] sm:text-[12px] font-bold text-gray-800  truncate">
                      {field.value}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Update Button Section */}
        <AnimatePresence>
          {isEditing && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 flex justify-center"
            >
              <button 
                onClick={handleSave}
                disabled={isUpdating}
                className="w-full md:w-auto px-12 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-gray-200 hover:scale-105 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <Check size={16}/>}
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProfileOverview;