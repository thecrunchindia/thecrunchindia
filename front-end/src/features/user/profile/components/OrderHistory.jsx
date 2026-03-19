import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, ShoppingBag, XCircle, AlertCircle, Clock, Calendar, UtensilsCrossed } from "lucide-react";
import { useOrderHistory } from "../hooks/useOrderHistory";
import { useNavigate } from "react-router-dom";

// --- Skeleton UI ---
const OrderSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-28 w-full bg-gray-100 animate-pulse rounded-[1.5rem]" />
    ))}
  </div>
);

const OrderHistory = () => {
  const { orders, isLoading, error, cancelOrder, isCancelling } = useOrderHistory();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const navigate = useNavigate();

  if (isLoading) return <OrderSkeleton />;

  if (error) return (
    <div className="p-10 flex flex-col items-center  text-center">
      <AlertCircle className="text-red-500 mb-2" size={32} />
      <p className="text-red-600 font-black text-xs uppercase tracking-widest">{error}</p>
    </div>
  );

  if (!orders || orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-4 px-4 text-center"
      >
        <div className="w-20 h-20  rounded-full flex items-center justify-center mb-6 shadow-lg shadow-gray-200">
          <UtensilsCrossed className="text-primary" size={40} />
        </div>
        <h2 className="text-lg font-black text-black uppercase tracking-tight">No Orders Yet</h2>
        <p className="text-xs text-gray-500 mt-2 mb-8 max-w-[350px] font-medium leading-relaxed">
          Looks like you haven't placed any orders yet. Time to grab something delicious!
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-black text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
        >
          Order Now
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {orders.map((order) => {
          const isPending = order.order_status === "PLACED" || order.order_status === "PENDING";
          const isPaid = order.payment_status === "COMPLETED" || order.payment_status === "PAID";
          const isExpanded = expandedOrder === order.id;

          return (
            <div key={order.id} className="relative bg-white border border-gray-100 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-md transition-all">

              <div
                className="p-5 md:p-6 cursor-pointer"
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
              >
                {/* Main Flex Container */}
                <div className="flex justify-between items-start md:items-center">

                  {/* LEFT SIDE: ID, Date, and Status (Mobile: Stacked) */}
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-10 flex-1">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 p-3 rounded-2xl hidden md:block">
                        <ShoppingBag className="text-gray-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-[10px] font-black text-gray-500  tracking-tighter leading-none mb-1">ORDER-#{order.id}</h3>
                        <p className="text-sm font-black text-black uppercase flex items-center gap-1">
                          <Calendar size={14} className="text-gray-500" />
                          {new Date(order.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-black text-[9px] uppercase tracking-wide ${order.order_status === "DELIVERED" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                        }`}>
                        {order.order_status === "DELIVERED" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {order.order_status}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Cancel, Total, Details (Stacked in Mobile) */}
                  <div className="flex flex-col items-end justify-between min-h-[90px] md:min-h-0 md:gap-1">
                    {/* Top: Cancel Button */}
                    <div className="h-8">
                      {isPending && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOrderToCancel(order.id);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-xl text-[9px] font-black uppercase hover:bg-red-500 hover:text-white transition-all border border-red-100"
                        >
                          <XCircle size={14} /> Cancel
                        </button>
                      )}
                    </div>

                    {/* Center: Total Amount */}
                    <div className="py-1">
                      <p className="text-lg font-black text-black tracking-tight flex flex-col md:flex-row items-end md:items-center md:gap-1">
                        <span className="text-[8px] md:text-[9px] font-black text-gray-500 uppercase">Total</span>
                        ₹{Math.round(order.total_amount)}
                      </p>
                    </div>

                    {/* Bottom: Details Button */}
                    <div className="flex items-center gap-1 text-[9px] font-black text-gray-700 uppercase tracking-widest">
                      Details <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Expanded Section --- */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-50 bg-gray-50/40"
                  >
                    <div className="p-6 space-y-4">
                      {order.items.map((item, idx) => {
                        // FIX: Display name with variant size if available
                        const displayName = item.size_name 
                          ? `${item.item_name} (${item.size_name})` 
                          : item.item_name;

                        return (
                          <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden border border-gray-100">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.item_name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <ShoppingBag size={18} className="text-gray-300" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="text-xs font-black uppercase text-gray-800 leading-tight mb-1">
                                  {displayName}
                                </p>
                                <p className="text-[10px] font-bold text-gray-500 uppercase">Qty: {item.quantity} <span className="text-[8px]">x</span> ₹{Math.round(item.price)}</p>
                              </div>
                            </div>
                            <p className="text-sm font-black text-black">₹{Math.round(item.price * item.quantity)}</p>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* --- Cancel Modal --- */}
      <AnimatePresence>
        {orderToCancel && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-14 h-14 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={28} />
              </div>

              <h2 className="text-base font-black text-black uppercase">Cancel Order?</h2>
              <p className="text-[11px] text-gray-500 mt-2 font-medium">
                Are you sure you want to cancel this order?
              </p>

              <div className="grid grid-cols-2 gap-3 mt-8">
                {/* Cancel Button - Disabled during API call */}
                <button
                  onClick={() => setOrderToCancel(null)}
                  disabled={isCancelling}
                  className={`py-3 rounded-2xl text-[9px] font-black uppercase transition-all ${isCancelling ? "bg-gray-50 text-gray-300" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  Close
                </button>

                {/* Confirm Button - Shows loading state */}
                <button
                  onClick={async () => {
                    // onSuccess ലഭിക്കുന്നത് വരെ മോഡൽ ക്ലോസ് ചെയ്യില്ല
                    cancelOrder(orderToCancel, {
                      onSuccess: () => {
                        setOrderToCancel(null);
                      }
                    });
                  }}
                  disabled={isCancelling}
                  className={`py-3 rounded-2xl text-[9px] font-black uppercase shadow-lg transition-all flex items-center justify-center gap-2 ${isCancelling
                    ? "bg-red-300 text-white shadow-none cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600 shadow-red-100"
                    }`}
                >
                  {isCancelling ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Wait...
                    </>
                  ) : (
                    "Yes, Cancel"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderHistory;