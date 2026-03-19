import React from 'react';

export const OrderReceipt = React.forwardRef(({ order }, ref) => {
  if (!order) return null;
  return (
    <div ref={ref} className="p-8 bg-white text-black" style={{ 
       width: '80mm', 
       margin: '0 auto',
       minHeight: '100px' 
     }}>
      <div className="text-center border-b pb-4 mb-4">
        <h1 className="text-xl font-bold uppercase">The Crunch</h1>
        <p className="text-xs">Order ID: #{order.id}</p>
        <p className="text-xs">{new Date().toLocaleString()}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-bold">Customer: {order.customer_name}</p>
        <p className="text-xs">Phone: {order.customer_phone}</p>
        <p className="text-xs whitespace-pre-wrap">{order.delivery_address?.complete_address}</p>
      </div>

      <table className="w-full text-xs mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-left py-1">Item</th>
            <th className="text-right py-1">Qty</th>
            <th className="text-right py-1">Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, i) => {
            // പേരിനൊപ്പം വേരിയന്റ് കൂടി ചേർക്കുന്നു
            const displayName = item.size_name 
              ? `${item.item_name} (${item.size_name})` 
              : item.item_name;

            return (
              <tr key={i}>
                <td className="py-1">{displayName}</td>
                <td className="text-right">{item.quantity}</td>
                <td className="text-right">₹{item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="border-t pt-2 text-right">
        <p className="font-bold">Total: ₹{order.total_amount}</p>
        <p className="text-[10px] italic">Payment: {order.payment_method}</p>
      </div>
    </div>
  );
});