import React from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowRightLine, RiRestaurant2Line } from "react-icons/ri";

const ExploreMore = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-4 md:py-8">
      {/* Compact Card Style with subtle border */}
      <div className="relative group  rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 overflow-hidden flex flex-col items-center text-center">
        
        {/* Subtle Background Icon for a premium feel */}
        <RiRestaurant2Line className="absolute -right-4 -bottom-4 text-slate-100 size-32 md:size-48 -rotate-12 transition-transform group-hover:scale-110 duration-700" />

        {/* Top Mini Label */}
        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3 block">
          Craving for more?
        </span>

        {/* Main Heading - Reduced size for better proportions */}
        <h3 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-4 relative z-10">
          Still <span className="text-primary ">Hungry?</span>
        </h3>

        {/* Minimalist Description */}
        <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest max-w-[250px] md:max-w-none mb-8 relative z-10">
          Explore our full range of <span className="text-slate-900">50+ handcrafted</span> dishes
        </p>

        {/* Refined Button - Smaller and Slicker */}
        <button
          onClick={() => navigate("/menu")}
          className="cursor-pointer group relative flex items-center gap-3 bg-slate-900 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-xl font-black uppercase text-[11px] md:text-xs transition-all duration-300 hover:bg-primary hover:text-black active:scale-95 shadow-xl shadow-slate-200 z-10"
        >
          <span className="tracking-widest">Explore  Menu</span>
          <RiArrowRightLine 
            size={18} 
            className="group-hover:translate-x-1.5 transition-transform duration-300" 
          />
        </button>

      </div>
    </div>
  );
};

export default ExploreMore;