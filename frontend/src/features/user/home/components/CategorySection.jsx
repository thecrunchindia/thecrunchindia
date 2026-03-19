import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";



const CategorySection = ({ data: categories = [] }) => {
  const navigate = useNavigate()
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 400;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleScrollState = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 20);
    }
  };

  const handleCategoryClick = (id) => {
    navigate(`/menu?category=${id}`);
  };

  if (categories.length === 0) return null;

  return (
    <section className="py-4 md:py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        <div className="mb-8">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 leading-tight uppercase">
            What are you <span className="text-primary underline decoration-black/10">Craving?</span>
          </h2>
          <p className="text-gray-500 font-bold text-xs sm:text-sm uppercase tracking-widest mt-1">
            Handcrafted flavors delivered fast
          </p>
        </div>

        <div className="relative">
          {/* Arrows */}
          <div className={`hidden md:flex absolute left-[-10px] top-0 z-20 h-full w-24 items-center justify-start bg-gradient-to-r from-white via-white/40 to-transparent pointer-events-none transition-opacity ${showLeftArrow ? "opacity-100" : "opacity-0"}`}>
            <button onClick={() => scroll("left")} className="cursor-pointer pointer-events-auto p-3 rounded-full bg-white border border-gray-100 shadow-xl hover:bg-primary"><ChevronLeft size={24} /></button>
          </div>
          <div className="hidden md:flex absolute right-[-10px] top-0 z-20 h-full w-24 items-center justify-end bg-gradient-to-l from-white via-white/40 to-transparent pointer-events-none">
            <button onClick={() => scroll("right")} className="cursor-pointer pointer-events-auto p-3 rounded-full bg-white border border-gray-100 shadow-xl hover:bg-primary"><ChevronRight size={24} /></button>
          </div>

          <div 
            ref={scrollRef} 
            onScroll={handleScrollState} 
            className="flex gap-5 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-2 no-scrollbar"
          >
            <style dangerouslySetInnerHTML={{__html: `.no-scrollbar::-webkit-scrollbar { display: none; }`}} />

            {
              categories.map((cat) => (
                <motion.div 
                key={cat.id} 
                onClick={() => handleCategoryClick(cat.id)} 
                whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }} className="flex flex-col items-center shrink-0 cursor-pointer group snap-start py-2">
                  <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden shadow-md border-4 border-white group-hover:border-primary transition-all duration-300">
                    <img src={cat.image} alt={cat.name} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="mt-4 flex flex-col items-center">
                    <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-wider text-gray-700 group-hover:text-black text-center leading-[1.1] w-[70px] md:w-[90px] min-h-[2.2em] flex items-center justify-center">
                      {cat.name}
                    </span>
                  </div>
                  <motion.div className="h-1 w-0 bg-primary mt-1 rounded-full group-hover:w-1/2 transition-all duration-300" />
                </motion.div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;