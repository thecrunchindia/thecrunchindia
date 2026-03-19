import { useState, useEffect } from "react";
import { UtensilsCrossed, Calendar } from 'lucide-react';

const Header = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 md:gap-5">
                {/* Icon Box size reduced on mobile */}
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#0A0A0A] rounded-[1.2rem] md:rounded-[2rem] flex items-center justify-center text-[#f9a602] shadow-xl">
                    <UtensilsCrossed size={24} className="md:w-8 md:h-8" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-[#0A0A0A] tracking-tighter leading-none">
                        KITCHEN <span className="text-[#f9a602]">DASHBOARD.</span>
                    </h1>
                    <p className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-1 ml-0.5">
                        Live Order Management
                    </p>
                </div>
            </div>

            {/* Date & Time - Full width on mobile */}
            <div className="flex items-center gap-3 bg-white  px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl border border-gray-200 shadow-xl w-fit">
                <div className="p-1.5 bg-white rounded-lg shadow-md">
                    <Calendar size={14} className="text-primary  md:w-4 md:h-4" />
                </div>
                <div className="flex flex-col">
                    <p className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-tighter">
                        {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-[11px] md:text-sm font-black text-gray-900 leading-none">
                        {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header