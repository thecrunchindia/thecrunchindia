import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Leaf, Flame, Clock, Tag, ArrowRight, PlusCircle, AlertCircle, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, syncCartUpdate } from "../../redux/cartSlice"; 
import { useNavigate } from "react-router-dom";

const ProductModal = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Variants Handling
  const hasVariants = item?.has_variants && item?.variants?.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(hasVariants ? item.variants[0] : null);

  const cartItems = useSelector((state) => state.cart.items);
  const { isOpen } = useSelector((state) => state.location); 
  
  // Check if regular item or specific variant exists in cart
  const existingInCart = cartItems.find((i) => {
    if (hasVariants) {
      return Number(i.item_id) === Number(item.id) && Number(i.variant_id) === Number(selectedVariant?.id);
    } else {
      return Number(i.item_id) === Number(item.id) && !i.variant_id;
    }
  });

  const alreadyInCartQty = existingInCart ? existingInCart.quantity : 0;
  const availableStock = hasVariants ? (selectedVariant?.quantity || 0) : (item.quantity || 0);
  const maxAvailableToAdd = availableStock - alreadyInCartQty;

  const [quantity, setQuantity] = useState(maxAvailableToAdd > 0 ? 1 : 0);
  const [isAdded, setIsAdded] = useState(false);

  const isStoreClosed = isOpen === false;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Reset quantity and added state when variant changes
  useEffect(() => {
    const stock = hasVariants ? (selectedVariant?.quantity || 0) : (item.quantity || 0);
    const inCart = existingInCart ? existingInCart.quantity : 0;
    const max = stock - inCart;
    
    setQuantity(max > 0 ? 1 : 0);
    setIsAdded(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id, selectedVariant?.id]); 

  const handleIncrease = () => {
    if (quantity < maxAvailableToAdd) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.error(`Maximum stock limit reached!`);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (isStoreClosed) {
      toast.error("Store is currently closed!");
      return;
    }

    if (quantity > 0) {
      const cartPayload = hasVariants 
        ? { 
            item: { 
              ...item, 
              id: `${item.id}-${selectedVariant.id}`, 
              item_id: item.id, 
              variant_id: selectedVariant.id, 
              name: `${item.name} (${selectedVariant.size_name})`, 
              actual_price: selectedVariant.actual_price, 
              offer_price: selectedVariant.offer_price || selectedVariant.actual_price 
            }, 
            quantity 
          }
        : { item: { ...item, item_id: item.id }, quantity };

      dispatch(addToCart(cartPayload));
      
      const token = localStorage.getItem('user_access'); 
      if (token) {
        dispatch(syncCartUpdate({ 
          itemId: item.id, 
          variantId: hasVariants ? selectedVariant.id : null,
          actionType: 'add', 
          quantity: quantity 
        }));
      }
      
      toast.success(`Item added to cart!`);
      setIsAdded(true);
    }
  };

  // Determine Prices based on selected Variant
  const actualPrice = hasVariants 
    ? parseFloat(selectedVariant?.actual_price || 0) 
    : parseFloat(item.actual_price || 0);
    
  const offerPrice = hasVariants 
    ? parseFloat(selectedVariant?.offer_price || selectedVariant?.actual_price || 0) 
    : parseFloat(item.offer_price || item.actual_price || 0);
    
  const isVeg = item.dietary_preference === "VEG";

  let discountPercent = 0;
  if (actualPrice > offerPrice) {
    discountPercent = Math.round(((actualPrice - offerPrice) / actualPrice) * 100);
  }

  // MODIFIED: Simplified and optimized animation for mobile GPUs
  const modalVariants = {
    initial: isMobile ? { y: "100%" } : { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "tween", // Changed from 'spring' to 'tween' for better mobile performance
        ease: "easeOut", 
        duration: 0.25 // Faster animation
      }
    },
    exit: {
      y: isMobile ? "100%" : 20,
      opacity: 0,
      transition: { 
        type: "tween", 
        ease: "easeIn", 
        duration: 0.2 
      }
    },
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden outline-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => onClose()}
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] md:backdrop-blur-md"
      />

      <motion.div
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        drag={isMobile ? "y" : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, { offset, velocity }) => {
          if (offset.y > 100 || velocity.y > 400) onClose();
        }}
        // MODIFIED: Added `will-change-transform` for better GPU rendering
        className="relative bg-white w-full md:max-w-5xl rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden h-auto max-h-[95vh] md:max-h-[85vh] z-10 mt-auto md:my-auto will-change-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:hidden absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 rounded-full z-50" />

        <button
          onClick={() => onClose()}
          className="absolute right-4 top-4 md:right-5 md:top-5 p-2 bg-black/20 md:bg-slate-100/90 backdrop-blur-md text-white md:text-slate-900 transition-all rounded-full z-50 border border-white/20 md:border-slate-200 cursor-pointer hover:bg-slate-200"
        >
          <X size={isMobile ? 18 : 22} strokeWidth={2.5} />
        </button>

        {/* Image Section */}
        <div className={`w-full md:w-[45%] relative shrink-0 transition-all duration-300 bg-slate-50 ${hasVariants ? 'h-[28vh]' : 'h-[40vh]'} md:h-auto`}>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center rounded-t-[2.5rem] md:rounded-l-[2.5rem] md:rounded-tr-none absolute inset-0"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/30 text-[9px] md:text-[10px] font-black uppercase tracking-wider text-white shadow-lg ${isVeg ? 'bg-green-500/90' : 'bg-red-500/90'}`}>
              {isVeg ? <Leaf size={10} fill="currentColor" /> : <Flame size={10} fill="currentColor" />}
              {isVeg ? "Veg" : "Non-Veg"}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 md:hidden pointer-events-none" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-[55%] flex flex-col bg-white overflow-hidden shrink min-h-0">
          
          <div className="flex-1 flex flex-col overflow-y-auto p-4 md:p-8 lg:p-10 no-scrollbar">
            
            <div className="space-y-1 shrink-0 mt-1 md:mt-0">
              <span className="text-primary font-black text-[9px] md:text-[10px] uppercase tracking-widest">
                {item.category_name}
              </span>
              <h2 className="text-md md:text-2xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
                {item.name}
              </h2>
              
              <div className="flex flex-col gap-1 items-start mt-1">
                {discountPercent > 0 && (
                  <div className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[9px] md:text-[11px] font-black px-2 py-0.5 rounded-md border border-primary/20">
                    <Tag size={10} strokeWidth={3} /> {discountPercent}% OFF
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">₹{Math.round(offerPrice)}</span>
                  {actualPrice > offerPrice && (
                    <span className="text-xs md:text-sm text-slate-600 line-through font-bold">₹{Math.round(actualPrice)}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Scrollable Description */}
            <div className="mt-3 pb-3 border-b border-slate-50 shrink-0">
              <div className="max-h-20 md:max-h-32 pr-2 ">
                <p className="text-slate-700 text-[11px] md:text-[13px] leading-relaxed font-medium text-justify ">
                  {item.description || "Description not available."}
                </p>
              </div>
            </div>

            {/* Variants Selection (MODIFIED TO FORCE 3 COLUMNS ON ALL SCREENS) */}
            {hasVariants && (
              <div className="mt-3 sm:mt-0 space-y-2 pb-2 shrink-0">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-1.5">
                     <h3 className="text-[10px] md:text-[8px] font-black text-slate-800 uppercase tracking-widest">
                       Choose
                     </h3>
                     {item.variants.length > 1 && (
                       <motion.div
                         animate={{ y: [0, 3, 0] }}
                         transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                       >
                         <ChevronDown size={14} className="text-slate-600" />
                       </motion.div>
                     )}
                   </div>
                   <span className="text-[7px] font-bold text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded uppercase border border-slate-100">Required</span>
                </div>
                
                {/* 3 COLUMNS GRID - Adjusted padding and text size for mobile */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 mt-1">
                  {item.variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id;
                    const vOffer = parseFloat(variant.offer_price || variant.actual_price);
                    const variantActualPrice = parseFloat(variant.actual_price);
                    
                    return (
                      <div 
                        key={variant.id} 
                        onClick={() => setSelectedVariant(variant)} 
                        className={`cursor-pointer border rounded-xl p-1.5 sm:p-2.5 md:p-3 flex flex-col justify-center transition-all ${
                          isSelected 
                            ? 'border-slate-900 bg-slate-50/80 shadow-sm' 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'border-slate-900' : 'border-slate-300 group-hover:border-gray-500'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-900 rounded-full" />}
                          </div>
                          <span className={`text-[8.5px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-wide truncate ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                            {variant.size_name}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-baseline gap-x-1 pl-4 sm:pl-5 md:pl-6 mt-0.5 sm:mt-1">
                           {variantActualPrice > vOffer && (
                             <span className="text-[8px] sm:text-[9px] md:text-[10px] line-through text-gray-500 font-bold">
                               ₹{Math.round(variantActualPrice)}
                             </span>
                           )}
                           <span className={`text-[10px] sm:text-[11px] md:text-[13px] font-black ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                             ₹{Math.round(vOffer)}
                           </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}
          </div>

          {/* Sticky Action Area (Footer) */}
          <div className="shrink-0 bg-white border-t border-slate-100 p-3 md:p-6 lg:p-8 z-20 pb-4 md:pb-4 lg:pb-4 shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)] md:shadow-none">
            
            {/* Store Closed Warning */}
            {isStoreClosed && !isAdded && (
              <div className="flex items-center justify-center gap-2 text-red-600 mb-2 md:mb-3 bg-red-50 py-1.5 md:py-2 rounded-md  border border-red-100">
                <Clock size={14} />
                <span className="text-[10px] md:text-[11px] font-bold  uppercase tracking-wide">Store is currently Closed</span>
              </div> 
            )}

            {isAdded || maxAvailableToAdd > 0 ? (
              <>
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <div className="flex flex-col">
                    <span className="text-slate-600 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Total Amount</span>
                    <span className="text-[17px] md:text-2xl font-black text-slate-900 tracking-tighter">
                      ₹{Math.round(offerPrice * (isAdded ? (existingInCart?.quantity || quantity) : quantity))}
                    </span>
                  </div>

                  <div className="flex items-center bg-slate-100 gap-1 rounded-xl p-1 border border-slate-200">
                    <button
                      onClick={handleDecrease}
                      className="cursor-pointer w-7 h-7 md:w-10 md:h-10 flex items-center justify-center bg-white rounded-lg shadow-sm active:scale-95 disabled:opacity-50 text-slate-700"
                      disabled={quantity <= 1 || isAdded || isStoreClosed}
                    >
                      <Minus size={14} md:size={16} strokeWidth={3} />
                    </button>
                    <span className="w-8 md:w-12 text-center font-black text-xs md:text-base text-slate-900">
                      {isAdded ? (existingInCart?.quantity || quantity) : quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      className={`cursor-pointer w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-lg shadow-sm active:scale-95 transition-all ${quantity >= maxAvailableToAdd || isAdded || isStoreClosed ? 'bg-slate-200 text-gray-500' : 'bg-white text-slate-700'}`}
                      disabled={isAdded || isStoreClosed}
                    >
                      <Plus size={14} md:size={16} strokeWidth={3} />
                    </button>
                  </div>
                </div>

                {!isAdded ? (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={isStoreClosed}
                    className={`cursor-pointer w-full font-black py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg text-[11px] md:text-sm uppercase tracking-widest transition-all duration-200 
                      ${isStoreClosed ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-black hover:shadow-xl'}`}
                  >
                    <ShoppingBag size={16} md:size={18} strokeWidth={2.5} />
                    {isStoreClosed ? "Store Closed" : "Add to Cart"}
                  </motion.button>
                ) : (
                  <div className="flex gap-2 md:gap-3">
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onClose()} 
                      className="cursor-pointer flex-[1] bg-white text-slate-900 font-black py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-1.5 shadow-sm text-[10px] md:text-xs uppercase tracking-widest border-2 border-slate-200 hover:bg-slate-50"
                    >
                      <PlusCircle size={14} md:size={16} strokeWidth={2.5} />
                      <span className="hidden sm:inline">Add More</span>
                      <span className="sm:hidden">More</span>
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { 
                        onClose(true); 
                        navigate("/cart"); 
                      }}
                      className="cursor-pointer flex-[1.5] bg-primary text-black font-black py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#e59802]"
                    >
                      View Cart
                      <ArrowRight size={16} md:size={18} strokeWidth={2.5} />
                    </motion.button>
                  </div>
                )}
              </>
            ) : (
              // Out of Stock Warning Logic with Variant Check
              <div className="space-y-2.5 md:space-y-4">
                <div className="flex items-start md:items-center gap-2 md:gap-3 bg-red-50 border border-red-100 p-2 md:p-4 rounded-xl">
                  <AlertCircle className="text-red-500 shrink-0 mt-0.5 md:mt-0" size={14} md:size={20} />
                  <p className="text-red-600 font-bold text-[9px] md:text-xs leading-tight">
                    {availableStock === 0 ? (
                      hasVariants 
                        ? `The selected variant is out of stock Please select another one.`
                        : "Sold Out! This item is currently out of stock."
                    ) : (
                      `Hurry! Only ${maxAvailableToAdd} left in your limit.`
                    )}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { 
                    onClose(true); 
                    navigate("/cart"); 
                  }}
                  className="cursor-pointer w-full bg-slate-900 text-white font-black py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg text-[11px] md:text-sm uppercase tracking-widest hover:bg-black"
                >
                  View Cart
                  <ArrowRight size={16} md:size={18} strokeWidth={2.5} />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;