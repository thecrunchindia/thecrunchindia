
const SettingsSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-white p-5 md:p-10 max-w-7xl mx-auto">
      <div className="mb-10 h-10 w-64 bg-gray-100 rounded-lg animate-pulse"></div>
      <div className="flex gap-2 mb-8 bg-gray-50 p-2 rounded-2xl w-fit animate-pulse">
        <div className="h-10 w-28 bg-gray-200 rounded-xl"></div>
        <div className="h-10 w-28 bg-gray-200 rounded-xl"></div>
        <div className="h-10 w-28 bg-gray-200 rounded-xl"></div>
      </div>
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
    <div className="w-full space-y-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded"></div> {/* Label */}
            <div className="h-14 w-full bg-gray-100 rounded-2xl border border-gray-50"></div> {/* Input */}
          </div>
        ))}
        <div className="md:col-span-2 space-y-2">
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
          <div className="h-32 w-full bg-gray-100 rounded-2xl border border-gray-50"></div>
        </div>
        {[1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-36 bg-gray-200 rounded"></div>
            <div className="h-14 w-full bg-gray-100 rounded-2xl border border-gray-50"></div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default SettingsSkeleton;