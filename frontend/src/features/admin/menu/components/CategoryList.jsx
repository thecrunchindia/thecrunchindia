import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import placeholder from "../../../../assets/placeholder.jpg";
import { Edit2, Trash2, AlertTriangle, X } from "lucide-react";

const CategoryList = ({ categories, onEdit, onDelete, fetching, error }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [skeletonCount, setSkeletonCount] = useState(10);
  
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  useEffect(() => {
    const updateCount = () => setSkeletonCount(window.innerWidth < 640 ? 4 : 10);
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const sheetVariants = {
    initial: isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: isMobile ? { y: "100%", transition: { duration: 0.3 } } : { opacity: 0, scale: 0.95 },
  };

  if (fetching) {
    return (
      <div className="w-full overflow-hidden mt-4 px-2">
        <div className="flex gap-6 overflow-hidden">
          {[...Array(skeletonCount)].map((_, n) => (
            <div key={n} className="flex flex-col items-center gap-3 animate-pulse">
              <div className="w-20 h-20 rounded-full bg-slate-200 border-4 border-white shadow-sm" />
              <div className="h-2.5 w-12 bg-slate-200 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-4">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Category List */}
      {/* Category List */}
<div className="flex gap-6 overflow-x-auto no-scrollbar px-2 py-2 select-none">
  {categories.map((cat) => (
    <div 
      key={cat.id} 
      onClick={() => setSelectedCategory(cat)}
      className="group flex flex-col items-center gap-3 cursor-pointer min-w-fit"
    >
      <div className="relative w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-white transition-all duration-300 sm:group-hover:scale-110 active:scale-90">
        <img src={cat.image || placeholder} loading="lazy" alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 sm:group-hover:blur-[2px]" />
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Click</span>
        </div>
      </div>
      
      {/* MODIFIED: Added line-clamp-2 and max-w to handle 2 lines and spacing */}
      <span className="text-[11px] font-black uppercase tracking-tight text-slate-800 text-center max-w-[85px] leading-tight line-clamp-3 break-words">
        {cat.name}
      </span>
    </div>
  ))}
</div>

      {/* --- Action Sheet --- */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center overflow-hidden">
            {/* Backdrop: clicking this closes the modal */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Content Sheet */}
            <motion.div 
              variants={sheetVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              drag={isMobile ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }} 
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setSelectedCategory(null);
                }
              }}
              className="relative bg-white w-full sm:max-w-sm rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden touch-none sm:touch-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-6 px-6 flex flex-col items-center">
                <div className="h-1.5 w-12 bg-slate-200 rounded-full mb-4 sm:hidden" />
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="absolute right-6 top-6 p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-8 pt-2">
                <div className="mb-8">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Manage Category</h4>
                  <p className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">{selectedCategory.name}</p>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => { onEdit(selectedCategory); setSelectedCategory(null); }}
                    className="cursor-pointer flex items-center gap-4 w-full p-4 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-2xl transition-all"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-white shadow-sm rounded-xl text-slate-900"><Edit2 size={16} /></div>
                    <span className="font-black uppercase text-[10px] tracking-widest text-slate-700">Edit Details</span>
                  </button>

                  <button 
                    onClick={() => { setConfirmDelete(selectedCategory); setSelectedCategory(null); }}
                    className="cursor-pointer flex items-center gap-4 w-full p-4 bg-red-50 hover:bg-red-100 border border-red-50 rounded-2xl transition-all"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-white shadow-sm rounded-xl text-red-600"><Trash2 size={16} /></div>
                    <span className="font-black uppercase text-[10px] tracking-widest text-red-600">Delete Category</span>
                  </button>
                </div>

                <p className="w-full text-center mt-8 text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em] sm:hidden">
                  Swipe down to close
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal (Optional: can keep your existing code) */}
      <AnimatePresence>
        {confirmDelete && (
          <div className="fixed inset-0 z-[2100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setConfirmDelete(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-[360px] rounded-[2.5rem] shadow-2xl p-8 text-center">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><AlertTriangle size={30} /></div>
                <h3 className="text-lg font-black text-slate-900 mb-2 uppercase">Are you sure?</h3>
                <p className="text-slate-500 text-sm font-medium mb-8">Deleting <span className="text-red-600 font-bold">"{confirmDelete.name}"</span> cannot be undone.</p>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setConfirmDelete(null)} className="py-4 bg-slate-100 text-slate-600 rounded-xl font-black uppercase text-[9px]">Cancel</button>
                  <button onClick={() => { onDelete(confirmDelete.id); setConfirmDelete(null); }} className="py-4 bg-red-600 text-white rounded-xl font-black uppercase text-[9px] shadow-lg shadow-red-200">Delete</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryList;