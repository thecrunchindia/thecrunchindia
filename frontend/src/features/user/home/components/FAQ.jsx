import { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = ({ data = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data || data.length === 0) return null;

  return (
    <section className="py-8 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
          
          {/* Left Side: Title */}
          <div className="lg:w-1/3 lg:sticky lg:top-28 h-fit">
            <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              Common <span className="text-primary italic">Questions</span>
            </h2>
            <p className="text-gray-400 font-bold uppercase text-[8px] md:text-[10px] mt-2 md:mt-4 tracking-widest leading-relaxed">
              Everything you need to know <br className="hidden md:block" /> before you order.
            </p>
          </div>

          {/* Right Side: Accordion */}
          <div className="lg:w-2/3 space-y-2">
            {data.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div 
                  key={faq.id || i} 
                  className={`border transition-all duration-300 rounded-xl overflow-hidden ${
                    isOpen ? "border-primary/50 shadow-sm" : "border-gray-100 shadow-sm"
                  }`}
                >
                  <button 
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className={`w-full flex items-center justify-between p-3.5 md:p-5 text-left transition-colors ${
                      isOpen ? "bg-primary/5" : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {/* Question Text size adjusted */}
                    <span className="font-black uppercase text-[11px] md:text-[14px] tracking-tight text-gray-800 pr-4">
                      {faq.question}
                    </span>
                    <RiArrowDownSLine 
                      className={`transition-transform duration-300 text-primary flex-shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`} 
                      size={isMobile ? 18 : 22} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Answer Text size adjusted */}
                        <div className="px-4 pb-4 md:px-5 md:pb-5 text-gray-500 font-semibold text-[10px] md:text-[13px] leading-snug border-t border-gray-50 pt-2.5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;