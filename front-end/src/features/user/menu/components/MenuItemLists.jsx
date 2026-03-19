import React from 'react';
import ProductCard from './ProductCard'; 

const MenuItemLists = ({ items,onItemClick }) => {
  if (items.length === 0) {
    return (
      <div className="py-20 px-4 text-center">
        <p className="text-gray-400 font-bold uppercase tracking-widest">No items found in this category</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} onProductClick={onItemClick}/>
        ))}
      </div>
    </div>
  );
};

export default MenuItemLists;