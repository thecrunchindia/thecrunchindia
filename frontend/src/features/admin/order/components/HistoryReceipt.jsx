import React from 'react';

export const HistoryReceipt = React.forwardRef(({ order }, ref) => {
  if (!order) return null;

  const isCancelled = order.order_status === 'CANCELLED';
  const primaryColor = "#f9a602";

  return (
    <div ref={ref} className="p-10 bg-white text-black font-sans" style={{ width: '210mm', minHeight: '297mm', margin: '0 auto' }}>
      
      {/* Header Section */}
      <div className="flex justify-between items-start border-b-4 pb-6 mb-8" style={{ borderColor: primaryColor }}>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">The <span style={{ color: primaryColor }}>Crunch</span></h1>
          <p className="text-sm font-bold text-gray-600 tracking-widest uppercase">Invoice Report</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-black uppercase">Order #{order.id}</h2>
          <p className="text-xs font-bold text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex mb-8 border-2 border-black">
        <div className="flex-1 p-3 border-r-2 border-black">
          <p className="text-[10px] font-black uppercase text-gray-500">Payment Method</p>
          <p className="font-bold uppercase">{order.payment_method}</p>
        </div>
        <div className={`flex-1 p-3 ${isCancelled ? 'bg-red-50' : 'bg-gray-50'}`}>
          <p className="text-[10px] font-black uppercase text-gray-500">Order Status</p>
          <p className={`font-black uppercase ${isCancelled ? 'text-red-600' : 'text-black'}`}>
            {order.order_status}
          </p>
        </div>
      </div>

      {/* Customer & Address Details */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="border-l-4 border-black pl-4">
          <h3 className="text-[10px] font-black uppercase text-gray-400 mb-1">Customer Details</h3>
          <p className="text-lg font-black">{order.customer_name}</p>
          <p className="text-sm font-bold">{order.customer_phone}</p>
        </div>
        <div className="border-l-4 border-black pl-4">
          <h3 className="text-[10px] font-black uppercase text-gray-400 mb-1">Delivery Address</h3>
          <p className="text-sm font-medium leading-relaxed">
            {order.delivery_address?.complete_address || 'N/A'}
            <br />
            <span className="font-bold">PIN: {order.delivery_address?.pincode || 'N/A'}</span>
          </p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-black text-white">
            <th className="text-left p-4 text-xs font-black uppercase tracking-widest">Item Description</th>
            <th className="text-center p-4 text-xs font-black uppercase tracking-widest">Price</th>
            <th className="text-center p-4 text-xs font-black uppercase tracking-widest">Qty</th>
            <th className="text-right p-4 text-xs font-black uppercase tracking-widest">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-gray-100">
          {order.items.map((item, i) => {
            // MODIFIED: Adding variant name (size_name) with the item name if it exists
            const displayName = item.size_name 
              ? `${item.item_name} (${item.size_name})` 
              : item.item_name;

            return (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4">
                  <p className="font-black text-gray-900 uppercase">{displayName}</p>
                  <p className="text-[10px] text-gray-500 font-bold">Item ID: {item.item_id}</p>
                </td>
                <td className="p-4 text-center font-bold">₹{item.price}</td>
                <td className="p-4 text-center font-black" style={{ color: primaryColor }}>{item.quantity}</td>
                <td className="p-4 text-right font-black text-lg">₹{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Cancellation Info (Only if cancelled) */}
      {isCancelled && (
        <div className="mb-8 p-4 bg-black text-white flex justify-between items-center rounded-sm">
          <span className="text-xs font-black uppercase tracking-widest">Order Cancelled By:</span>
          <span className="text-lg font-black uppercase" style={{ color: primaryColor }}>
             {order.cancelled_by_display || 'Admin'}
          </span>
        </div>
      )}

      {/* Summary Section */}
      <div className="flex justify-end pt-6 border-t-2 border-gray-100">
        <div className="w-80">
          <div className="flex justify-between py-2 px-2">
            <span className="text-sm font-bold text-gray-500 uppercase">Subtotal</span>
            <span className="font-bold">₹{order.subtotal}</span>
          </div>
          <div className="flex justify-between py-2 px-2">
            <span className="text-sm font-bold text-gray-500 uppercase">Delivery Fee</span>
            <span className="font-bold">₹{order.delivery_fee}</span>
          </div>
          <div className="flex justify-between py-4 px-2 bg-black mt-2">
            <span className="text-lg font-black uppercase text-white tracking-widest">Amount Paid</span>
            <span className="text-xl font-black" style={{ color: primaryColor }}>₹{order.total_amount}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 text-center">
        {isCancelled ? (
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
              Order Cancelled
            </p>
            <p className="text-[10px] font-bold text-gray-400 italic">
              We hope to serve you better next time.
            </p>
          </div>
        ) : (
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            Thank you for ordering with The Crunch
          </p>
        )}
        
        <div className="mt-4 flex justify-center gap-4">
            <div className={`h-1 w-12 ${isCancelled ? 'bg-red-500' : 'bg-black'}`}></div>
            <div className="h-1 w-12" style={{ backgroundColor: primaryColor }}></div>
            <div className={`h-1 w-12 ${isCancelled ? 'bg-red-500' : 'bg-black'}`}></div>
        </div>
      </div>
    </div>
  );
});