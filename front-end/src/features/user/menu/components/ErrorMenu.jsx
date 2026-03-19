import React, { useState } from 'react';
import { FiRefreshCw } from "react-icons/fi";
import { RiBaseStationLine } from "react-icons/ri";
import { motion } from 'framer-motion';

const ErrorMenu = ({ message, onRetry }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRetry = async () => {
    setIsRefreshing(true);
    try {
      await onRetry();
    } catch (err) {
      console.error("Retry failed:", err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full min-h-[450px] flex items-center justify-center bg-white rounded-[2.5rem] md:rounded-[3rem] my-6 relative overflow-hidden"
    >
      {/* Background Subtle Pattern - Same as Home */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}} 
      />

      <div className="flex flex-col items-center max-w-sm px-8 text-center z-10">
        
        {/* Animated Radar Icon */}
        <div className="mb-8 relative">
          <div className={`absolute inset-0 bg-slate-100 rounded-full scale-[2.5] blur-2xl transition-opacity duration-700 ${isRefreshing ? 'opacity-100' : 'opacity-0'}`} />
          
          <motion.div
            animate={isRefreshing ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <RiBaseStationLine 
              size={54} 
              className={`relative transition-colors duration-500 ${isRefreshing ? 'text-[#f9a602]' : 'text-red-500'}`} 
            />
          </motion.div>
        </div>

        {/* Error Info */}
        <div className="space-y-3 mb-10">
          <h2 className="text-slate-900 text-sm font-black uppercase tracking-[0.25em]">
            Menu Sync Lost
          </h2>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
            {message || "We're having trouble reaching the kitchen server. Check your connection."}
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleRetry}
          disabled={isRefreshing}
          className={`
            relative overflow-hidden group flex items-center justify-center gap-3 min-w-[200px] h-14 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300
            ${isRefreshing 
              ? "bg-slate-50 text-slate-400 cursor-not-allowed" 
              : "bg-black text-white hover:bg-[#f9a602] hover:text-black active:scale-95 shadow-xl shadow-black/5"
            }
          `}
        >
          {isRefreshing && (
            <div className="absolute bottom-0 left-0 h-[3px] bg-[#f9a602] animate-[loading_1.5s_ease-in-out_infinite]" 
                 style={{width: '100%'}} />
          )}

          <FiRefreshCw 
            className={`${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} 
            size={14} 
          />
          
          <span>{isRefreshing ? "Reconnecting..." : "Retry Menu Sync"}</span>
        </button>

        {/* Back Link */}
        <button 
          onClick={() => window.location.reload()}
          className="mt-8 text-slate-300 text-[9px] font-black uppercase tracking-[0.3em] hover:text-black transition-colors"
        >
          Forced Refresh
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </motion.div>
  );
};

export default ErrorMenu;