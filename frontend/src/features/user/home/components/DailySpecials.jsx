import React from "react";
import { RiFireFill, RiInboxLine } from "react-icons/ri";

const DailySpecials = ({ data: specials = [], onItemClick }) => {
  if (specials.length === 0) return null;

  return (
    <section className="py-0 md:py-12 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        
        {/* Header Section */}
        <div className="flex items-center justify-start gap-2 mb-6 md:mb-10">
          <RiFireFill className="text-orange-600 animate-pulse text-xl md:text-3xl" />
          <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight text-gray-900">
            Today's <span className="text-orange-600">Hot</span> Specials
          </h2>
        </div>

        {specials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {specials.map((item) => {
              // Check if variants exist
              const hasVariants = item?.has_variants && item?.variants?.length > 0;

              // Extract actual and offer prices
              const rawOfferPrice = hasVariants 
                ? (item.variants[0].offer_price || item.variants[0].actual_price) 
                : (item.offer_price || item.actual_price || 0);
                
              const rawActualPrice = hasVariants 
                ? item.variants[0].actual_price 
                : (item.actual_price || rawOfferPrice);

              const actual = parseFloat(rawActualPrice);
              const offer = parseFloat(rawOfferPrice);
              let discountPercent = 0;
              
              if (actual > offer) {
                discountPercent = Math.round(((actual - offer) / actual) * 100);
              }

              // Determine Dietary Preference Color
              const isVeg = item.dietary_preference?.toLowerCase() === "veg";
              const vegColor = isVeg ? "border-green-500 text-green-500" : "border-red-500 text-red-500";

              return (
                <div 
                  key={item.id} 
                  onClick={() => onItemClick?.(item)}
                  className="relative h-40 md:h-60  rounded-[1rem] md:rounded-[1.5rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <img 
                    src={item.image} 
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Dietary Indicator (Veg/Non-Veg) - Top Left */}
                  {item.dietary_preference && (
                    <div className="absolute top-2.5 left-2.5 z-10  px-1.5 py-1.5 rounded flex items-center justify-center ">
                      <div className={`w-3 h-3 md:w-4 md:h-4 border-2 flex items-center justify-center rounded-sm ${vegColor}`}>
                        <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${isVeg ? "bg-green-500" : "bg-red-500"}`} />
                      </div>
                    </div>
                  )}

                  {/* Floating Discount Tag - Top Right */}
                  {discountPercent > 0 && (
                    <div className="absolute top-2.5 right-2.5 z-10 bg-orange-600 text-white text-[8px] md:text-[9px] font-black px-2 py-1 rounded-full shadow-md">
                      {discountPercent}% OFF
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-3 md:p-4 flex flex-col justify-end">
                    
                    <div className="mb-1.5">
                      <h3 className="text-white text-sm md:text-lg font-black leading-tight line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-gray-300 text-[8px] md:text-[10px] font-medium line-clamp-1 opacity-90 mt-0.5">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-end border-t border-white/10 pt-2">
                      <div className="flex flex-col">
                        {hasVariants && (
                          <span className="text-gray-400 text-[7px] md:text-[8px] font-bold uppercase mb-0.5">
                            Starts from
                          </span>
                        )}
                        {actual > offer && (
                          <span className="text-gray-400 text-[8px] md:text-[10px] line-through font-bold leading-none mb-0.5">
                            ₹{Math.round(actual)}
                          </span>
                        )}
                        <span className="text-primary text-base md:text-xl font-black leading-none">
                          ₹{Math.round(offer)}
                        </span>
                      </div>
                      
                      <button className="bg-white text-black px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-[8px] md:text-[10px] font-black hover:bg-primary hover:text-white transition-all transform active:scale-95 shadow-md">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full py-12 flex flex-col items-center justify-center bg-white border-2 border-dashed border-slate-200 rounded-[1.5rem]">
            <RiInboxLine size={40} className="text-slate-300 mb-3" />
            <h3 className="text-slate-900 font-black uppercase text-xs tracking-widest">
              No Specials Today
            </h3>
            <p className="text-slate-500 text-[9px] font-bold uppercase mt-1">
              Check back later for exciting deals
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailySpecials;