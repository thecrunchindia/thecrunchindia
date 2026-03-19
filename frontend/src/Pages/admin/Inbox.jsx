import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { 
  useInbox, 
  MobileSkeleton, 
  DesktopSkeleton, 
  ErrorState, 
  MobileOverlay, 
  MobileMessageList, 
  DesktopMessageList 
} from '../../features/admin/inbox';

const Inbox = () => {
  const { 
    messages, searchQuery, setSearchQuery, hasMore, loadingMore, page, totalItems, 
    handleSeeMore, handleShowLess, expandedId, isLoading, error, toggleMessage, sendReply 
  } = useInbox();

  const [mobileViewMsg, setMobileViewMsg] = useState(null);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const textareaRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(localSearch), 500);
    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery]);

  useEffect(() => {
    if (showReplyBox && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus({ preventScroll: true }), 100);
    }
  }, [showReplyBox, expandedId]);

  const handleSendReply = async (msgId) => {
    if (!replyText.trim()) return;
    setIsSending(true);
    const isSuccess = await sendReply(msgId, replyText);
    setIsSending(false);
    if (isSuccess) {
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false); setShowReplyBox(false); setReplyText("");
        if(mobileViewMsg) setMobileViewMsg(prev => ({ ...prev, reply_message: replyText, replied_at: new Date().toISOString() }));
      }, 1500);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute:'2-digit' });
  };

  const sharedProps = {
    messages, formatDate, hasMore, loadingMore, page, handleSeeMore, handleShowLess, searchTerm: localSearch
  };

  return (
    <div className="w-full px-4 pt-4 sm:px-2 pt-0 sm:pt-8  min-h-screen font-sans text-[#0A0A0A]">
      <MobileOverlay msg={mobileViewMsg} onClose={() => { setMobileViewMsg(null); setShowReplyBox(false); }}
        showReplyBox={showReplyBox} setShowReplyBox={setShowReplyBox} replyText={replyText} setReplyText={setReplyText}
        handleSendReply={handleSendReply} isSending={isSending} isSent={isSent} formatDate={formatDate} textareaRef={textareaRef} />

      {/* MOBILE VIEW */}
      {!mobileViewMsg && (
        <div className="md:hidden ">
          <div className="mb-5">
            <h1 className="text-2xl font-black text-[#0A0A0A]">INB<span className='text-[#f9a602]'>OX.</span></h1>
            <p className="text-xs text-gray-500">Showing <span className="font-bold text-[#f9a602]">{totalItems}</span> messages</p>
          </div>
          <div className="relative mb-5">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={16}/><input type="text" placeholder="Search by name or email..." value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)} className="w-full pl-10 py-2 bg-white border border-primary/60 rounded-xl text-sm font-medium outline-none shadow-xl" />
          </div>
          {isLoading && page === 1 ? <MobileSkeleton /> : error ? <ErrorState message={error} /> : 
            <MobileMessageList {...sharedProps} setMobileViewMsg={setMobileViewMsg} />
          }
        </div>
      )}

      {/* DESKTOP VIEW */}
      <div className="hidden md:block max-w-7xl mx-auto">
         <div className="flex justify-between items-center mb-8">
            <div>
               <h1 className="text-4xl font-black text-[#0A0A0A]">INB<span className='text-[#f9a602]'>OX.</span></h1>
               <p className="text-sm text-gray-500 mt-1">Showing <span className="font-bold text-[#f9a602]">{totalItems}</span> messages</p>
            </div>
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#f9a602]" size={18}/>
               <input type="text" placeholder="Search by name or email..." value={localSearch} onChange={(e) => setLocalSearch(e.target.value)}
                 className="pl-12 pr-4 py-3  w-80  bg-white border border-primary/60 rounded-xl text-sm font-medium outline-none focus:border-[#f9a602] focus:ring-1 focus:ring-[#f9a602] transition-all shadow-xl placeholder:text-gray-500" />
            </div>
         </div>

         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/80 border-b text-xs font-bold text-gray-500 uppercase">
               <div className="col-span-3 pl-2">Sender</div><div className="col-span-6">Subject & Preview</div><div className="col-span-3 text-right pr-4">Date</div>
            </div>
            {isLoading && page === 1 ? <DesktopSkeleton /> : error ? <ErrorState message={error} /> : (
              <DesktopMessageList {...sharedProps} expandedId={expandedId} toggleMessage={toggleMessage} 
                setShowReplyBox={setShowReplyBox} showReplyBox={showReplyBox} handleSendReply={handleSendReply} 
                replyText={replyText} setReplyText={setReplyText} isSending={isSending} isSent={isSent} textareaRef={textareaRef} />
            )}
         </div>
      </div>
    </div>
  );
};

export default Inbox;