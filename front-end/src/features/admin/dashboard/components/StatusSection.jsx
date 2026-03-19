import { AlertTriangle } from "lucide-react";

export default function StatusSection({ attentionNeeded = [], activeDispatch = [] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      {/* Attention Needed Section */}
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="text-rose-500" size={20} />
          <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">Attention Needed</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {attentionNeeded.map((item, i) => (
            <div key={i} className="p-4 bg-rose-50 rounded-2xl border border-rose-100/50">
              <p className="text-[11px] font-black text-[#1A1A1A] uppercase truncate">{item.item}</p>
              <p className="text-[9px] text-rose-500 font-bold uppercase">{item.issue}</p>
            </div>
          ))}
          {attentionNeeded.length === 0 && (
            <p className="text-[10px] text-gray-400 font-bold uppercase p-2">Everything is optimal</p>
          )}
        </div>
      </div>

      {/* Active Dispatch Section */}
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">Active Dispatch</h3>
          <span className="text-[9px] font-black bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-tighter">Real-time</span>
        </div>
        <div className="space-y-4 md:space-y-5">
          {activeDispatch.map((log, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <p className="text-[11px] font-black text-[#1A1A1A]">{log.id}</p>
              </div>
              <p className="text-[9px] font-bold text-gray-400 uppercase">{log.status}</p>
              <p className="text-[10px] font-black text-[#1A1A1A]">{log.time}</p>
            </div>
          ))}
          {activeDispatch.length === 0 && (
            <p className="text-[10px] text-gray-400 font-bold uppercase text-center py-4">No active dispatches</p>
          )}
        </div>
      </div>
    </div>
  );
}