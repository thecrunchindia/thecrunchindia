import React from "react";

const SkeletonBanner = () => (
  <div className="relative w-full overflow-hidden py-6">
    <div className="flex justify-center items-center gap-4">
      <div className="hidden lg:block min-w-[250px] h-[350px] bg-slate-200 rounded-3xl opacity-50 scale-85 animate-pulse" />
      
      <div className="relative w-full max-w-[1400px] h-[180px] md:h-[300px] lg:h-[350px] bg-slate-200 animate-pulse rounded-3xl overflow-hidden shadow-lg mx-2">
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-10 space-y-3 bg-gradient-to-t from-slate-300/50 to-transparent">
          <div className="h-6 md:h-10 w-2/3 bg-slate-300 rounded-lg" />
          <div className="h-3 md:h-5 w-1/2 bg-slate-300 rounded-lg" />
          <div className="h-8 md:h-12 w-32 bg-slate-400/50 rounded-xl mt-2" />
        </div>
      </div>

      <div className="hidden lg:block min-w-[250px] h-[350px] bg-slate-200 rounded-3xl opacity-50 scale-85 animate-pulse" />
    </div>
  </div>
);

const SkeletonCategory = () => (
  <div className="flex gap-5 md:gap-8 overflow-hidden px-4 md:px-10 py-10">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="flex flex-col items-center shrink-0 animate-pulse">
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-slate-100 border-4 border-white shadow-sm" />
        <div className="h-3 w-16 bg-slate-100 rounded mt-4" />
      </div>
    ))}
  </div>
);

const SkeletonSpecials = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4 md:px-10 py-10">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="h-56 md:h-72 rounded-[2rem] bg-slate-100 animate-pulse border border-slate-50" />
    ))}
  </div>
);

const SkeletonBestSellers = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 px-4 md:px-10 py-10">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="space-y-4 animate-pulse">
        <div className="aspect-square rounded-[2.5rem] bg-slate-100" />
        <div className="h-4 w-3/4 bg-slate-100 rounded" />
        <div className="h-4 w-1/2 bg-slate-100 rounded" />
      </div>
    ))}
  </div>
);

const SkeletonCombo = () => (
  <div className="snap-start min-w-[310px] md:min-w-[440px] bg-slate-50 rounded-[2rem] p-3 md:p-4 flex gap-4 md:gap-6 animate-pulse items-center">
    <div className="shrink-0 w-28 h-28 md:w-36 md:h-40 bg-slate-200 rounded-[1.5rem] md:rounded-[2rem]" />
    <div className="flex-1 space-y-3">
      <div className="h-5 w-3/4 bg-slate-200 rounded" />
      <div className="h-3 w-full bg-slate-200 rounded" />
      <div className="h-8 w-1/2 bg-slate-200 rounded mt-4" />
    </div>
  </div>
);

const HomeSkeleton = () => {
  return (
    <div className="w-full bg-white pb-20">
      <SkeletonBanner />
      <div className="max-w-[1440px] mx-auto space-y-4">
        <div className="h-8 w-64 bg-slate-100 mx-4 md:mx-10 rounded-lg animate-pulse" />
        <SkeletonCategory />
        
        <div className="h-8 w-64 bg-slate-100 mx-4 md:mx-10 rounded-lg animate-pulse" />
        <SkeletonSpecials />

        <div className="h-8 w-64 bg-slate-100 mx-4 md:mx-10 rounded-lg animate-pulse" />
        <SkeletonBestSellers />
        <div className="h-8 w-64 bg-slate-100 mx-4 md:mx-10 rounded-lg animate-pulse" />
        <div className="flex gap-4 md:gap-6 overflow-hidden px-4 md:px-10 py-10">
          {[1, 2, 3].map((n) => <SkeletonCombo key={n} />)}
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;