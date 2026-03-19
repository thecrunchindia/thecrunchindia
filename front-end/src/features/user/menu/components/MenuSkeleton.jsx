import React from 'react';

const MenuSkeleton = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3 animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-3xl w-full" />
            <div className="h-4 bg-gray-200 rounded-md w-3/4" />
            <div className="h-3 bg-gray-100 rounded-md w-1/2" />
            <div className="flex justify-between mt-2">
              <div className="h-5 bg-gray-200 rounded-md w-1/4" />
              <div className="h-8 bg-gray-200 rounded-full w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSkeleton;