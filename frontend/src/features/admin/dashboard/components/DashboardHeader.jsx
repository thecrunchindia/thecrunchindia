export default function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#1A1A1A]">
          Admin <span className="text-primary">Dashboard</span>
        </h1>
        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mt-1">
          Real-time <span className="text-emerald-500">Analytics</span> Overview
        </p>
      </div>
    </div>
  );
}