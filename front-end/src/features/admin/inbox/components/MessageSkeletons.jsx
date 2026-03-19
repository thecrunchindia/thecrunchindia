import React from 'react';

export const MobileSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-pulse">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3.5 bg-gray-200 rounded w-1/2"></div>
            <div className="h-2.5 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-3/4 mt-3"></div>
      </div>
    ))}
  </div>
);

export const DesktopSkeleton = () => (
  <div className="divide-y divide-gray-50">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 items-center animate-pulse">
        <div className="col-span-3 flex items-center gap-4 pl-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
          <div className="space-y-2 w-full pr-4">
            <div className="h-3.5 bg-gray-200 rounded w-2/3"></div>
            <div className="h-2.5 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="col-span-6 pr-4 space-y-2.5">
          <div className="h-3.5 bg-gray-200 rounded w-1/3"></div>
          <div className="h-2.5 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="col-span-3 flex justify-end pr-4">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    ))}
  </div>
);