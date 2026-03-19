import React, { useState, useEffect, useRef } from "react";
import { Download, ChevronDown } from "lucide-react";

const RevenueHeader = () => {
  const [showExport, setShowExport] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowExport(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-6 pt-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#1A1A1A]">
          Delivery <span className="text-primary">Sales</span>
        </h1>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mt-1">
          Online Order <span className="text-primary">Profit</span> Tracker
        </p>
      </div>

      <div className="relative w-full md:w-auto" ref={dropdownRef}>
        <button 
          onClick={() => setShowExport(!showExport)}
          className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#1A1A1A] text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-primary transition-all active:scale-95"
        >
          <Download size={14} />
          Download Report
          <ChevronDown size={14} className={`transition-transform duration-300 ${showExport ? 'rotate-180' : ''}`} />
        </button>

        {showExport && (
          <div className="absolute right-0 mt-2 w-full md:w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[100] overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
            {['Today', 'This Week', 'This Month', 'Total History'].map((option) => (
              <button 
                key={option}
                onClick={() => setShowExport(false)}
                className="w-full text-left px-5 py-3 text-[10px] font-black uppercase text-gray-500 hover:bg-primary/5 hover:text-primary transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueHeader;