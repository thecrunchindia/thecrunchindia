import React from "react";
import { RiAddLine, RiInboxLine } from "react-icons/ri";

const BestSellers = ({ data: bestSellers = [], onItemClick }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
          <div>
            <h2 className="text-xl md:text-2xl font-black uppercase text-slate-900 tracking-tight">
              Our <span className="text-primary">Best</span> Sellers
            </h2>
            <div className="h-1 w-8 bg-primary mt-1 rounded-full" />
          </div>
          <p className="text-slate-400 font-bold text-[9px] md:text-xs uppercase tracking-[0.2em]">
            Community Favorites
          </p>
        </div>

        {bestSellers.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
            {bestSellers.map((item) => {
              // Check if variants exist
              const hasVariants = item?.has_variants && item?.variants?.length > 0;

              // Extract actual and offer prices based on variants
              const rawOfferPrice = hasVariants 
                ? (item.variants[0].offer_price || item.variants[0].actual_price) 
                : (item.offer_price || item.actual_price || 0);
                
              const rawActualPrice = hasVariants 
                ? item.variants[0].actual_price 
                : (item.actual_price || rawOfferPrice);

              const actual = parseFloat(rawActualPrice);
              const offer = parseFloat(rawOfferPrice);
              const isVeg = item?.dietary_preference === "VEG";
              
              let discountPercent = 0;
              if (actual > offer) {
                discountPercent = Math.round(((actual - offer) / actual) * 100);
              }

              return (
                <div 
                  key={item.id} 
                  onClick={() => onItemClick?.(item)}
                  className="cursor-pointer group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full relative"
                >
                  {/* Discount Badge */}
                  {discountPercent > 0 && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-primary text-black text-[7px] md:text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase">
                        {discountPercent}% OFF
                      </span>
                    </div>
                  )}

                  {/* Image - Admin Card style (Square/Video aspect) */}
                  <div className="relative aspect-square overflow-hidden bg-slate-50 shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full rounded-b-xl h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[7px] md:text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase">
                        {item?.category_name || "General"}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-2 md:p-3 flex flex-col flex-1">
                    {/* Veg/Non-Veg Tag */}
                    <div className="flex items-center gap-1 mb-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={`text-[8px] font-bold uppercase ${isVeg ? 'text-green-600' : 'text-red-600'}`}>
                        {isVeg ? 'Veg' : 'Non-Veg'}
                      </span>
                    </div>

                    <h3 className="text-[11px] md:text-sm font-bold text-slate-900 truncate mb-0.5 leading-tight group-hover:text-primary transition-colors">
                      {item?.name}
                    </h3>
                    <p className="text-[9px] md:text-[10px] text-gray-500 font-medium  line-clamp-2 mb-3">
                      {item?.description || "No description"}
                    </p>

                    {/* Price & Add Button */}
                    <div className="mt-auto pt-2 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        {hasVariants && (
                          <span className="text-gray-400 text-[7px] md:text-[8px] font-bold uppercase mb-0.5">
                            Starts from
                          </span>
                        )}
                        <span className="text-[11px] md:text-[15px] font-black text-slate-900 leading-none">
                          ₹{Math.round(offer)}
                        </span>
                        {actual > offer && (
                          <span className="text-[8px] md:text-[10px] font-medium text-slate-400 line-through leading-none mt-1">
                            ₹{Math.round(actual)}
                          </span>
                        )}
                      </div>

                      <button 
                        className="cursor-pointer bg-slate-900 text-white p-1.5 md:p-2 rounded-lg hover:bg-primary hover:text-black transition-all active:scale-90"
                      >
                        <RiAddLine size={16} className="md:size-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="w-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl">
             <RiInboxLine size={40} className="text-slate-200 mb-2" />
             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">No Best Sellers Found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;