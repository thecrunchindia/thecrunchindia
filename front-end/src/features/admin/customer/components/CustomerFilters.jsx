import React from 'react';
import { Search, Filter } from 'lucide-react';

 const CustomerFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter, 
  isFilterOpen, 
  setIsFilterOpen, 
  loadedCount, 
  totalCount,  
  isLoading 
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 mb-8">
      <div className="relative flex-1 group">
        <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#f9a602] transition-colors"/>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or phone..." 
          className="w-full pl-12 pr-6 py-3 md:py-4 bg-white border border-primary/60 rounded-xl text-sm font-medium outline-none shadow-xl"
        />
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative flex-1 md:flex-none" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`w-full md:w-auto px-5 py-3 md:px-6 md:py-4 border rounded-xl md:rounded-2xl text-sm font-bold flex items-center justify-center gap-3 transition-all ${statusFilter !== 'All' ? 'bg-[#f9a602] text-white border-[#f9a602]' : 'bg-white border border-primary/60 rounded-xl text-sm font-medium outline-none shadow-xl'}`}
          >
            <Filter size={18} /> {statusFilter}
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-2">
              {['All', 'Active', 'Blocked'].map((status) => (
                <button
                  key={status}
                  onClick={() => { setStatusFilter(status); setIsFilterOpen(false); }}
                  className="w-full text-left px-5 py-3 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white px-4 py-3 md:px-5 md:py-4 flex items-center gap-2 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs text-gray-500 border border-primary/60 md:border-none shadow-xl md:shadow-none">
          <span className="text-[#1A202C]">
          {isLoading ? ".." : `${loadedCount} / ${totalCount}`}
        </span> RECORDS
        </div>
      </div>
    </div>
  );
};

export default CustomerFilters;