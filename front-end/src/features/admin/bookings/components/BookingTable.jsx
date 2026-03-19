import React from "react";
import { Phone, Mail, Calendar, Clock, Users, ChevronUp, ChevronDown, AlignLeft, FilterX, Loader2, ChevronsUp } from "lucide-react";
import BookingSkeleton from "./BookingSkeleton";
import ErrorState from "./ErrorState";

const BookingTable = ({
  bookings, expandedRow, toggleRow, clearFilters,
  isFiltered, loading, loadingMore, hasNextPage, onLoadMore, onShowLess, currentPage, error, onRetry
}) => {
  return (
    <div className="space-y-6">
      
      {/* ==========================================
          1. MOBILE VIEW (< 768px) - 3 Columns
      ========================================== */}
      <div className="block md:hidden">
        <div className="bg-white border border-gray-200 rounded-lg w-full overflow-hidden">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-wider text-gray-500 w-[50%]">Guest</th>
                <th className="px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-wider text-gray-500 w-[40%]">Booking</th>
                <th className="px-2 sm:px-3 py-3 w-[10%]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(5)].map((_, i) => <BookingSkeleton key={i} />)
              ) : error ? (
                /* Mobile-ൽ 3 കോളങ്ങൾ ഉള്ളതിനാൽ colSpan 3 നൽകുന്നു */
                <ErrorState message={error} onRetry={onRetry} colSpan={3} />
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                  <MobileBookingRow
                    key={booking.id}
                    booking={booking}
                    isExpanded={expandedRow === booking.id}
                    onToggle={() => toggleRow(booking.id)}
                  />
                ))
              ) : (
                <EmptyState onClear={clearFilters} isFiltered={isFiltered} colSpan={3} />
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          2. TABLET VIEW (768px - 1023px) - 4 Columns
      ========================================== */}
      <div className="hidden md:block lg:hidden">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-4 text-[11px] font-black uppercase tracking-wider text-gray-500 w-1/4">Guest</th>
                <th className="px-4 py-4 text-[11px] font-black uppercase tracking-wider text-gray-500 w-1/4">Schedule</th>
                <th className="px-4 py-4 text-[11px] font-black uppercase tracking-wider text-gray-500 text-center w-1/4">Party</th>
                <th className="px-4 py-4 text-[11px] font-black uppercase tracking-wider text-gray-500 text-right w-1/4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(5)].map((_, i) => <BookingSkeleton key={i} />)
              ) : error ? (
                /* Tablet-ൽ 4 കോളങ്ങൾ ഉള്ളതിനാൽ colSpan 4 നൽകുന്നു */
                <ErrorState message={error} onRetry={onRetry} colSpan={4} />
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TabletBookingRow
                    key={booking.id}
                    booking={booking}
                    isExpanded={expandedRow === booking.id}
                    onToggle={() => toggleRow(booking.id)}
                  />
                ))
              ) : (
                <EmptyState onClear={clearFilters} isFiltered={isFiltered} colSpan={4} />
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          3. LAPTOP/DESKTOP VIEW (≥ 1024px) - 7 Columns
      ========================================== */}
      <div className="hidden lg:block">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-md overflow-hidden">
          <table className="w-full text-left border-collapse table-fixed lg:table-auto">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-3 lg:px-4 xl:px-8 py-5 text-[10px] xl:text-[11px] font-black uppercase tracking-wider text-gray-500 whitespace-nowrap">Name</th>
                <th className="px-3 lg:px-4 xl:px-8 py-5 text-[10px] xl:text-[11px] font-black uppercase tracking-wider text-gray-500 whitespace-nowrap">Mobile</th>
                <th className="px-3 lg:px-4 xl:px-8 py-5 text-[10px] xl:text-[11px] font-black uppercase tracking-wider text-gray-500 whitespace-nowrap">Email</th>
                <th className="px-3 lg:px-4 xl:px-8 py-5 text-[10px] xl:text-[11px] font-black uppercase tracking-wider text-gray-500 whitespace-nowrap">Date</th>
                <th className="px-3 lg:px-4 xl:px-8 py-5 text-[10px] xl:text-[11px] font-black uppercase tracking-wider text-gray-500 whitespace-nowrap">Time (IST)</th>
                <th className="px-3 lg:px-4 xl:px-8 py-5 text-[10px] xl:text-[11px] font-black uppercase tracking-wider text-gray-500 text-center whitespace-nowrap">Guests</th>
                <th className="px-3 lg:px-4 xl:px-8 py-5 text-[10px] xl:text-[11px] font-black uppercase tracking-wider text-gray-500 text-right whitespace-nowrap">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(5)].map((_, i) => <BookingSkeleton key={i} />)
              ) : error ? (
                /* Desktop-ൽ 7 കോളങ്ങൾ ഉള്ളതിനാൽ colSpan 7 നൽകുന്നു */
                <ErrorState message={error} onRetry={onRetry} colSpan={7} />
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                  <DesktopBookingRow
                    key={booking.id}
                    booking={booking}
                    isExpanded={expandedRow === booking.id}
                    onToggle={() => toggleRow(booking.id)}
                  />
                ))
              ) : (
                <EmptyState onClear={clearFilters} isFiltered={isFiltered} colSpan={7} />
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION ACTIONS */}
      <div className="flex flex-row justify-center items-center gap-4 pb-12 pt-4">
        {hasNextPage && (
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="cursor-pointer flex items-center gap-2 px-8 py-3 bg-[#0A0A0A] text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-[#f9a602] hover:text-[#0A0A0A] transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {loadingMore ? <Loader2 size={16} className="animate-spin" /> : <>See More <ChevronDown size={14} className="ml-1" /></>}
          </button>
        )}

        {currentPage > 1 && !loadingMore && (
          <button
            onClick={onShowLess}
            className="cursor-pointer flex items-center gap-2 px-8 py-3 bg-black text-white border-2 border-[#f9a602] text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-[#f9a602] hover:text-[#0A0A0A] transition-all active:scale-95"
          >
            <ChevronsUp size={14} /> Show Less
          </button>
        )}
      </div>
    </div>
  );
};

// ==========================================
// UTILITY & ROW COMPONENTS
// ==========================================

const formatIST = (timeStr) => {
  if (!timeStr) return "N/A";
  try {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
  } catch (e) { return timeStr; }
};

const MobileBookingRow = ({ booking, isExpanded, onToggle }) => (
  <React.Fragment>
    <tr onClick={onToggle} className={`group hover:bg-[#f9a602]/5 transition-colors cursor-pointer ${isExpanded ? 'bg-[#f9a602]/10' : 'bg-white'}`}>
      <td className="px-2 sm:px-3 py-3 align-top overflow-hidden">
        <div className="font-bold text-xs text-[#0A0A0A] mb-1 truncate">{booking.full_name}</div>
        <div className="text-[10px] font-bold text-gray-600 flex items-center gap-1.5 mb-1"><Phone size={10} className="text-gray-400 shrink-0"/> <span className="truncate">{booking.phone}</span></div>
        <div className="text-[10px] font-medium text-gray-500 flex items-center gap-1.5"><Mail size={10} className="text-gray-400 shrink-0"/> <span className="truncate">{booking.email || "N/A"}</span></div>
      </td>
      <td className="px-2 sm:px-3 py-3 align-top overflow-hidden">
        <div className="text-[10px] font-bold text-[#0A0A0A] flex items-center gap-1.5 mb-1.5 truncate"><Calendar size={10} className="text-[#f9a602] shrink-0"/> <span className="truncate">{booking.date}</span></div>
        <div className="text-[9px] font-black text-gray-500 flex items-center gap-1.5 mb-1.5"><Clock size={10} className="text-gray-400 shrink-0"/> {formatIST(booking.time)}</div>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-100 text-[9px] font-black text-[#0A0A0A]"><Users size={10} className="shrink-0" /> {booking.guests}</span>
      </td>
      <td className="px-1 sm:px-3 py-3 text-right align-middle">
        <div className="p-1 rounded-full bg-gray-100 inline-block text-gray-500">{isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</div>
      </td>
    </tr>
    {isExpanded && (
      <tr className="bg-[#f9a602]/5">
        <td colSpan="3" className="px-2 sm:px-3 py-4 border-t border-[#f9a602]/10">
          <div className="bg-white p-3 border border-[#f9a602]/20">
            <h4 className="text-[9px] font-black uppercase text-[#f9a602] mb-1.5 tracking-widest flex items-center gap-1.5"><AlignLeft size={10} /> Special Requests</h4>
            <p className="text-xs font-medium text-gray-700 italic leading-relaxed whitespace-normal break-words">{booking.notes || "No special instructions provided."}</p>
          </div>
        </td>
      </tr>
    )}
  </React.Fragment>
);

const TabletBookingRow = ({ booking, isExpanded, onToggle }) => (
  <React.Fragment>
    <tr onClick={onToggle} className={`group hover:bg-[#f9a602]/5 transition-colors cursor-pointer ${isExpanded ? 'bg-[#f9a602]/10' : 'bg-white'}`}>
      <td className="px-4 py-4 align-top overflow-hidden">
        <div className="font-bold text-sm text-[#0A0A0A] mb-1.5 truncate">{booking.full_name}</div>
        <div className="text-[11px] font-bold text-gray-600 flex items-center gap-1.5 mb-1.5"><Phone size={12} className="text-gray-400 shrink-0"/> {booking.phone}</div>
        <div className="text-[11px] font-medium text-gray-500 flex items-center gap-1.5 truncate"><Mail size={12} className="text-gray-400 shrink-0"/> {booking.email || "N/A"}</div>
      </td>
      <td className="px-4 py-4 align-top">
        <div className="text-xs font-bold text-[#0A0A0A] flex items-center gap-1.5 mb-1.5"><Calendar size={12} className="text-[#f9a602] shrink-0"/>{booking.date}</div>
        <div className="text-[10px] font-black text-gray-500 flex items-center gap-1.5"><Clock size={12} className="text-gray-400 shrink-0"/>{formatIST(booking.time)}</div>
      </td>
      <td className="px-4 py-4 text-center align-top">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 text-xs font-black text-[#0A0A0A]"><Users size={12} className="shrink-0" /> {booking.guests}</span>
      </td>
      <td className="px-4 py-4 text-right align-top">
        <div className="p-1.5 rounded-full bg-gray-100 inline-block text-gray-500 group-hover:bg-gray-200">{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
      </td>
    </tr>
    {isExpanded && (
      <tr className="bg-[#f9a602]/5">
        <td colSpan="4" className="px-4 py-5">
          <div className="flex items-start gap-3 p-4 bg-white border border-[#f9a602]/20 rounded-xl shadow-sm">
            <AlignLeft size={16} className="text-[#f9a602] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[10px] font-black uppercase text-gray-500 mb-1 tracking-widest">Special Requests</h4>
              <p className="text-xs font-medium text-gray-700 italic whitespace-normal">{booking.notes || "No special instructions provided."}</p>
            </div>
          </div>
        </td>
      </tr>
    )}
  </React.Fragment>
);

const DesktopBookingRow = ({ booking, isExpanded, onToggle }) => (
  <React.Fragment>
    <tr onClick={onToggle} className={`group hover:bg-[#f9a602]/5 transition-colors cursor-pointer ${isExpanded ? 'bg-[#f9a602]/10' : 'bg-white'}`}>
      <td className="px-3 lg:px-4 xl:px-8 py-4 whitespace-nowrap font-bold text-[11px] xl:text-sm text-[#0A0A0A]">{booking.full_name}</td>
      <td className="px-3 lg:px-4 xl:px-8 py-4 whitespace-nowrap"><div className="flex items-center gap-1.5 text-[10px] xl:text-xs font-bold text-gray-700"><Phone size={13} className="text-gray-400" /> {booking.phone}</div></td>
      <td className="px-3 lg:px-4 xl:px-8 py-4 whitespace-nowrap"><div className="flex items-center gap-1.5 text-[10px] xl:text-xs font-medium text-gray-600 max-w-[140px] xl:max-w-none truncate"><Mail size={13} className="text-gray-400 shrink-0" /> <span className="truncate">{booking.email || "N/A"}</span></div></td>
      <td className="px-3 lg:px-4 xl:px-8 py-4 whitespace-nowrap font-bold text-[11px] xl:text-sm text-[#0A0A0A]"><Calendar size={13} className="inline mr-1.5 text-[#f9a602]" /> {booking.date}</td>
      <td className="px-3 lg:px-4 xl:px-8 py-4 whitespace-nowrap text-[10px] xl:text-xs font-black text-gray-500 uppercase"><Clock size={13} className="inline mr-1 text-gray-400" /> {formatIST(booking.time)}</td>
      <td className="px-3 lg:px-4 xl:px-8 py-4 text-center"><div className="whitespace-nowrap inline-flex items-center gap-1.5 px-2 xl:px-3 py-1 rounded-lg bg-gray-100 text-[10px] xl:text-xs font-black text-[#0A0A0A]"><Users size={13} /> {booking.guests}</div></td>
      <td className="px-3 lg:px-4 xl:px-8 py-4 text-right"><div className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors inline-block text-gray-600">{isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</div></td>
    </tr>
    {isExpanded && (
      <tr className="bg-[#f9a602]/5">
        <td colSpan="7" className="px-3 lg:px-4 xl:px-8 py-5">
          <div className="flex items-start gap-4 p-5 bg-white border border-[#f9a602]/20 rounded-xl shadow-sm max-w-4xl">
            <AlignLeft size={20} className="text-[#f9a602] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-[10px] font-black uppercase text-gray-500 mb-1.5 tracking-widest">Special Requests</h4>
              <p className="text-xs xl:text-sm font-medium text-gray-800 italic whitespace-normal">{booking.notes || "No special instructions provided."}</p>
            </div>
          </div>
        </td>
      </tr>
    )}
  </React.Fragment>
);

const EmptyState = ({ onClear, isFiltered, colSpan = 7 }) => (
  <tr>
    <td colSpan={colSpan} className="py-20 text-center">
      <FilterX size={32} className="mx-auto text-gray-400 mb-4" />
      <h3 className="font-bold text-gray-800 text-base">No bookings found</h3>
      <p className="text-sm text-gray-500 mt-1">Try adjusting your search criteria</p>
      {isFiltered && (
        <button onClick={onClear} className="mt-6 px-6 py-2.5 bg-black text-white text-xs font-black rounded-xl uppercase tracking-widest hover:bg-[#f9a602] hover:text-[#0A0A0A] transition-colors">
          Clear Search
        </button>
      )}
    </td>
  </tr>
);

export default BookingTable;