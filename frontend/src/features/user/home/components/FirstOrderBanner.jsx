import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RiTimerFlashLine } from "react-icons/ri"; // ടൈമർ ഐക്കൺ

const FirstOrderBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-4 md:py-8 lg:py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative h-[160px] sm:h-[200px] md:h-[240px] lg:h-[280px] rounded-[1.2rem] sm:rounded-[1.8rem] md:rounded-[2.5rem] overflow-hidden flex items-center shadow-2xl bg-black">
          
          {/* Background Image - Kept exactly as yours */}
          <div className="absolute inset-0">
            <img 
              src="https://i.pinimg.com/1200x/45/ea/2c/45ea2c14bcca0baa48a77f76d9f9641b.jpg" 
              alt="Food Delivery"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
          </div>

          {/* Content Area */}
          <div className="relative z-10 px-5 sm:px-10 md:px-16 w-full flex justify-between items-center gap-4">
            
            {/* TEXT CONTENT */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-[60%] sm:max-w-[65%] md:max-w-xl"
            >
              <h2 className="text-white text-base sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase leading-[1.1] tracking-tight">
                Super Fast <br /> 
                <span className="text-primary italic">Delivery Service</span>
              </h2>
              
              <p className="text-gray-300 mt-1 md:mt-2 text-[8px] sm:text-[11px] md:text-sm lg:text-base font-medium opacity-90 line-clamp-2 md:line-clamp-none">
                Craving solved! We bring hot and fresh meals to your doorstep in record time.
              </p>

              <button 
                onClick={() => navigate("/menu")} 
                className="cursor-pointer mt-2 sm:mt-4 md:mt-6 bg-primary text-black font-black px-4 py-1.5 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg md:rounded-xl text-[8px] sm:text-[10px] md:text-xs lg:text-sm uppercase shadow-lg active:scale-95 transition-all hover:brightness-110"
              >
                Order Now
              </button>
            </motion.div>

            {/* STICKER / BADGE - Delivery Time Badge */}
            <motion.div 
              initial={{ rotate: 0, scale: 0.5, opacity: 0 }}
              whileInView={{ rotate: -10, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="relative shrink-0"
            >
              {/* Main Sticker Square */}
              <div className="bg-primary border-2 md:border-[3px] border-black p-2 sm:p-4 md:p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center min-w-[75px] sm:min-w-[120px] md:min-w-[160px] relative overflow-hidden">
                
                {/* Timer Icon */}
                <RiTimerFlashLine className="text-black text-xs sm:text-xl md:text-2xl mb-0.5" />
                
                <span className="text-black font-bold text-[8px] sm:text-[11px] md:text-sm uppercase leading-none">Within</span>
                <span className="text-black font-black text-xl sm:text-4xl md:text-5xl lg:text-6xl leading-none my-0.5 md:my-1">30</span>
                <span className="text-black font-black text-[8px] sm:text-[12px] md:text-base lg:text-lg leading-none border-t-[1px] md:border-t-2 border-black pt-0.5 md:pt-1">MINS</span>
              </div>

              {/* Sticker Tail (Kept exactly as yours) */}
              <div className="absolute -bottom-2 left-3 md:-bottom-3 md:left-4 w-0 h-0 border-l-[10px] md:border-l-[15px] border-l-transparent border-t-[10px] md:border-t-[15px] border-t-black border-r-[0px] border-r-transparent" />
              <div className="absolute -bottom-1 left-[14px] md:-bottom-1.5 md:left-[18px] w-0 h-0 border-l-[7px] md:border-l-[10px] border-l-transparent border-t-[7px] md:border-t-[10px] border-t-primary border-r-[0px] border-r-transparent" />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstOrderBanner;