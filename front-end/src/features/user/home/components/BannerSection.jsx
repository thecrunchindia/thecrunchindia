import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RiFlashlightFill } from "react-icons/ri"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BannerSection = ({ data: banners = [], onBannerClick }) => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    infinite: banners.length > 1,
    slidesToShow: 1,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
    centerMode: !isMobile && banners.length > 1, 
    centerPadding: isMobile ? "0px" : "250px",
    beforeChange: (current, next) => setActiveIndex(next),
  };

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden py-6 group">
      {banners.length > 1 && (
        <>
          <button onClick={() => sliderRef.current?.slickPrev()} className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 z-40 bg-black/30 backdrop-blur-md rounded-full p-2 hover:bg-primary transition-all active:scale-90">
            <FiChevronLeft size={24} className="text-white" />
          </button>
          <button onClick={() => sliderRef.current?.slickNext()} className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 z-40 bg-black/30 backdrop-blur-md rounded-full p-2 hover:bg-primary transition-all active:scale-90">
            <FiChevronRight size={24} className="text-white" />
          </button>
        </>
      )}

      <Slider ref={sliderRef} {...settings}>
        {banners.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div key={item.id || index} className="px-2 outline-none">
              <motion.div
                animate={{ scale: !isMobile ? (isActive ? 1 : 0.82) : 1 }}
                className="relative w-full h-[180px] md:h-[300px] lg:h-[350px] overflow-hidden rounded-3xl shadow-lg border border-white/10 cursor-pointer"
                onClick={() => onBannerClick?.(item)} 
              >
                <img 
                 src={item.banner_image || item.image} 
                  alt={item.name} 
                  loading="eager" 
                  decoding="sync"
                  fetchPriority="high"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-10">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h2 className="text-white text-lg md:text-3xl font-black uppercase tracking-tighter leading-tight">{item.name}</h2>
                        <p className="text-gray-300 text-[10px] md:text-sm font-bold uppercase mt-1 mb-4 line-clamp-1 max-w-xl">{item.description}</p>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); 
                            onBannerClick?.(item);
                          }}
                          className="flex items-center gap-2 bg-primary text-black px-5 py-2.5 md:px-7 md:py-3 rounded-xl text-[10px] md:text-xs font-black uppercase shadow-xl hover:bg-white transition-all"
                        >
                          <RiFlashlightFill size={18} /> Order Now
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default BannerSection;