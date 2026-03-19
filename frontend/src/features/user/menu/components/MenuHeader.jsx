import React from 'react';

const MenuHeader = () => {
  return (
    <div className="bg-white pt-6 pb-2 px-4 text-center">
      <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase">
        Explore Our <span className="text-[var(--color-primary)]">Menu</span>
      </h1>
      <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.3em] mt-1">
        Handcrafted flavors for every craving
      </p>
    </div>
  );
};

export default MenuHeader;