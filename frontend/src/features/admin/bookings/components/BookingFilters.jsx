import React from "react";
import { Search } from "lucide-react";

const BookingFilters = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
      

      <div className="relative group w-full sm:w-[320px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#f9a602] transition-colors" size={16} />
        <input
          type="text"
          value={searchTerm}
          placeholder="Search by name or phone..."
          className=" w-full pl-10 pr-4 py-3 bg-white border border-primary/60 rounded-xl text-sm font-medium outline-none focus:border-[#f9a602] focus:ring-1 focus:ring-[#f9a602] transition-all shadow-xl placeholder:text-gray-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BookingFilters;
