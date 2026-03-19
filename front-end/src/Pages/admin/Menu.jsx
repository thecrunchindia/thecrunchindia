import React from "react";
import { MenuHeader, CategorySection, ProductSection } from "../../features/admin/menu";

const Menu = () => {
  return (
    <div className="max-w-full min-h-screen bg-white rounded-t-[2rem] pb-20 px-2">
      <div className="pt-8 flex flex-col gap-10">
        
        <MenuHeader />

        <CategorySection />

        <ProductSection />
      </div>
    </div>
  );
};

export default Menu;