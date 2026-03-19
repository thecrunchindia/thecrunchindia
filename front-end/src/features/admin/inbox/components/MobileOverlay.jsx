import React from 'react';
import { ArrowLeft, UserCheck, Loader2, CheckCircle, Send, Reply } from 'lucide-react';

export const MobileOverlay = ({ 
  msg, onClose, showReplyBox, setShowReplyBox, replyText, setReplyText, 
  handleSendReply, isSending, isSent, formatDate, textareaRef 
}) => {
  if (!msg) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-right duration-300 ease-out">
      <div className="flex items-center gap-4 p-4 border-b border-gray-100 sticky top-0 bg-white">
        <button onClick={onClose} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-[#0A0A0A]"/>
        </button>
        <h2 className="text-lg font-black truncate">Message Detail</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <h1 className="text-xl font-black mb-6 leading-tight text-[#0A0A0A]">{msg.subject}</h1>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#f9a602] text-black flex items-center justify-center text-lg font-bold shrink-0 shadow-sm">
            {msg.full_name?.charAt(0) || "U"}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-base truncate">{msg.full_name}</h3>
            <p className="text-sm text-gray-500 truncate">{msg.email}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-5 rounded-2xl text-gray-800 text-base leading-relaxed whitespace-pre-wrap border border-gray-100 shadow-sm">
          {msg.message}
        </div>

        {msg.reply_message && (
          <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-emerald-700 font-black text-[10px] uppercase tracking-wider">
                <UserCheck size={14}/> Your Reply
              </div>
              <span className="text-[9px] text-emerald-600/70 font-bold">{formatDate(msg.replied_at)}</span>
            </div>
            <p className="text-sm text-emerald-900 leading-relaxed italic">"{msg.reply_message}"</p>
          </div>
        )}

        {showReplyBox && !msg.reply_message && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <textarea 
              ref={textareaRef}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply here..."
              className="w-full p-4 bg-white border-2 border-[#f9a602] rounded-2xl outline-none min-h-[150px] text-sm font-medium shadow-sm"
            />
            <button 
              onClick={() => handleSendReply(msg.id)} 
              disabled={isSending || isSent}
              className={`w-full py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all ${isSent ? 'bg-green-500 text-white' : 'bg-black text-[#f9a602]'}`}
            >
              {isSending ? <Loader2 className="animate-spin" size={20}/> : isSent ? <><CheckCircle size={20}/> SENT SUCCESSFULLY</> : <><Send size={18}/> SEND REPLY</>}
            </button>
          </div>
        )}
      </div>
      
      {!showReplyBox && !isSent && !msg.reply_message && (
        <div className="p-4 border-t border-gray-100 bg-white flex gap-3">
          <button onClick={() => setShowReplyBox(true)} className="w-full py-3 rounded-xl bg-[#0A0A0A] text-white font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
            <Reply size={18}/> Reply
          </button>
        </div>
      )}
    </div>
  );
};