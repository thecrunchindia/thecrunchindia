import { motion } from "framer-motion";
import { PlusCircle, Utensils, Truck, History } from "lucide-react";
import { useOrderStats } from "../hooks/useOrderStats"; 

const OrderTabs = ({ tabs, activeTab, setActiveTab }) => {
  const { stats, isLoading } = useOrderStats();

  const tabConfig = {
    'NEW ORDERS': { icon: <PlusCircle size={12} strokeWidth={2.5} /> },
    'PREPARING': { icon: <Utensils size={12} strokeWidth={2.5} /> },
    'ON THE WAY': { icon: <Truck size={12} strokeWidth={2.5} /> },
    'HISTORY': { icon: <History size={12} strokeWidth={2.5} /> },
  };

  return (
    <div className="flex items-center relative overflow-x-auto no-scrollbar scroll-smooth">
      <div className="flex w-full lg:w-auto px-1 md:px-0">
        {tabs.map((tabLabel) => {
          const isActive = activeTab === tabLabel;
          const config = tabConfig[tabLabel];
          const count = stats[tabLabel]; 

          return (
            <button
              key={tabLabel}
              onClick={() => setActiveTab(tabLabel)}
              className="flex-1 lg:flex-none cursor-pointer py-4 lg:py-6 px-4 md:px-8 lg:px-20 relative flex flex-col md:flex-col lg:flex-col xl:flex-row items-center justify-center gap-1.5 md:gap-2.5 transition-all group min-w-max "
            >
              {/* Icon Container */}
              <div className={`p-1.5 md:p-2 rounded-[1rem] transition-all duration-300 ${
                isActive 
                  ? "bg-[#f9a602] text-white shadow-md shadow-[#f9a602]/20 scale-105 " 
                  : "bg-gray-100 text-gray-600 group-hover:bg-gray-100 group-hover:text-gray-900"
              }`}>
                {config.icon}
              </div>
              
              {/* Text & Count */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className={`text-[8px] md:text-[11px] font-black uppercase tracking-wider md:tracking-widest transition-colors ${
                  isActive ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
                }`}>
                  {tabLabel}
                </span>
                
                {!isLoading && count > 0 && (
                  <span className={`text-[8px] md:text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                    isActive ? "bg-white shadow-md text-gray-900" : "bg-gray-50 text-gray-500"
                  }`}>
                    {count}
                  </span>
                )}
              </div>

              {/* Active Indicator Bar */}
              {isActive && (
                <motion.div 
                  layoutId="activeOrderTab" 
                  className="absolute bottom-0 left-2 right-2 md:left-4 md:right-4 h-0.5 md:h-1 bg-[#f9a602] rounded-t-full" 
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTabs;