import React, { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { RiBaseStationLine } from "react-icons/ri";

const HomeError = ({ message, refetch }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRetry = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } catch (err) {
      console.error("Retry failed:", err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  return (
    <div className="w-full min-h-[400px] flex items-center justify-center bg-white  rounded-[3rem] my-10 relative overflow-hidden">
      
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}} 
      />

      <div className="flex flex-col items-center max-w-sm px-6 text-center z-10">
        
        {/* Animated Radar Icon */}
        <div className="mb-8 relative">
          <div className={`absolute inset-0 bg-slate-100 rounded-full scale-[2] blur-xl transition-opacity duration-500 ${isRefreshing ? 'opacity-100' : 'opacity-0'}`} />
          <RiBaseStationLine 
            size={48} 
            className={`relative transition-colors duration-500 ${isRefreshing ? 'text-primary' : 'text-red-500'}`} 
          />
        </div>

        {/* Error Info */}
        <div className="space-y-3 mb-10">
          <h3 className="text-slate-900 text-sm font-black uppercase tracking-[0.2em]">
            Sync Lost
          </h3>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed line-clamp-2">
            {message || "Server communication interrupted. Check your network."}
          </p>
        </div>

        {/* Smart Button - No Modal, Just Inline Feedback */}
        <button 
          onClick={handleRetry}
          disabled={isRefreshing}
          className={`
            relative overflow-hidden group flex items-center justify-center gap-3 min-w-[180px] h-14 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300
            ${isRefreshing 
              ? "bg-slate-50 text-slate-400 cursor-not-allowed" 
              : "bg-black text-white hover:bg-primary hover:text-black active:scale-95 shadow-xl shadow-black/10"
            }
          `}
        >
          {/* Progress bar inside button (Only visible when refreshing) */}
          {isRefreshing && (
            <div className="absolute bottom-0 left-0 h-[2px] bg-blue-500 animate-[loading_1s_ease-in-out_infinite]" 
                 style={{width: '100%'}} />
          )}

          <FiRefreshCw 
            className={`${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} 
            size={14} 
          />
          
          <span>{isRefreshing ? "Reconnecting" : "Retry Sync"}</span>
        </button>

        {/* Mini Technical Footer */}
        
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default HomeError;