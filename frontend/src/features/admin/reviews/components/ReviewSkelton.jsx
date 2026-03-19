import React from 'react';

const ReviewSkelton = () => {
  // 6 സ്കെൽറ്റൺ കാർഡുകൾ ലോഡിംഗ് ടൈമിൽ കാണിക്കാൻ
  const skeletonCards = Array(6).fill(0);

  return (
    <div className="p-2 md:p-4 mx-auto w-full max-w-[1400px] animate-pulse">
      
      {/* Skeleton Cards List */}
      <div className="space-y-4 mb-12">
        {skeletonCards.map((_, index) => (
          <div 
            key={index} 
            className="border p-5 md:p-6 rounded-xl md:rounded-xl bg-white border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-center gap-4">
              {/* Left Side: Name and Stars Skeleton */}
              <div className="flex flex-col gap-2 min-w-0 flex-1">
                {/* Name Skeleton */}
                <div className="h-4 md:h-5 bg-slate-100 rounded-md w-1/3 md:w-1/4"></div>
                {/* Stars Skeleton */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 md:w-4 md:h-4 bg-slate-50 rounded-full"></div>
                  ))}
                </div>
              </div>

              {/* Right Side: Button Skeleton */}
              <div className="shrink-0 w-20 md:w-28 h-9 md:h-11 bg-slate-100 rounded-full"></div>
            </div>

            {/* Comment Skeleton */}
            <div className="mt-4 pt-4 border-t border-slate-50 space-y-2">
              <div className="h-3 bg-slate-50 rounded w-full"></div>
              <div className="h-3 bg-slate-50 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex flex-col items-center justify-center gap-5 py-8 border-t border-slate-50">
        <div className="flex items-center gap-1.5 md:gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-xl md:rounded-2xl"></div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-xl md:rounded-2xl"></div>
          <div className="w-[110px] md:w-[140px] h-11 md:h-12 bg-slate-200 rounded-xl md:rounded-2xl"></div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-xl md:rounded-2xl"></div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-xl md:rounded-2xl"></div>
        </div>
      </div>

    </div>
  );
};

export default ReviewSkelton;