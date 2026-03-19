import React from "react";
import ProductCard from "./ProductCard";

const MenuGrid = ({ items, onEdit, onDelete }) => {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {items && items.length > 0 ? (
        items.map((item) => (
          <ProductCard 
            key={item.id || item.name} 
            item={item} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))
      ) : (
        <div className="col-span-full text-center py-10 text-slate-400">
          No items to display here.
        </div>
      )}
    </div>
  );
};

export default MenuGrid;