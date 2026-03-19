const RevenueSkeleton = () => (
  <div className="space-y-8 animate-pulse px-4 sm:px-6 lg:px-8">
    <div className="h-10 w-48 bg-gray-200 rounded-lg"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="h-48 bg-gray-200 rounded-[2.5rem]"></div>
      <div className="h-48 bg-gray-200 rounded-[2.5rem]"></div>
    </div>
    <div className="h-80 bg-gray-200 rounded-[2.5rem]"></div>
    <div className="h-64 bg-gray-200 rounded-[2.5rem]"></div>
  </div>
);

export default RevenueSkeleton;