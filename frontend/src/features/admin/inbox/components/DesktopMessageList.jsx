import React from 'react';
import { Reply, UserCheck, Loader2, CheckCircle, Send, ChevronDown, ChevronsUp } from 'lucide-react';
import { NoResults } from './MessageStates';

export const DesktopMessageList = ({
  messages, expandedId, toggleMessage, setShowReplyBox, showReplyBox, formatDate,
  handleSendReply, replyText, setReplyText, isSending, isSent, hasMore,
  loadingMore, page, handleSeeMore, handleShowLess, textareaRef, searchTerm
}) => (
  <div className="divide-y divide-gray-50">
    {messages.length === 0 ? <NoResults searchTerm={searchTerm} /> : (
      <>
        {messages.map((msg) => (
          <div key={msg.id} className={`group transition-all duration-300 ${msg.reply_message ? 'bg-white ' : 'bg-gray-100/80 '}`}>
            <div onClick={() => { toggleMessage(msg.id); setShowReplyBox(false); }} 
                 className={`grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer relative ${expandedId === msg.id ? 'bg-[#f9a602]/10' : ''}`}>
              {expandedId === msg.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#f9a602]"></div>}
              <div className="col-span-3 flex items-center gap-4 pl-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-[#0A0A0A] text-white relative">
                  {msg.full_name?.charAt(0) || "U"}
                  {!msg.reply_message && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm truncate font-medium text-gray-700">{msg.full_name}</h4>
                  <p className="text-xs text-gray-500 truncate">{msg.email}</p>
                </div>
              </div>
              <div className="col-span-6 pr-4">
                <span className="text-sm truncate font-medium text-gray-600">{msg.subject}</span>
                <p className="text-xs text-gray-500 truncate mt-0.5">{msg.message}</p>
              </div>
              <div className="col-span-3 text-right pr-4">
                <span className="text-xs font-medium text-gray-500">{formatDate(msg.created_at)}</span>
              </div>
            </div>

            <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedId === msg.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <div className="bg-gray-50/50 border-t px-20 py-8">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-black text-[#0A0A0A]">{msg.subject}</h2>
                    {!showReplyBox && !msg.reply_message && (
                      <button onClick={() => setShowReplyBox(true)} className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-xl text-xs font-bold shadow-lg hover:bg-[#f9a602] hover:text-black">
                        <Reply size={14}/> Reply Now
                      </button>
                    )}
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-sm text-gray-700 mb-6 whitespace-pre-wrap">{msg.message}</div>
                  {msg.reply_message && (
                    <div className="mb-6 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-emerald-700 font-black text-[10px] uppercase"><UserCheck size={16}/> Your Official Reply</div>
                        <span className="text-[10px] text-emerald-600/70 font-bold">{formatDate(msg.replied_at)}</span>
                      </div>
                      <p className="text-sm text-emerald-900 italic font-medium">"{msg.reply_message}"</p>
                    </div>
                  )}
                  {showReplyBox && !msg.reply_message && (
                    <div className="space-y-4">
                      <div className="relative">
                        <textarea ref={textareaRef} value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Send a reply..."
                          className="w-full p-6 bg-white border-2 border-[#f9a602] rounded-3xl outline-none min-h-[180px] text-sm" />
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          <button onClick={() => setShowReplyBox(false)} className="px-5 py-2.5 text-xs font-bold text-gray-500">Cancel</button>
                          <button onClick={() => handleSendReply(msg.id)} disabled={isSending || isSent} className={`px-8 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 ${isSent ? 'bg-green-500 text-white' : 'bg-black text-[#f9a602]'}`}>
                            {isSending ? <Loader2 className="animate-spin" size={16}/> : isSent ? <CheckCircle size={16}/> : <Send size={16}/>}
                            {isSent ? "SENT" : "SEND EMAIL"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center items-center gap-4 py-8 border-t bg-gray-50/30">
          {hasMore && (
            <button onClick={handleSeeMore} disabled={loadingMore} className="flex items-center gap-2 px-8 py-3 bg-[#0A0A0A] text-white text-[10px] font-black rounded-2xl uppercase">
              {loadingMore ? <Loader2 size={14} className="animate-spin" /> : <>See More <ChevronDown size={14} /></>}
            </button>
          )}
          {page > 1 && (
            <button onClick={handleShowLess} className="cursor-pointer flex items-center gap-2 px-8 py-3 bg-white text-[#0A0A0A] border-2 border-[#f9a602] text-[10px] font-black rounded-2xl uppercase">
              <ChevronsUp size={14} /> Show Less
            </button>
          )}
        </div>
      </>
    )}
  </div>
);