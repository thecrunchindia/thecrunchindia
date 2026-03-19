import React, { useState, useEffect } from "react";
import { Star, X, Send ,Award } from "lucide-react";
import { useReviews } from "../../features/user/profile/hooks/useReviews";

const RATING_LEVELS = {
  1: { label: "Bad", color: "#FF4D4F", bg: "bg-red-50" },
  2: { label: "Below Average", color: "#ff7944", bg: "bg-orange-50" },
  3: { label: "Average", color: "#faa614", bg: "bg-yellow-100" },
  4: { label: "Good", color: "#52c510", bg: "bg-green-100" },
  5: { label: "Excellent", color: "#47c607", bg: "bg-emerald-100" },
};

const GOLD_COLOR = "#ffbb00"; 

const ReviewModal = ({ isOpen, onClose }) => {
  const { createReview, isSubmitting } = useReviews();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

  return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    createReview({ rating, comment }, {
      onSuccess: () => {
        setComment("");
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 relative shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-500 hover:text-black hover:bg-gray-100 p-2 rounded-full transition-all"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full  md:rounded-full  flex items-center justify-center mx-auto mb-3 md:mb-4 text-primary">
            <Award size={28} className="md:size-8" strokeWidth={2.5} />
          </div>
         <h3 className="text-md md:text-sm font-black uppercase tracking-tighter text-[#1A1A1A]">How was your experience?</h3>
          <p className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 px-4">Your feedback helps us provide a better service for you!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          {/* Star Rating & Label */}
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <div className="flex gap-1.5 md:gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button 
                  key={num} 
                  type="button" 
                  onClick={() => setRating(num)}
                  className="transition-transform active:scale-90"
                >
                  <Star 
                    fill={rating >= num ? GOLD_COLOR : "none"} 
                    stroke={rating >= num ? GOLD_COLOR : "#595959"} 
                    className="w-7 h-7 md:w-9 md:h-9 cursor-pointer"
                  />
                </button>
              ))}
            </div>
            
            {/* Color Indicator Badge */}
            <div 
              className={`inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 border rounded-full transition-all duration-300 ${RATING_LEVELS[rating].bg}`}
              style={{ borderColor: `${RATING_LEVELS[rating].color}30` }}
            >
              <div 
                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mr-2 animate-pulse" 
                style={{ backgroundColor: RATING_LEVELS[rating].color }} 
              />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider" style={{ color: RATING_LEVELS[rating].color }}>
                {RATING_LEVELS[rating].label}
              </span>
            </div>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="What's on your mind? Tell us what you liked or how we can improve..."
            className="w-full bg-gray-50 border-1 border-gray-300 outline-none rounded-xl md:rounded-2xl p-4 md:p-5 text-xs md:text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-primary min-h-[100px] md:min-h-[120px] shadow-inner placeholder:text-[12px] placeholder:text-gray-500"
          />

          <button
            disabled={isSubmitting}
            className="w-full bg-[#1A1A1A] text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-black/10 disabled:opacity-50 active:scale-[0.98]"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><Send size={14} /> Submit Review</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;