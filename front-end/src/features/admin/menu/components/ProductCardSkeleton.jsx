import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square sm:aspect-video bg-slate-200" />
      
      {/* Content Skeleton */}
      <div className="p-3 space-y-3 flex-1">
        <div className="flex gap-2">
          <div className="h-2 w-8 bg-slate-200 rounded" />
          <div className="h-2 w-12 bg-slate-200 rounded" />
        </div>
        <div className="h-4 w-3/4 bg-slate-200 rounded" />
        <div className="h-3 w-full bg-slate-200 rounded" />
        
        <div className="mt-auto pt-2 border-t border-slate-50 space-y-2">
          <div className="h-4 w-1/2 bg-slate-200 rounded" />
          <div className="h-2 w-full bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;