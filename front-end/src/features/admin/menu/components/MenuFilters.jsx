import React from "react";
import { ChevronDown, Search, AlertCircle, EyeOff } from "lucide-react";

const MenuFilters = ({ 
  sections, activeSection, setActiveSection, 
  categories, activeCategory, setActiveCategory,
  searchQuery, setSearchQuery, 
  isLowStock, setIsLowStock,
  showUnavailable, setShowUnavailable
}) => (
  <div className="flex flex-col lg:flex-row gap-4 w-full">
    {/* Search Input */}
    <div className="relative flex-1 lg:max-w-xs">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
      <input 
        type="text" 
        placeholder="Search items..."
        className="w-full bg-white border border-primary/60 rounded-xl py-2.5 pl-11 pr-4 text-[12px] font-medium outline-none focus:border-[#f9a602] focus:ring-1 focus:ring-[#f9a602] transition-all shadow-xl placeholder:text-gray-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    <div className="flex flex-wrap items-center gap-3">
      {/* Section & Category Selects */}
      <div className="flex gap-2 flex-1 sm:flex-none">
        <div className="relative flex-1 sm:min-w-[140px]">
          <select 
            value={activeSection} 
            onChange={(e) => setActiveSection(e.target.value)} 
            className="w-full appearance-none bg-white border border-primary/60 rounded-xl py-2.5 px-4 text-[12px] font-medium outline-none shadow-xl"
          >
            {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
        </div>

        <div className="relative flex-1 sm:min-w-[140px]">
          <select 
            value={activeCategory} 
            onChange={(e) => setActiveCategory(e.target.value)} 
            className="w-full appearance-none bg-white border border-primary/60 rounded-xl py-2.5 px-4 text-[12px] font-medium outline-none shadow-xl"
          >
            <option value="All">All Categories</option>
            {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
        </div>
      </div>

      {/* Toggle Style Buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {/* Low Stock Toggle */}
        <button
          onClick={() => setIsLowStock(!isLowStock)}
          className={`cursor-pointer flex-1 sm:flex-none flex items-center justify-between gap-3 px-3 py-2 rounded-xl border transition-all shadow-xl active:scale-95 ${
            isLowStock ? "bg-red-50 border-red-200" : "bg-white border-primary/60"
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertCircle size={14} className={isLowStock ? "text-red-500" : "text-slate-400"} />
            <span className={`text-[10px] font-bold uppercase tracking-tight ${isLowStock ? "text-red-700" : "text-slate-600"}`}>
              Low Stock
            </span>
          </div>
          {/* Custom Toggle Switch */}
          <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 ${isLowStock ? "bg-red-500" : "bg-slate-200"}`}>
            <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${isLowStock ? "translate-x-3.5" : "translate-x-0"}`} />
          </div>
        </button>

        {/* Disabled Items Toggle */}
        <button
          onClick={() => setShowUnavailable(!showUnavailable)}
          className={`cursor-pointer flex-1 sm:flex-none flex items-center justify-between gap-3 px-3 py-2 rounded-xl border transition-all shadow-xl active:scale-95 ${
            showUnavailable ? "bg-slate-100 border-slate-300" : "bg-white border-primary/60"
          }`}
        >
          <div className="flex items-center gap-2">
            <EyeOff size={14} className={showUnavailable ? "text-slate-900" : "text-slate-400"} />
            <span className={`flex items-center text-[10px] font-bold uppercase tracking-tight ${showUnavailable ? "text-slate-900" : "text-slate-600"}`}>
              Disabled <span className="hidden sm:block pl-1" >Items</span>
            </span>
          </div>
          {/* Custom Toggle Switch */}
          <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 ${showUnavailable ? "bg-slate-800" : "bg-slate-200"}`}>
            <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${showUnavailable ? "translate-x-3.5" : "translate-x-0"}`} />
          </div>
        </button>
      </div>
    </div>
  </div>
);

export default MenuFilters;