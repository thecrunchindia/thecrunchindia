import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2, XCircle } from "lucide-react";

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, isLoading, error }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={!isLoading ? onClose : undefined} 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white w-full max-w-md rounded-xl p-8 md:p-10 shadow-2xl text-center"
          >
            {/* എറർ ഉണ്ടെങ്കിൽ ഐക്കൺ മാറ്റുന്നു */}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${error ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-500'}`}>
              {error ? (
                <XCircle size={40} />
              ) : (
                <AlertTriangle size={40} />
              )}
            </div>
            
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 text-gray-800">
             Delete Address?
            </h3>

            {/* എറർ മെസ്സേജ് കാണിക്കുന്നു */}
            {error ? (
              <p className="text-[11px] font-bold text-red-500 bg-red-50 p-3 rounded-lg uppercase tracking-tight mb-8">
                {error}
              </p>
            ) : (
              <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-8">
                {isLoading ? "Please wait a moment" : "This action cannot be undone."}
              </p>
            )}
            
            <div className="flex gap-3">
              <button 
                disabled={isLoading} // ലോഡിംഗ് സമയത്ത് ബട്ടൺ പ്രവർത്തിക്കില്ല
                onClick={onClose} 
                className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-800 bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {error ? "Close" : "Cancel"}
              </button>
              
              {!error && (
                <button 
                  disabled={isLoading} // ലോഡിംഗ് സമയത്ത് ബട്ടൺ പ്രവർത്തിക്കില്ല
                  onClick={onConfirm} 
                  className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-200 hover:bg-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Deleting
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              )}
              
              {/* എറർ വന്നാൽ വീണ്ടും ശ്രമിക്കാൻ ഒരു ബട്ടൺ കൂടി വേണമെങ്കിൽ */}
              {error && (
                <button 
                  onClick={onConfirm} 
                  className="flex-1 py-4 bg-gray-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmation;