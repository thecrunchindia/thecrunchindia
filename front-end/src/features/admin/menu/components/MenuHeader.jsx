import React from "react";

const MenuHeader = () => (
  <div className="flex flex-col md:flex-row md:items-center justify-between">
    <div className="flex flex-col">
      <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-[#1A1A1A]">
        Menu <span className="text-primary">Manager</span>
      </h1>
      <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-1">
        Inventory Control
      </p>
    </div>
    <div className="hidden lg:block w-96 h-12"></div>
  </div>
);

export default MenuHeader;