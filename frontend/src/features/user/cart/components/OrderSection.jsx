import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../../redux/cartSlice'; 
import { MapPin, ShoppingBag, Banknote, ChevronLeft, CheckCircle2, Timer } from 'lucide-react';
import { useOrder } from '../hook/useOrder';
import { toast } from 'sonner';


export const OrderSection = ({ selectedAddress, cartItems, subTotal, totalAmount, onPlaceOrder, onBack, setIsOrderProcessing ,isStoreClosed}) => {
  const { placeOrder, isSubmitting } = useOrder();
  const dispatch = useDispatch(); 

  const finalPayable = subTotal;

  const handleConfirmOrder = async () => {
    if (isStoreClosed) {
      toast.error("Sorry, the store just closed. We cannot accept this order now.");
      return;
    }
    setIsOrderProcessing(true);

    const result = await placeOrder(selectedAddress, cartItems, finalPayable);

    if (result.success) {
      dispatch(clearCart()); 
      
      onPlaceOrder(); 
    } else {
      setIsOrderProcessing(false);
    }
  };

  return (
    <div className="space-y-8 py-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Order Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Address Summary */}
          <div className="bg-white p-6 rounded-[2rem] border-2 border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={18} className="text-[#f9a602]" />
              <h4 className="text-xs font-black text-black uppercase tracking-widest">Delivery Address</h4>
            </div>
            <div className="pl-7">
              <p className="text-sm font-black uppercase text-black">
                {selectedAddress?.address_type || "No Type"}
              </p>
              <p className="text-xs text-gray-600 font-bold mt-1 leading-relaxed truncate">
                {selectedAddress?.complete_address}, {selectedAddress?.landmark}, {selectedAddress?.pincode}
              </p>
            </div>
          </div>

          {/* 2. Items List */}
          <div className="bg-white p-6 rounded-[2rem] border-2 border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
              <ShoppingBag size={18} className="text-[#f9a602]" />
              <h4 className="text-xs font-black text-black uppercase tracking-widest">Your Items</h4>
            </div>
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center font-black text-[10px] border border-gray-100">
                      <img src={item.image} alt=" product" className="w-full h-full object-cover  rounded-xl " />
                    </div>
                    <div>
                      <p className="text-[11px] md:text-xs font-black uppercase text-black">
                        {item.name}
                      </p>
                      <p className="text-[9px] text-gray-500 font-bold"> {item.quantity} x ₹{item.offer_price}</p>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm font-black text-black tracking-tight">
                  ₹{item.offer_price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white p-6 rounded-[2rem] border-2 border-gray-100 shadow-sm">
             <h4 className="text-[10px] font-black text-gray-500 uppercase mb-4 tracking-widest">Payment Method</h4>
             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border-2 border-black">
               <div className="flex items-center gap-3">
                 <Banknote className="text-black" />
                 <span className="text-xs font-black uppercase">Cash On Delivery</span>
               </div>
               <CheckCircle2 className="text-black" size={20} />
             </div>
             <p className="text-[9px] text-gray-500 font-bold mt-3 ml-1 uppercase">* Pay when you receive your food</p>
          </div>
        </div>

        {/* Right Side: Bill Summary & Place Order */}
        <div className="lg:sticky lg:top-32">
          <div className="bg-black text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            <h4 className="relative z-10 text-[10px] font-black text-[#f9a602] uppercase tracking-[0.2em] mb-8">Bill Details</h4>
            
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Subtotal</span>
                <span>₹{subTotal}</span>
              </div>
              
              <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Delivery Fee</span>
                <span className="text-green-400 font-black">FREE</span>
              </div>

              <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Delivery Time</span>
                <span className="text-white font-black flex items-center gap-1.5">
                  <Timer size={13} className="text-[#f9a602]" /> 20-30 MIN
                </span>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-800">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Amount</span>
                  <span className="text-xl md:text-2xl font-black text-[#f9a602]">₹ {finalPayable}</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 space-y-2 mt-8">
              <button 
               onClick={handleConfirmOrder} 
      disabled={isSubmitting || isStoreClosed}
                className="cursor-pointer w-full bg-[#f9a602] text-black py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-primary/80 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
              >
              {isStoreClosed ? "Store Closed" : "Place Order Now"}
              </button>

              <button 
                onClick={onBack} 
                disabled={isSubmitting}
                className="cursor-pointer w-full text-white/90 py-3 rounded-xl font-black uppercase tracking-widest text-[9px] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <ChevronLeft size={12}/> Back to Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSection;