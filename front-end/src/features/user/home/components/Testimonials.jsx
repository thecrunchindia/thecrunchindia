import React from "react";
import LogoLoop from "../../../../components/ui/LogoLoop"; 
import { RiStarFill, RiUserHeartLine } from "react-icons/ri";

const Testimonials = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-6  md:py-12 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        
        {/* Heading Section */}
        <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
          <h2 className="text-base sm:text-xl md:text-2xl font-black uppercase tracking-tight whitespace-nowrap">
            What Our <span className="text-primary underline decoration-black/5 italic">Community Says</span>
          </h2>
          <div className="h-[1px] w-full bg-white " />
        </div>

        <LogoLoop
  logos={data}
  speed={60}            
  direction="left"
  gap={24}              
  pauseOnHover={true}   
  fadeOut={true}        
  renderItem={(item) => (
    /* MODIFIED: Height changed from h-[180px] to h-[140px] and padding to p-4 for mobile */
    <div className="bg-white p-4 md:p-6 rounded-[1.2rem] md:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[140px] md:h-[200px] w-[260px] md:w-[400px]">
      
      <div className="flex-grow overflow-hidden">
        {/* Stars */}
        <div className="flex gap-0.5 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <RiStarFill 
              key={i} 
              className={i < item.rating ? "text-primary" : "text-gray-200"} 
              size={10} /* Slightly smaller stars on mobile */
            />
          ))}
        </div>

        {/* Comment */}
        {/* MODIFIED: line-clamp-3 for mobile to fit in smaller height */}
        <p className="text-gray-600 font-semibold italic text-[10px] md:text-[13px] leading-snug mb-0 line-clamp-3 md:line-clamp-4">
          "{item.comment}"
        </p>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-2 md:gap-3 pt-2 border-t border-gray-50">
        <div className="w-7 h-7 md:w-9 md:h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
          <RiUserHeartLine size={14} className="md:size-[18px]" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-black uppercase text-[8px] md:text-[10px] tracking-wider text-gray-900 leading-none">
            {item.user_name}
          </span>
          <span className="text-[6px] md:text-[8px] font-bold text-gray-400 uppercase mt-0.5 tracking-tight">
            Customer Feedback
          </span>
        </div>
      </div>
    </div>
  )}
/>
      </div>
    </section>
  );
};

export default Testimonials;