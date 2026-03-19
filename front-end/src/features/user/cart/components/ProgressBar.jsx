import React from 'react';
import { CheckCircle2, MapPin, Bike } from 'lucide-react'; 
import { RiShoppingBag3Line } from 'react-icons/ri';

export const ProgressBar = ({ step }) => {
  const steps = [
    { id: 1, label: 'Cart', icon: RiShoppingBag3Line },
    { id: 2, label: 'Address', icon: MapPin },
    { id: 3, label: 'Order', icon: Bike }, 
  ];

  return (
    <div className="max-w-4xl mx-auto mb-14 px-6">
      <div className="flex justify-between items-center relative">
        {/* Background Line */}
        <div className="absolute h-[2px] bg-gray-200 w-full top-1/2 -translate-y-1/2 z-0 rounded-full"></div>
        
        {/* Active Progress Line */}
        <div 
          className="absolute h-[2px] bg-[#f9a602] transition-all duration-700 ease-in-out top-1/2 -translate-y-1/2 z-0 rounded-full"
          style={{ width: `${step === 1 ? '0%' : step === 2 ? '50%' : '100%'}` }}
        ></div>
        
        {steps.map((s) => {
          const IconComponent = s.icon;
          const isActive = step >= s.id;
          const isCompleted = step > s.id;

          return (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              {/* Circle Container */}
              <div 
                className={`
                  transition-all duration-500 flex items-center justify-center rounded-full shadow-sm
                  /* Mobile size: w-8 h-8 | Desktop size: md:w-12 md:h-12 */
                  w-8 h-8 md:w-12 md:h-12 
                  ${isActive 
                    ? 'bg-[#f9a602] text-black scale-110 shadow-[#f9a602]/20' 
                    : 'bg-white border-2 border-gray-400 text-gray-600 shadow-md'}
                `}
              >
                {isCompleted ? (
                  <CheckCircle2 size={18} className="md:w-6 md:h-6" />
                ) : (
                  <IconComponent size={16} className="md:w-5 md:h-5" />
                )}
              </div>

              {/* Label */}
              <span 
                className={`
                  absolute -bottom-8 font-black uppercase tracking-widest transition-colors duration-300
                  /* Mobile font: text-[8px] | Desktop font: md:text-[10px] */
                  text-[8px] md:text-[10px] whitespace-nowrap
                  ${isActive ? 'text-black' : 'text-gray-500'}
                `}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;