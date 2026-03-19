import React from "react";

const SkeletonPulse = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded-2xl ${className}`} />
);

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 md:space-y-8 pb-10 px-4 md:px-0">
      {/* Header Skeleton */}
      <div className="border-b border-gray-100 pb-6">
        <SkeletonPulse className="h-10 w-64 mb-2" />
        <SkeletonPulse className="h-4 w-48" />
      </div>

      {/* StatsGrid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-5 rounded-[2rem] border border-gray-100 h-[130px] flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <SkeletonPulse className="w-9 h-9 rounded-xl" />
              <SkeletonPulse className="h-3 w-20" />
            </div>
            <SkeletonPulse className="h-8 w-24" />
          </div>
        ))}
      </div>

      {/* Middle Section (Chart & Leaderboard) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-gray-200 h-[400px]">
          <SkeletonPulse className="h-6 w-48 mb-8" />
          <SkeletonPulse className="h-[250px] w-full rounded-3xl" />
        </div>
        <div className="bg-white/10 p-8 rounded-[3rem] h-[400px] border border-gray-200">
          <SkeletonPulse className="bg-gray-200 h-6 w-32 mb-8" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between mb-2">
                <SkeletonPulse className="bg-gray-200 h-3 w-24" />
                <SkeletonPulse className="bg-gray-200 h-3 w-12" />
              </div>
              <SkeletonPulse className="bg-gray-200 h-1 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* StatusSection Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 h-[250px]">
            <SkeletonPulse className="h-6 w-40 mb-6" />
            <div className="space-y-4">
              <SkeletonPulse className="h-12 w-full rounded-2xl" />
              <SkeletonPulse className="h-12 w-full rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}