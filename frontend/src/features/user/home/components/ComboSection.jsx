import React, { useRef, useState } from "react";
import { RiFlashlightFill, RiArrowLeftSLine, RiArrowRightSLine, RiInboxLine } from "react-icons/ri";

const ComboSection = ({ data: combos = [], onItemClick }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      
      // MODIFIED: സ്ക്രോൾ സ്പീഡ് കുറയ്ക്കാൻ scrollAmount മാറ്റി. 
      // ഓരോ ക്ലിക്കിലും ഏകദേശം ഒരു കാർഡിന്റെ ദൂരം മാത്രം പോകുന്ന രീതിയിലാക്കി.
      const scrollAmount = window.innerWidth < 768 ? 300 : 400; 
      
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleScrollState = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 20);
    }
  };

  if (combos.length === 0) return null;

  return (
    <section className="py-4 pt-4 sm:pt-0 md:py-14 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter whitespace-nowrap text-gray-900">
            Combo <span className="text-primary underline decoration-black/5">Deals</span>
          </h2>
          <div className="h-[2px] w-full bg-gray-200/60" />
        </div>

        <div className="relative group">
          
          {/* Left Arrow */}
          <div className={`hidden md:flex absolute left-[-10px] top-0 z-20 h-full w-32 items-center justify-start bg-gradient-to-r from-white via-white/40 to-transparent transition-opacity duration-300 pointer-events-none ${showLeftArrow ? "opacity-100" : "opacity-0"}`}>
            <button onClick={() => scroll("left")} className="cursor-pointer pointer-events-auto p-3 rounded-full bg-white border border-gray-100 shadow-xl hover:bg-primary transition-all active:scale-90">
              <RiArrowLeftSLine size={24} className="text-black" />
            </button>
          </div>

          {/* Right Arrow */}
          <div className="hidden md:flex absolute right-[-10px] top-0 z-20 h-full w-32 items-center justify-end bg-gradient-to-l from-white via-white/40 to-transparent pointer-events-none">
            <button onClick={() => scroll("right")} className="cursor-pointer pointer-events-auto p-3 rounded-full bg-white border border-gray-100 shadow-xl hover:bg-primary transition-all active:scale-90">
              <RiArrowRightSLine size={24} className="text-black" />
            </button>
          </div>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            onScroll={handleScrollState}
            className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory scroll-pl-4 md:scroll-pl-0 px-2 scroll-smooth"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollSnapStop: 'always'
            }}
          >
            <style dangerouslySetInnerHTML={{__html: `.no-scrollbar::-webkit-scrollbar { display: none; }`}} />

            {combos.map((combo) => {
              const hasVariants = combo?.has_variants && combo?.variants?.length > 0;
              const rawOfferPrice = hasVariants 
                ? (combo.variants[0].offer_price || combo.variants[0].actual_price) 
                : (combo.offer_price || combo.actual_price || 0);
              const rawActualPrice = hasVariants 
                ? combo.variants[0].actual_price 
                : (combo.actual_price || rawOfferPrice);

              const actual = parseFloat(rawActualPrice);
              const offer = parseFloat(rawOfferPrice);
              const savings = Math.round(actual - offer);

              return (
                <div 
                  key={combo.id} 
                  onClick={() => onItemClick?.(combo)}
                  className="cursor-pointer snap-center shrink-0 w-[290px] max-w-[85vw] sm:w-[320px] md:w-[420px] bg-white rounded-[2rem] p-3 md:p-4 flex gap-3 md:gap-5 shadow-sm border border-gray-100 group/item items-center transition-all hover:shadow-md"
                >
                  <div className="relative shrink-0 w-24 h-24 md:w-32 md:h-36 overflow-hidden rounded-[1.5rem] md:rounded-[1.8rem] shadow-inner bg-gray-100">
                    <img 
                      src={combo.image} 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" 
                      alt={combo.name}
                    />
                    {savings > 0 && (
                      <div className="absolute top-1.5 left-1.5 z-10 bg-primary text-black text-[7px] md:text-[9px] font-black px-2 py-0.5 rounded-[1rem] uppercase">
                        Save ₹{savings}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <div>
                      <h4 className="font-black uppercase text-gray-900 tracking-tight line-clamp-1 text-[13px] md:text-[15px] leading-tight" title={combo.name}>
                        {combo.name}
                      </h4>
                      <p className="text-[8px] md:text-[10px] text-gray-500 font-semibold mt-1 md:mt-1.5 line-clamp-2 leading-snug min-h-[1.2rem] md:min-h-[1.5rem]">
                        {combo.description}
                      </p>
                    </div>

                    <div className="mt-2 md:mt-4">
                      <div className="flex flex-col mb-1.5 md:mb-2">
                         {hasVariants && (
                          <span className="text-gray-400 text-[7px] md:text-[8px] font-black uppercase mb-0.5 tracking-wider">Starts from</span>
                        )}
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base md:text-xl font-black text-black">₹{Math.round(offer)}</span>
                          {actual > offer && (
                            <span className="text-[8px] md:text-xs text-gray-400 line-through font-bold">₹{Math.round(actual)}</span>
                          )}
                        </div>
                      </div>
                      <button className="w-full bg-black text-white py-2 md:py-2.5 rounded-xl text-[8px] md:text-[10px] font-black uppercase flex items-center justify-center gap-1.5 hover:bg-primary hover:text-black transition-all active:scale-95">
                        <RiFlashlightFill size={12} className="text-primary group-hover/item:text-black md:w-3.5 md:h-3.5" />
                        Grab Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="shrink-0 w-4 md:w-20 snap-end" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComboSection;