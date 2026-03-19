import React from "react";
import { RiBaseStationLine } from "react-icons/ri";

const ServerErrorPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] relative overflow-hidden px-6">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}} 
      />

      {/* TEXT SECTION (Top) */}
      <div className="z-10 flex flex-col items-center text-center max-w-xl mb-4 md:mb-8 mt-8">
        
        {/* Small Animated Icon */}
        <div className="mb-6 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-200 rounded-full scale-[2] blur-xl animate-pulse" />
          <RiBaseStationLine size={42} className="relative text-red-600 md:w-[52px] md:h-[52px]" />
        </div>

        <h3 className="text-slate-900 text-2xl md:text-4xl font-black uppercase tracking-[0.15em] drop-shadow-sm">
          Connection Lost
        </h3>
        
        <div className="h-1 w-12 bg-slate-400 rounded-full mx-auto my-5 md:my-6" />
        
        <p className="text-slate-500 text-[11px] md:text-sm font-bold uppercase tracking-widest leading-relaxed max-w-sm md:max-w-md mx-auto">
          We are unable to establish a connection with our servers. Please check your internet and try again later.
        </p>
      </div>

      {/* WIRE SVG SECTION (Bottom) - Exact match of the requested image */}
      <div className="z-10 w-full max-w-[320px] md:max-w-[450px] mx-auto mt-4 relative flex justify-center">
        
        {/* Soft Background Circle like in the image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[350px] h-[250px] md:h-[350px]  rounded-full -z-10" />

        <svg viewBox="0 0 300 120" fill="none" xmlns="" className="w-full h-auto drop-shadow-lg overflow-visible">
          
          {/* ================= LEFT SIDE (PLUG) ================= */}
          
          {/* Left Wire (Comes from bottom-left) */}
          <path d="M -20 80 Q 30 85, 65 60" fill="none" stroke="#9CA3AF" strokeWidth="6" strokeLinecap="round" />
          
          {/* Left Plug Body */}
          <path d="M 65 60 C 65 35, 110 38, 120 40 L 120 80 C 110 82, 65 85, 65 60 Z" fill="#6B7280" />
          
          {/* Left Plug Prongs */}
          <rect x="120" y="48" width="22" height="4.5" rx="2" fill="#D1D5DB" />
          <rect x="120" y="67" width="22" height="4.5" rx="2" fill="#D1D5DB" />


          {/* ================= RIGHT SIDE (SOCKET) ================= */}
          
          {/* Right Wire (Comes from top-right, creating asymmetry) */}
          <path d="M 320 20 Q 260 25, 235 60" fill="none" stroke="#9CA3AF" strokeWidth="6" strokeLinecap="round" />
          
          {/* Right Socket Body */}
          <path d="M 235 60 C 235 35, 190 38, 180 40 L 180 80 C 190 82, 235 85, 235 60 Z" fill="#6B7280" />
          
          {/* Socket Holes (Dark gray/Black) */}
          <ellipse cx="186" cy="50.5" rx="3" ry="5" fill="#1F2937" />
          <ellipse cx="186" cy="69.5" rx="3" ry="5" fill="#1F2937" />


          {/* ================= SPARKS (Center) ================= */}
          <g className="animate-pulse" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round">
            {/* Top & Bottom */}
            <line x1="150" y1="28" x2="150" y2="12" />
            <line x1="150" y1="92" x2="150" y2="108" />
            
            {/* Diagonals */}
            <line x1="135" y1="35" x2="122" y2="20" />
            <line x1="165" y1="35" x2="178" y2="20" />
            
            <line x1="135" y1="85" x2="122" y2="100" />
            <line x1="165" y1="85" x2="178" y2="100" />
          </g>

        </svg>
      </div>

    </div>
  );
};

export default ServerErrorPage;