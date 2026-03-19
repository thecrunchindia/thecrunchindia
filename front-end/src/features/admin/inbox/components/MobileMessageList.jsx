import React from 'react';
import { ChevronDown, ChevronsUp, Loader2 } from 'lucide-react';
import { NoResults } from './MessageStates';

export const MobileMessageList = ({ 
  messages, setMobileViewMsg, formatDate, hasMore, 
  loadingMore, page, handleSeeMore, handleShowLess, searchTerm 
}) => (
  <div className="space-y-3 pb-6">
    {messages.length === 0 ? (
      <NoResults searchTerm={searchTerm} />
    ) : (
      <>
        {messages.map((msg) => (
          <div key={msg.id} onClick={() => setMobileViewMsg(msg)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer relative">
            {!msg.reply_message && <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-bl-lg"></div>}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-[#f9a602] text-black">
                {msg.full_name?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate">{msg.full_name}</h4>
                <p className="text-[10px] text-gray-500">{formatDate(msg.created_at)}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 line-clamp-1">{msg.subject}</p>
          </div>
        ))}
        {(hasMore || page > 1) && (
          <div className="flex flex-col gap-3 pt-4">
            {hasMore && (
              <button onClick={handleSeeMore} disabled={loadingMore} className="w-full py-3 bg-[#0A0A0A] text-white text-[10px] font-black rounded-xl uppercase flex items-center justify-center gap-2">
                {loadingMore ? <Loader2 size={14} className="animate-spin" /> : <>See More <ChevronDown size={14} /></>}
              </button>
            )}
            {page > 1 && (
              <button onClick={handleShowLess} className="w-full py-3 bg-white text-[#0A0A0A] border border-gray-200 text-[10px] font-black rounded-xl uppercase flex items-center justify-center gap-2">
                <ChevronsUp size={14} /> Show Less
              </button>
            )}
          </div>
        )}
      </>
    )}
  </div>
);