import React, { useState } from "react";
import { Edit3, Trash2, ImageIcon, AlertTriangle, Layers } from "lucide-react";

const ProductCard = ({ item, onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!item) return null;

  const isVeg = item?.dietary_preference === "VEG";
  const hasVariants = item?.has_variants && item?.variants?.length > 0;

  // Determine Price and Stock based on variants
  const displayOfferPrice = hasVariants ? item.variants[0].offer_price || item.variants[0].actual_price : item?.offer_price || item?.actual_price;
  const displayActualPrice = hasVariants ? item.variants[0].actual_price : item?.actual_price;
  
  return (
    <>
      <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full relative">
        
        <div className="absolute top-1.5 right-1.5 flex gap-3 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit?.(item)} className="cursor-pointer p-1.5 bg-white/90 backdrop-blur-sm shadow-sm border border-slate-100 text-slate-600 rounded-md hover:bg-slate-900 hover:text-white transition-all">
            <Edit3 size={12} />
          </button>
          <button onClick={() => setShowConfirm(true)} className="cursor-pointer p-1.5 bg-white/90 backdrop-blur-sm shadow-sm border border-slate-100 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all">
            <Trash2 size={12} />
          </button>
        </div>

        {/* Image */}
        <div className="relative aspect-square sm:aspect-video overflow-hidden bg-slate-50 shrink-0">
          {item?.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <ImageIcon size={20} />
            </div>
          )}
          <div className="absolute bottom-2 left-2 flex gap-1.5">
            <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase">
              {item?.category_name || "General"}
            </span>
            {hasVariants && (
              <span className="bg-blue-500/90 backdrop-blur-sm text-white text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase flex items-center gap-0.5">
                <Layers size={8} /> Variants
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-2 sm:p-3 flex flex-col flex-1">
          <div className="flex items-center gap-1 mb-1">
            <div className={`w-1.5 h-1.5 rounded-full ${isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-[8px] font-bold uppercase ${isVeg ? 'text-green-600' : 'text-red-600'}`}>
              {isVeg ? 'Veg' : 'Non-Veg'}
            </span>
          </div>

          <h3 className="text-[10px] sm:text-sm font-bold text-slate-900 truncate mb-0.5 leading-tight">{item?.name}</h3>
          <p className="text-[9px] text-slate-500 line-clamp-1 mb-2">{item?.description || "No description"}</p>

          <div className="mt-auto pt-2 border-t border-slate-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
               <div className="flex items-end gap-1.5">
                  {hasVariants && <span className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">Starts from</span>}
                  <span className="text-xs sm:text-base font-black text-slate-900 leading-none">
                    ₹{displayOfferPrice}
                  </span>
                  {displayOfferPrice !== displayActualPrice && (
                    <span className="text-[8px] sm:text-[10px] font-medium text-slate-400 line-through leading-none mb-0.5">
                      ₹{displayActualPrice}
                    </span>
                  )}
               </div>
            </div>
            
            {!hasVariants && (
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-50 border-dashed">
                <span className="text-[7px] sm:text-[8px] font-bold text-slate-400 uppercase">Stock</span>
                <span className={`text-[8px] sm:text-[9px] font-black ${parseInt(item?.quantity) < 10 ? 'text-amber-500' : 'text-slate-700'}`}>
                  {item?.quantity} Qty
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
  <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/40">
    <div className="bg-white w-full max-w-[450px] rounded-[2rem] shadow-2xl p-8 text-center animate-in fade-in zoom-in duration-200">
      
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5">
        <AlertTriangle size={32} />
      </div>
      
      <h3 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-tight">
        Delete Item?
      </h3>
      
      <p className="text-slate-500 text-xs mb-8">
        Are you sure you want to remove <b>"{item?.name}"</b> 
      </p>
      
      <div className="flex gap-4">
        <button 
          onClick={() => setShowConfirm(false)} 
          className="cursor-pointer flex-1 py-3.5 text-xs font-black text-slate-500 bg-slate-200 rounded-2xl uppercase hover:bg-slate-200 transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={() => { onDelete?.(item.id); setShowConfirm(false); }} 
          className="cursor-pointer flex-1 py-3.5 text-xs font-black text-white bg-red-500 rounded-2xl uppercase shadow-lg shadow-red-200 hover:bg-red-600 transition-all"
        >
          Delete Now
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default ProductCard;