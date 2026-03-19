import React from 'react';
import { Trash2, ArrowRight, ReceiptText, Plus, AlertCircle, RefreshCw, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="p-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] flex gap-4">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-2xl"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
      </div>
    ))}
  </div>
);

const ErrorState = ({ message }) => (
  <div className="p-10 text-center bg-white border-2 border-red-50 rounded-[2.5rem] my-10 space-y-4 shadow-sm">
    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
      <AlertCircle className="text-red-500" size={30} />
    </div>
    <h3 className="font-black text-black uppercase italic text-xl tracking-tight">Something went wrong</h3>
    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest max-w-xs mx-auto">{message}</p>
    <button onClick={() => window.location.reload()} className="flex items-center gap-2 mx-auto bg-black text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase hover:bg-red-500 transition-colors shadow-lg">
      <RefreshCw size={14} /> Try Again
    </button>
  </div>
);

export const CartSection = ({ 
  cartItems, 
  subTotal, 
  totalAmount, 
  incrementQty, 
  decrementQty, 
  removeItem, 
  onNext,
  loading,
  error,
  isStoreClosed 
}) => {
  const isCartEmpty = cartItems.length === 0;

  if (error) return <ErrorState message={error} />;

  const isDisableConfirm = cartItems.some(item => item.isOutOfStock) || isStoreClosed;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end justify-between border-b border-gray-100 pb-4">
        <h2 className="text-md md:text-3xl font-black uppercase tracking-tight italic text-black">
          Checkout <span className="text-[#f9a602]">Details</span>
        </h2>
        {!isCartEmpty && !loading && (
          <Link to="/menu" className="group flex items-center gap-1.5 text-[8px] bg-gray-100 p-2 rounded-lg md:text-[10px] font-black uppercase tracking-widest text-gray-700 hover:text-[#f9a602] transition-colors">
            <Plus size={12} className="group-hover:rotate-90 transition-transform" />
            Add More Items
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className={`${(isCartEmpty || loading) ? 'lg:col-span-3' : 'lg:col-span-2'} space-y-4`}>
          
          {loading ? (
            <CartSkeleton />
          ) : !isCartEmpty ? (
            cartItems.map((item) => {
              const currentStock = item.currentStock || 0;
              const isMaxReached = item.quantity >= currentStock;
              const isOutOfStock = item.isOutOfStock;
              
              return (
                <div key={item.id} className={`p-4 bg-white border transition-all duration-300 ${isOutOfStock ? 'border-red-500 bg-red-50/30' : 'border-gray-100'} rounded-[1.5rem] flex flex-col gap-2 shadow-md hover:shadow-sm`}>
                  <div className="flex items-center gap-4">
                    <img src={item.image} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover bg-gray-50 shadow-inner" alt={item.name} />
                    
                    <div className="flex-1 min-w-0">
                      {/* USE display_name OR name based on variant */}
                      <h3 className="font-black text-black text-[11px] md:text-sm uppercase truncate tracking-tight">
                        {item.display_name || item.name}
                      </h3>
                      <p className="text-[#f9a602] font-black text-[12px] md:text-sm mt-0.5">₹{item.offer_price}</p>
                      
                      <div className="flex items-center bg-gray-50 border border-gray-300 w-fit rounded-lg mt-2 overflow-hidden">
                        <button onClick={() => decrementQty(item)} className="px-2 py-1 bg-white text-black font-bold border-r border-gray-300 cursor-pointer hover:bg-gray-100">-</button>
                        <span className="px-3 font-black text-[10px] text-black">{item.quantity}</span>
                        <button 
                          onClick={() => incrementQty(item)} 
                          disabled={isMaxReached}
                          className={`px-2 py-1 font-bold ${isMaxReached ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white border-l border-gray-300 text-black hover:bg-gray-100'}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-black text-sm md:text-base text-black tracking-tight">₹{(parseFloat(item.offer_price) * item.quantity).toFixed(0)}</p>
                      {/* Pass variant_id also when removing an item */}
                      <button onClick={() => removeItem(item.id, item.item_id, item.variant_id)} className="cursor-pointer text-red-500 hover:text-red-600 transition-colors mt-1 p-1">
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </div>

                  {isOutOfStock && (
                    <div className="flex items-center gap-1.5 text-red-600 bg-red-100/50 p-2 rounded-xl border border-red-200 animate-in zoom-in-95 duration-300">
                      <AlertCircle size={12} />
                      <span className="text-[9px] font-bold uppercase">{currentStock === 0 ? "Out of Stock!" : `Only ${currentStock} units left!`}</span>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-16 border-2 border-dashed border-gray-100 rounded-[2.5rem] text-center">
              <p className="font-black text-gray-500 uppercase tracking-widest text-xs mb-4">Your bag is empty</p>
              <Link to="/menu" className="inline-block bg-black text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#f9a602] hover:text-black transition-all">Go To Menu</Link>
            </div>
          )}
        </div>

        {!isCartEmpty && !loading && (
          <div className="lg:sticky lg:top-32">
            <div className="bg-white border-2 border-gray-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm relative overflow-hidden">
              <ReceiptText className="absolute left-0 -top-4 text-primary/10 w-24 h-24 -rotate-30" />
              
              <h4 className="relative z-10 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-6">Order Summary</h4>
              
              <div className="relative z-10 space-y-3">
                <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <span>Subtotal</span>
                  <span>₹{subTotal}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <span>Delivery</span>
                  <span className="text-green-500 font-black">FREE</span>
                </div>
                <div className="pt-4 mt-4 border-t-2 border-dashed border-gray-100">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-black uppercase tracking-widest">Total Payable</span>
                    <span className="text-3xl font-black text-black tracking-tighter">₹{Number(totalAmount).toFixed(0)}</span>
                  </div>
                </div>
              </div>

              {/* Error/Status Message right above the button */}
              <div className="mt-8 relative z-10 space-y-2">
                {isStoreClosed && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-red-600">
                    <Clock size={16} className="shrink-0" />
                    <span className="text-[9px] font-black uppercase tracking-tight">Store is closed.</span>
                  </div>
                )}

                <button 
                  onClick={onNext} 
                  disabled={isDisableConfirm}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 shadow-lg transition-all
                    ${isDisableConfirm ? 'bg-black text-white  cursor-not-allowed border border-gray-100' : 'bg-black text-white hover:bg-[#f9a602] hover:text-black active:scale-95'}`}
                >
                  {isStoreClosed ? "Store Closed" : "Confirm Items"} <ArrowRight size={14}/>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSection;