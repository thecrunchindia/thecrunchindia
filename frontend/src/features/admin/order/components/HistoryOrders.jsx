import React, { useRef, useState, useEffect } from 'react';
import { Clock, User, Printer, MapPin, Info, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useOrderHistory } from '../hooks/useOrderHistory';
import { OrderSkeleton } from './OrderSkeleton';
import { OrderError } from './OrderError';
import { useOrderTime } from '../hooks/useOrderTime';
import { useReactToPrint } from 'react-to-print';
import { HistoryReceipt } from './HistoryReceipt';

const HistoryRow = ({ order }) => {
  const { elapsedTime, formattedDate } = useOrderTime(order.created_at);
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  const isDelivered = order.order_status === 'DELIVERED';
  const statusStyles = {
    DELIVERED: "bg-green-100 text-green-700 border-green-200",
    CANCELLED: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <>
      <div className="hidden">
        <div ref={componentRef}>
          <HistoryReceipt order={order} />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl mb-6 overflow-hidden shadow-sm hover:shadow-md transition-all">
        <div className="px-6 py-3 flex justify-between items-center bg-gray-50 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-black text-gray-900">
              ORDER <span className={isDelivered ? "text-green-600" : "text-red-600"}>#{order.id}</span>
            </span>
            <div className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${statusStyles[order.order_status]}`}>
              {order.order_status}
            </div>
            <div className="flex items-center gap-1 text-gray-500 ml-2">
              <Clock size={12} />
              <span className="text-[10px] font-bold">{formattedDate}</span>
            </div>
          </div>
          
          <button 
            onClick={() => handlePrint()}
            className="cursor-pointer flex items-center gap-1.5 text-gray-700 bg-white border border-gray-200 px-4 py-1.5 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <Printer size={14} className={isDelivered ? 'text-green-600' : 'text-red-600'} />
            <span className="text-[10px] font-black uppercase">Print</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-gray-50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
                <User size={18} />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900">{order.customer_name}</h3>
                <p className="text-[10px] font-bold text-gray-500">{order.customer_phone}</p>
              </div>
            </div>
            {order.delivery_address && (
              <div className="flex flex-col md:items-end max-w-md">
                <div className="flex items-center gap-1 text-gray-500 md:justify-end">
                  <MapPin size={13} />
                  <p className="text-[8px] font-black uppercase">Delivery Address</p>
                </div>
                <p className="text-[11px] font-medium text-gray-500 md:text-right">
                  {order.delivery_address.complete_address}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-end">
            <div className="flex-1">
              <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Items Ordered</p>
              <p className="text-[13px] font-bold text-gray-700">
                {order.items.map((item, idx) => {
                  // MODIFIED: Adding variant name (size_name) with the item name if it exists
                  const displayName = item.size_name 
                    ? `${item.item_name} (${item.size_name})` 
                    : item.item_name;

                  return (
                    <span key={idx}>
                      <span className="text-[#f9a602] font-black">{item.quantity}x</span> {displayName}
                      {idx < order.items.length - 1 ? ', ' : ''}
                    </span>
                  );
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-black text-gray-500 uppercase">Total Paid</p>
              <p className="text-lg font-black text-gray-900">₹{order.total_amount}</p>
            </div>
          </div>

          {order.order_status === 'CANCELLED' && order.cancelled_by_display && (
            <div className="flex items-center gap-2 mt-2 p-2 bg-red-50 rounded-lg border border-red-100">
              <Info size={14} className="text-red-500" />
              <p className="text-[11px] font-bold text-red-600">
                Cancelled by: <span className="uppercase">{order.cancelled_by_display || 'Unknown'}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const HistoryOrders = () => {
  const [page, setPage] = useState(1);
  const [displaySearch, setDisplaySearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const topRef = useRef(null);

  const { orders, totalCount, isLoading, isError, error, hasNext, hasPrev } = useOrderHistory(page, debouncedSearch);

  // Pagination Logic
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(displaySearch);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [displaySearch]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setTimeout(() => {
      const topElement = document.getElementById('top-of-history');
      if (topElement) {
        topElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const clearSearch = () => {
    setDisplaySearch('');
    setDebouncedSearch('');
    setPage(1);
    setTimeout(() => {
      const topElement = document.getElementById('top-of-history');
      if (topElement) {
        topElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  if (isError) return <OrderError message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="max-w-7xl mx-auto py-4 px-4">
      <div id="top-of-history" className="scroll-mt-4" />

      {/* Search Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-2">
           <div className="w-2 h-8 bg-primary rounded-full" />
           <h2 className="text-xl font-black text-gray-800 uppercase tracking-tighter">Order History</h2>
        </div>
        
        <div className="relative w-full md:w-80 group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
            <Search size={16} className="text-gray-600 group-focus-within:text-primary" />
          </div>
          <input
            type="text"
            placeholder="SEARCH BY ORDER ID..."
            value={displaySearch}
            onChange={(e) => setDisplaySearch(e.target.value)}
            className="w-full bg-white border border-gray-300 placeholder:text-gray-500 shadow-xl pl-10 pr-10 py-2.5 rounded-xl text-xs font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
          />
          {displaySearch && (
            <button 
              onClick={clearSearch}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Orders List & Loading Logic */}
      {isLoading ? (
        <OrderSkeleton />
      ) : orders.length > 0 ? (
        <>
          <div className="min-h-[400px]">
            {orders.map(order => <HistoryRow key={order.id} order={order} />)}
          </div>

          {/* Updated Pagination with Page X of Y */}
          <div className="flex justify-center items-center gap-6 mt-12 pb-16">
            <button
              disabled={!hasPrev}
              onClick={() => handlePageChange(page - 1)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-[10px] uppercase transition-all shadow-sm ${
                !hasPrev 
                ? 'text-gray-300 border-gray-100 bg-gray-50' 
                : 'text-gray-700 border-gray-200 bg-white hover:bg-gray-50 hover:border-primary/30 active:scale-95 cursor-pointer'
              }`}
            >
              <ChevronLeft size={16} />
              Prev
            </button>
            
            <div className="flex flex-col items-center min-w-[120px]">
               <span className="text-[10px] font-black text-gray-600   uppercase tracking-[0.2em] mb-1">
                Page {page} of {totalPages}
               </span>
               <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300" 
                    style={{ width: `${(page / totalPages) * 100}%` }}
                  />
               </div>
            </div>

            <button
              disabled={!hasNext}
              onClick={() => handlePageChange(page + 1)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-[10px] uppercase transition-all shadow-sm ${
                !hasNext 
                ? 'text-gray-300 border-gray-100 bg-gray-50' 
                : 'text-gray-700 border-gray-200 bg-white hover:bg-gray-50 hover:border-primary/30 active:scale-95 cursor-pointer'
              }`}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-32 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
          <div className="p-4 bg-white rounded-full shadow-sm mb-4">
            <Search size={32} className="text-gray-200" />
          </div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
            {displaySearch ? `No orders found for #${displaySearch}` : 'No History Available'}
          </p>
          {displaySearch && (
            <button onClick={clearSearch} className="mt-4 text-[10px] font-black text-primary underline uppercase underline-offset-4">
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryOrders;