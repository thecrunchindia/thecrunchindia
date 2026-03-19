import React from 'react';
import { AlertCircle, RefreshCw, Inbox as InboxIcon } from 'lucide-react';

export const ErrorState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in zoom-in duration-300">
    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
      <AlertCircle className="text-red-500" size={32} />
    </div>
    <h3 className="text-lg font-bold text-gray-900">{message}</h3>
    <button 
      onClick={() => window.location.reload()} 
      className="flex items-center mt-4 gap-2 px-6 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
    >
      <RefreshCw size={16} /> Reload Page
    </button>
  </div>
);

export const NoResults = ({ searchTerm }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
      <InboxIcon className="text-gray-300" size={32} />
    </div>
    <h3 className="text-lg font-bold text-gray-900">No messages found</h3>
    <p className="text-sm text-gray-500 max-w-xs mx-auto mt-1">
      We couldn't find any messages matching "{searchTerm}". Try a different keyword.
    </p>
  </div>
);