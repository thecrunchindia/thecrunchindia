import React, { useState, useRef } from 'react'; 
import { Clock, User, Printer, X, Truck, MapPin, Loader2 } from 'lucide-react';
import { usePreparingOrders } from '../hooks/usePreparingOrders';
import { OrderSkeleton } from './OrderSkeleton';
import { OrderError } from './OrderError';
import DeleteModal from './DeleteModal';
import { useOrderTime } from '../hooks/useOrderTime';
import { useReactToPrint } from 'react-to-print'; 
import { OrderReceipt } from './OrderReceipt'; 

const PreparingOrderRow = ({ order, onDispatch, onCancelClick, isUpdating, updatingOrderId }) => {
  const { elapsedTime, formattedDate } = useOrderTime(order.created_at);
  const componentRef = useRef(null); 
  const isThisOrderUpdating = isUpdating && updatingOrderId === order.id;

  // React to print hook setup
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  return (
    <>
      {/* പ്രിന്റിന് മാത്രമുള്ള മറഞ്ഞിരിക്കുന്ന ഭാഗം */}
      <div className="hidden">
        <div ref={componentRef}>
          <OrderReceipt order={order} />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl mb-8 overflow-hidden shadow-xl transition-all">
        <div className="px-6 py-2.5 flex justify-between items-center bg-gray-100 border-b border-gray-100 ">
          <div className="flex items-center gap-3">
            <span className="text-sm font-black text-gray-900 tracking-tight">
              ORDER <span className="text-blue-500">#{order.id}</span>
            </span>
            <div className="flex items-center gap-1 text-blue-500 ml-2">
              <Clock size={12} />
              <span className="text-[10px] font-black pr-2">{elapsedTime}</span>
              <span className="text-[10px] text-gray-500 font-bold border-l pl-2">{formattedDate}</span>
            </div>
          </div>
          
          {/* Print Button - handlePrint കണക്ട് ചെയ്തു */}
          <button 
            onClick={() => handlePrint()}
            className="cursor-pointer flex items-center gap-1.5 text-gray-700 bg-white border border-gray-200 px-4 py-1.5 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Printer size={14} className='text-blue-600' />
            <span className="text-[10px] font-black uppercase tracking-widest">Print</span>
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-gray-50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                <User size={18} />
              </div>
              <div>
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Customer</p>
                <h3 className="text-sm font-black text-gray-900 leading-tight">{order.customer_name}</h3>
                <p className="text-[10px] font-bold text-gray-500">{order.customer_phone}</p>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-1 max-w-md">
              <div className="flex items-center gap-1 text-gray-500 md:justify-end">
                <MapPin size={13} className="shrink-0" />
                <p className="text-[8px] font-black uppercase tracking-widest">Location</p>
              </div>
              <p className="text-[11px] font-bold text-gray-500 italic md:text-right leading-snug">
                {order.delivery_address?.complete_address}, {order.delivery_address?.pincode}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Items being Prepared</p>
              <p className="text-[13px] font-bold text-gray-700 leading-relaxed">
                {order.items.map((item, idx) => {
                  // MODIFIED: Adding variant name (size_name) with the item name if it exists
                  const displayName = item.size_name 
                    ? `${item.item_name} (${item.size_name})` 
                    : item.item_name;

                  return (
                    <span key={idx}>
                      <span className="text-blue-500 font-black">{item.quantity}x</span> {displayName}
                      {idx < order.items.length - 1 ? ', ' : ''}
                    </span>
                  );
                })}
              </p>
            </div>
            <div className="md:text-right shrink-0">
              <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Total Amount</p>
              <p className="text-xl font-black text-gray-900 tracking-tighter">
                <span className="text-[12px] mr-0.5">₹</span>{order.total_amount}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              disabled={isUpdating}
              onClick={() => onCancelClick(order.id)}
              className="cursor-pointer flex-2 sm:flex-1 flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-xl font-black text-[10px] uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X size={16} /> Cancel
            </button>
            <button 
              disabled={isUpdating}
              onClick={() => onDispatch(order.id)}
              className="cursor-pointer flex-[4] flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase shadow-lg shadow-blue-200 disabled:opacity-50"
            >
              {isThisOrderUpdating ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Truck size={16} />
              )}
              {isThisOrderUpdating ? 'Processing...' : 'Set Out for Delivery'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const PreparingOrders = () => {
  const { orders, isLoading, isError, error, updateStatus, isUpdating } = usePreparingOrders();
  const [modalData, setModalData] = useState({ isOpen: false, orderId: null });
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const handleDispatch = (id) => {
    setUpdatingOrderId(id);
    updateStatus({ orderId: id, status: 'ON_THE_WAY' });
  };

  const handleConfirmCancel = (id) => {
    setUpdatingOrderId(id);
    updateStatus(
      { orderId: id, status: 'CANCELLED' },
      {
        onSuccess: () => {
          setModalData({ isOpen: false, orderId: null });
          setUpdatingOrderId(null);
        },
        onError: () => setUpdatingOrderId(null)
      }
    );
  };

  if (isLoading) return <OrderSkeleton />;
  if (isError) return <OrderError message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="max-w-7xl mx-auto py-2">
      {orders.length > 0 ? (
        orders.map(order => (
          <PreparingOrderRow 
            key={order.id} 
            order={order} 
            onDispatch={handleDispatch}
            onCancelClick={(id) => setModalData({ isOpen: true, orderId: id })}
            isUpdating={isUpdating}
            updatingOrderId={updatingOrderId}
          />
        ))
      ) : (
        <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest">
          No Orders in Preparation
        </div>
      )}

      <DeleteModal 
        isOpen={modalData.isOpen}
        orderId={modalData.orderId}
        isDeleting={isUpdating && updatingOrderId === modalData.orderId}
        onClose={() => !isUpdating && setModalData({ isOpen: false, orderId: null })}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
};

export default PreparingOrders;