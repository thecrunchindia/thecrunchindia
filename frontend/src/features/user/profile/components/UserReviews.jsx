import React, { useState } from "react";
import { Star, MessageSquare, Send } from "lucide-react";
import { useReviews } from "../hooks/useReviews"; 
import { toast } from "sonner";

const RATING_LEVELS = {
  1: { label: "Bad", color: "#FF4D4F", bg: "bg-red-50" },
  2: { label: "Below Average", color: "#ff7944", bg: "bg-orange-50" },
  3: { label: "Average", color: "#faa614", bg: "bg-yellow-100" },
  4: { label: "Good", color: "#52c510", bg: "bg-green-100" },
  5: { label: "Excellent", color: "#47c607", bg: "bg-emerald-100" },
};

const GOLD_COLOR = "#ffbb00"; 

const UserReviews = ({setActiveTab}) => {
  const { createReview, isSubmitting } = useReviews();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please add a comment");
      return;
    }

    createReview({ rating, comment }, {
      onSuccess: () => {
        setComment("");
        if (setActiveTab) {
          setActiveTab('profile');
        }
      }
    });
  };

  return (
    <div className="bg-gray-50 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-10 border border-gray-100 shadow-inner transition-all">
      <h3 className="text-base md:text-xl font-black uppercase tracking-tighter mb-5 md:mb-6 flex items-center gap-2 text-[#1A1A1A]">
        <MessageSquare className="text-primary" size={18} md:size={20} />
        Share your experience
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div className="space-y-4">
          {/* Star Selection - Size optimized for mobile */}
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
                  stroke={rating >= num ? GOLD_COLOR : "#a7a7a7"} 
                  // Mobile size: 24, Tablet/Desktop: 32
                  className="w-6 h-6 md:w-8 md:h-8 cursor-pointer"
                />
              </button>
            ))}
          </div>

          {/* Color Indicator */}
          <div 
            className={`inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 border rounded-full transition-all duration-300 ${RATING_LEVELS[rating].bg}`}
            style={{ borderColor: `${RATING_LEVELS[rating].color}30` }}
          >
            <div 
              className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mr-2 animate-pulse" 
              style={{ backgroundColor: RATING_LEVELS[rating].color }} 
            />
            <span 
              className="text-[9px] md:text-[10px] font-black uppercase tracking-wider" 
              style={{ color: RATING_LEVELS[rating].color }}
            >
              {RATING_LEVELS[rating].label}
            </span>
          </div>
        </div>

        {/* Textarea - Adjusting height for mobile */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about the food and service..."
          className="w-full bg-white border-none rounded-xl md:rounded-2xl p-4 md:p-5 text-xs md:text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-primary min-h-[120px] md:min-h-[140px] shadow-sm placeholder:text-gray-400"
        />

        <button 
          disabled={isSubmitting} 
          className="w-full md:w-auto cursor-pointer bg-[#1A1A1A] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-xl font-black uppercase text-[10px] md:text-[11px] tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50 active:scale-95 shadow-lg"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <Send size={14} /> 
              Submit Review
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UserReviews;