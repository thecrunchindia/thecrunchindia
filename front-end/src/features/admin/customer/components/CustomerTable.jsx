import React from 'react';
import { Mail, Phone, ShoppingBag, Calendar, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import CustomerSkeleton from './CustomerSkeleton';
import ErrorState from '../components/ErrorState';

const CustomerTable = ({
  customers, isLoading, isError, error, onRetry,
  onToggleStatus, hasMore, loadMore, isMoreLoading, onShowLess
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-[1rem] shadow-sm overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-50">
              <th className="py-6 px-10 text-[10px] font-black text-gray-500 uppercase tracking-widest">Profile & Contact</th>
              <th className="py-6 px-8 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Engagement</th>
              <th className="py-6 px-10 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading && customers.length === 0 && (
              <tr><td colSpan="3"><CustomerSkeleton /></td></tr>
            )}

            {isError && customers.length === 0 && (
              <ErrorState message={error} onRetry={onRetry} colSpan={3} />
            )}

            {!isLoading && !isError && customers.length === 0 && (
              <tr><td colSpan="3" className="p-20 text-center font-bold text-gray-500 tracking-widest uppercase text-xs">No customers found.</td></tr>
            )}

            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="py-6 px-10">
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg border-2 ${customer.is_blocked ? 'bg-red-50 text-red-400 border-red-50' : 'bg-[#f9a602]/10 text-[#f9a602] border-[#f9a602]/5'}`}>
                      {customer.first_name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A202C]">{customer.first_name} {customer.last_name}</h3>
                      <div className="flex flex-col gap-1 mt-1">
                        <p className="text-xs text-gray-500 flex items-center gap-1.5"><Mail size={12} /> {customer.email || 'No email'}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1.5"><Phone size={12} /> {customer.phone_number}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-8 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">
                      <ShoppingBag size={12} className="text-[#f9a602]" />
                      <span className="text-sm font-bold text-[#1A202C]">{customer.total_orders || 0} Orders</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest flex items-center gap-1">
                      <Calendar size={10} /> Joined {new Date(customer.date_joined).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </td>
                <td className="py-6 px-10 text-right">
                  <button
                    onClick={() => onToggleStatus(customer)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${customer.is_blocked ? 'bg-red-50 text-red-500 hover:bg-red-100 border border-red-100 shadow-md cursor-pointer' : 'cursor-pointer bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 shadow-md'}`}
                  >
                    {customer.is_blocked ? 'Blocked' : 'Active'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE LIST */}
      <div className="md:hidden divide-y divide-gray-50">
        {isLoading && customers.length === 0 ? (
          <div className="p-5"><CustomerSkeleton /></div>
        ) : isError && customers.length === 0 ? (
          <div className="p-5 text-center py-10">
            <p className="text-xs font-bold text-red-500 mb-4">{error}</p>
            <button onClick={onRetry} className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-6 py-2 rounded-xl">Retry</button>
          </div>
        ) : customers.map((customer) => (
          <div key={customer.id} className="p-5 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${customer.is_blocked ? 'bg-red-50 text-red-400' : 'bg-[#f9a602]/10 text-[#f9a602]'}`}>
                {customer.first_name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-bold text-sm text-[#1A202C] truncate">{customer.first_name} {customer.last_name}</h3>
                <div className="flex flex-col gap-0.5 mt-1">
                  <p className="text-[11px] text-gray-500 truncate flex items-center gap-1"><Mail size={10} /> {customer.email || 'N/A'}</p>
                  <p className="text-[11px] text-gray-500 truncate flex items-center gap-1"><Phone size={10} /> {customer.phone_number}</p>
                </div>
              </div>
              <button
                onClick={() => onToggleStatus(customer)}
                className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase shrink-0 ${customer.is_blocked ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-600'}`}
              >
                {customer.is_blocked ? 'Blocked' : 'Active'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="p-8 flex flex-col items-center gap-4">
        {hasMore && !isError && (
          <button onClick={loadMore} disabled={isMoreLoading} className="flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-full text-[11px] font-extrabold uppercase tracking-widest shadow-xl active:scale-95 disabled:opacity-70">
            {isMoreLoading ? <><Loader2 size={16} className="animate-spin text-white" /> LOADING...</> : <>SEE MORE <ChevronDown size={16} /></>}
          </button>
        )}

        {!hasMore && customers.length > 12 && !isLoading && !isError && (
          <button onClick={onShowLess} className="flex items-center gap-2 px-8 py-3.5 bg-white border border-gray-200 text-gray-500 rounded-full text-[11px] font-extrabold uppercase tracking-widest shadow-md active:scale-95">
            SHOW LESS <ChevronUp size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomerTable;