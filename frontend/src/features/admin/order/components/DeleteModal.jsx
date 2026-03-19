import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, orderId, isDeleting, title = "Cancel Order?" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="text-red-500" size={32} />
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">{title}</h3>
          <p className="text-sm font-bold text-gray-500 leading-relaxed">
            Are you sure you want to cancel order <span className="text-red-500">#{orderId}</span>? 
          </p>
        </div>
        
        <div className="flex gap-3 p-6 pt-0">
          <button
            disabled={isDeleting}
            onClick={onClose}
            className="cursor-pointer flex-1 py-3.5 bg-gray-200 border border-gray-300 text-gray-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            No, Back
          </button>
          <button
            disabled={isDeleting}
            onClick={() => onConfirm(orderId)}
            className="cursor-pointer flex-1 py-3.5 bg-red-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Processing...
              </>
            ) : (
              "Yes, Cancel"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;