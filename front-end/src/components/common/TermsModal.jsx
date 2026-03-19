import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const TermsModal = ({ isOpen, onClose }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.history.pushState({ termsModalOpen: true }, "");
    } else {
      document.body.style.overflow = "unset";
    }

    const handlePopState = () => {
      if (isOpen) onClose();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    if (window.history.state?.termsModalOpen) {
      window.history.back();
    }
    onClose();
  };

  const modalVariants = {
    initial: isMobile ? { y: "100%" } : { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: "tween", ease: "easeOut", duration: 0.25 } },
    exit: { y: isMobile ? "100%" : 20, opacity: 0, transition: { type: "tween", ease: "easeIn", duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-end md:items-center justify-center p-0 md:p-6 overflow-hidden outline-none">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={handleClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            variants={modalVariants} initial="initial" animate="animate" exit="exit"
            drag={isMobile ? "y" : false} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={0.1}
            onDragEnd={(e, { offset, velocity }) => { if (offset.y > 100 || velocity.y > 400) handleClose(); }}
            className="relative bg-white w-full md:max-w-3xl rounded-t-[2.5rem] md:rounded-[2rem] shadow-2xl flex flex-col h-[85vh] md:h-[80vh] overflow-hidden will-change-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:hidden absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 rounded-full z-50" />
            <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100 shrink-0 bg-white">
              <h2 className="text-lg md:text-2xl font-black uppercase tracking-tighter text-slate-900 mt-2 md:mt-0">Terms & Conditions</h2>
              <button onClick={handleClose} className="p-2 bg-slate-100 hover:bg-gray-200 transition-colors rounded-full text-slate-900 mt-2 md:mt-0"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-8 text-gray-600 space-y-6 md:space-y-8">
              <section>
                <h3 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-widest mb-3">1. Acceptance of Terms</h3>
                <p className="text-xs md:text-sm leading-relaxed font-medium text-justify">By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
              </section>
              <section>
                <h3 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-widest mb-3">2. User Account</h3>
                <p className="text-xs md:text-sm leading-relaxed font-medium text-justify">To use certain features of the app, you must register for an account. You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
              </section>
              <section>
                <h3 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-widest mb-3">3. Orders and Payments</h3>
                <p className="text-xs md:text-sm leading-relaxed font-medium text-justify">All orders are subject to availability and confirmation of the order price. Dispatch times may vary according to availability. Payments must be made through the approved payment gateways available on the platform.</p>
              </section>
              <div className="h-6"></div>
            </div>

            <div className="md:hidden p-6 border-t border-gray-100 bg-white shrink-0">
               <button onClick={handleClose} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-transform">I Understand</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;