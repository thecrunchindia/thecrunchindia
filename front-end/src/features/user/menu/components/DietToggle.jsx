import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Flame } from 'lucide-react';

const DietToggle = ({ filterType, setFilterType }) => {
  const options = [
    { id: 'All', label: 'All', icon: null },
    { 
      id: 'Veg', 
      label: 'Veg', 
      icon: (isActive) => <Leaf size={14} fill={isActive ? "currentColor" : "none"} /> 
    },
    { 
      id: 'Non-Veg', 
      label: 'Non-Veg', 
      icon: (isActive) => <Flame size={14} fill={isActive ? "currentColor" : "none"} /> 
    }
  ];

  return (
    <div className="relative bg-white p-1.5 rounded-2xl w-[280px] md:w-[320px] h-12 flex items-center border border-primary/20 shadow-xl overflow-hidden">
      <motion.div
        className="absolute top-1.5 bottom-1.5 bg-white rounded-xl shadow-xl z-0 border border-primary/60"
        animate={{
          left: filterType === 'All' ? '6px' : filterType === 'Veg' ? '33.33%' : '66.66%',
          width: 'calc(33.33% - 8px)'
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />

      {options.map((option) => {
        const isActive = filterType === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setFilterType(option.id)}
            className={`relative z-10 flex-1 h-full flex items-center justify-center gap-2 
              text-[10px] md:text-xs font-black uppercase tracking-wider transition-colors duration-300 cursor-pointer
              ${isActive ? 'text-black' : 'text-gray-500'}`}
          >
            {option.icon && (
              <span className={`
                ${option.id === 'Veg' ? (isActive ? 'text-green-600' : 'text-gray-400') : ''}
                ${option.id === 'Non-Veg' ? (isActive ? 'text-red-600' : 'text-gray-400') : ''}
              `}>
                {option.icon(isActive)}
              </span>
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default DietToggle;