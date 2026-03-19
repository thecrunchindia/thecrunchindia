import React from "react";
import { Search, X } from "lucide-react";

const ReviewHeader = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2 md:px-4">
      <div className="flex flex-col">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-[#1A1A1A]">
          Reviews<span className="text-primary">.</span>
        </h1>
        <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-1">
          Customers Feedback
        </p>
      </div>

      {/* Search Bar - Right Aligned */}
      <div className="relative w-full md:w-80 group">
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" 
          size={18} 
        />
        <input 
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-primary/60 rounded-xl text-sm font-medium outline-none focus:border-[#f9a602] focus:ring-1 focus:ring-[#f9a602] transition-all shadow-xl placeholder:text-gray-500"
        />
        {searchTerm && (
          <button 
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewHeader;