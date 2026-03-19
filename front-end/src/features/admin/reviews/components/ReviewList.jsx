import React, { useState } from 'react';
import useReviews from '../hooks/useReviews';
import ReviewError from './ReviewError';
import ReviewSkelton from './ReviewSkelton';
import { RiStarFill } from "react-icons/ri";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  RefreshCcw, 
  CheckCircle2, 
  XCircle, 
  AlertCircle 
} from "lucide-react";

const ReviewList = () => {
  const { 
    reviews, loading, error, updateStatus, isUpdating, 
    page, setPage, totalPages, hasNextPage, hasPrevPage,
    searchTerm 
  } = useReviews();
  
  const [processingId, setProcessingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const handleStatusUpdate = () => {
    if (!pendingAction) return;
    const { id, currentStatus } = pendingAction;
    setProcessingId(id);
    setShowModal(false);

    updateStatus(
      { reviewId: id, isApproved: !currentStatus },
      { onSettled: () => {
          setProcessingId(null);
          setPendingAction(null);
      }}
    );
  };

  if (loading && !reviews.length) return <ReviewSkelton />;
  if (error) return <ReviewError message={error} />;

  return (
    <div className="p-2 md:p-4 mx-auto w-full max-w-[1400px]">
      
      {/* Review Cards List */}
      <div className="space-y-4 mb-12">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border p-5 md:p-6 rounded-xl bg-white shadow-sm border-gray-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col gap-1 min-w-0">
                  <h3 className="font-black uppercase text-[11px] md:text-base tracking-tight text-slate-900 truncate">
                    {review?.user_name || 'Anonymous User'}
                  </h3>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <RiStarFill 
                        key={i} 
                        size={14} 
                        className={i < (review?.rating || 0) ? "text-amber-400" : "text-slate-100"} 
                      />
                    ))}
                  </div>
                </div>

                <button 
                  disabled={isUpdating && processingId === review.id}
                  onClick={() => {
                    setPendingAction({ id: review.id, currentStatus: review.is_approved });
                    setShowModal(true);
                  }}
                  className={`shrink-0 h-9 md:h-11 px-4 md:px-6 flex items-center justify-center gap-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 disabled:opacity-70 cursor-pointer border-2 ${
                    review.is_approved 
                    ? 'bg-white text-green-600 hover:bg-green-100 shadow-md border-green-200' 
                    : 'bg-white text-red-400 hover:bg-red-100 shadow-md border-red-200'
                  }`}
                >
                  {isUpdating && processingId === review.id ? (
                    <RefreshCcw size={14} className="animate-spin" />
                  ) : (
                    <>
                      {review.is_approved ? (
                        <><CheckCircle2 size={14} /><span>Active</span></>
                      ) : (
                        <><XCircle size={14} /><span>Hidden</span></>
                      )}
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-50">
                <p className="text-slate-600 font-medium italic text-xs md:text-sm leading-relaxed">
                  "{review?.comment}"
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100">
             <p className="font-black uppercase text-[10px] tracking-[0.2em] text-gray-500">
               {searchTerm ? `No results found for "${searchTerm}"` : "No feedback available yet."}
             </p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[400px] rounded-[2rem] p-8 shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
            <div className={`p-4 rounded-full mb-4 ${pendingAction?.currentStatus ? 'bg-rose-50 text-rose-500' : 'bg-green-50 text-green-500'}`}>
              <AlertCircle size={32} />
            </div>
            <h4 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-2">Are you sure?</h4>
            <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
              Do you want to {pendingAction?.currentStatus ? 'hide' : 'activate'} this review? 
            </p>
            <div className="flex gap-3 w-full">
              <button onClick={() => setShowModal(false)} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">Cancel</button>
              <button onClick={handleStatusUpdate} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-white rounded-2xl shadow-lg transition-all active:scale-95 ${pendingAction?.currentStatus ? 'bg-rose-500 shadow-rose-200' : 'bg-green-500 shadow-green-200'}`}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex flex-col items-center justify-center gap-5 py-8 border-t border-slate-50">
        <div className="flex items-center gap-1.5 md:gap-3">
          <button 
            onClick={() => { setPage(1); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
            disabled={page === 1} 
            className="p-2 md:p-3 rounded-xl border border-slate-200 disabled:opacity-30 bg-white hover:border-slate-900 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ChevronsLeft size={18} />
          </button>
          <button 
            onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
            disabled={!hasPrevPage} 
            className="p-2 md:p-3 rounded-xl border border-slate-200 disabled:opacity-30 bg-white hover:border-slate-900 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="min-w-[110px] md:min-w-[140px] flex items-center justify-center bg-slate-900 px-4 py-3 rounded-xl shadow-xl">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] text-white">
                Page {page} of {totalPages}
              </span>
          </div>
          <button 
            onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
            disabled={!hasNextPage} 
            className="p-2 md:p-3 rounded-xl border border-slate-200 disabled:opacity-30 bg-white hover:border-slate-900 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
          <button 
            onClick={() => { setPage(totalPages); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
            disabled={page >= totalPages} 
            className="p-2 md:p-3 rounded-xl border border-slate-200 disabled:opacity-30 bg-white hover:border-slate-900 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;