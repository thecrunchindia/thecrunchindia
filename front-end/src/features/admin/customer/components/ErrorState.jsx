import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorState = ({ message, onRetry, colSpan = 7 }) => (
  <tr>
    <td colSpan={colSpan} className="py-20 text-center  bg-white">
      <div className="flex flex-col items-center justify-center text-center px-4 w-full">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <AlertCircle size={32} className="text-red-500" />
        </div>

        <h3 className=" text-gray-900 font-black uppercase tracking-widest text-[11px] sm:text-sm mb-6 leading-relaxed">
          {message || "We couldn't load the reservations. Please check your connection."}
        </h3>
        
        <button
          onClick={onRetry}
          type="button"
          className="cursor-pointer group flex items-center gap-2 px-8 py-3 bg-[#0A0A0A] text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-lg active:scale-95"
        >
          <RefreshCw size={14} className="group-active:animate-spin" />
          Retry Now
        </button>
      </div>
    </td>
  </tr>
);

export default ErrorState;