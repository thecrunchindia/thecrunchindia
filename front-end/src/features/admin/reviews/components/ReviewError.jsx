import React from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function ReviewError({ message }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-rose-50 p-6 rounded-[2.5rem] mb-6 border border-rose-100">
        <AlertCircle size={48} className="text-rose-500 mx-auto" />
      </div>
      <h2 className="text-xl font-black uppercase tracking-tight text-[#1A1A1A] mb-6">
         {message || "We couldn't load the dashboard analytics at the moment."}
      </h2>
      
      <button
        onClick={() => window.location.reload()}
        className="cursor-pointer flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-primary hover:text-[#1A1A1A] transition-all active:scale-95 shadow-xl"
      >
        <RefreshCcw size={16} />
        Retry 
      </button>
    </div>
  );
}