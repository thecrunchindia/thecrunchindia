import { motion } from "framer-motion";
import Logo from "../../assets/Logo-web.png"; 

const SiteLaunchLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Subtle Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative flex flex-col items-center">
        
        {/* Logo Section */}
        <div className="relative mb-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <img 
              src={Logo} 
              alt="Logo" 
              className="h-24 md:h-32 w-auto object-contain z-10" 
            />

            {/* Premium Glint Effect */}
            <motion.div 
              className="absolute inset-0 z-20"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.7) 50%, transparent 60%)",
                backgroundSize: "250% 100%",
                mixBlendMode: "overlay"
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 mx-auto -mt-8 bg-gray-100 rounded-full overflow-hidden relative mb-8">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>

        {/* New Premium Loading Text Section */}
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="block text-[12px] sm:text-[14px] font-black uppercase text-black mb-2"
          >
            THE CRUNCH
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center justify-center gap-1"
          >
            <span className="text-[9px] sm:text-[12px] font-medium text-gray-500 uppercase tracking-[0.2em]">
             Authentic Flavors, Crafted with Love
            </span>
            
            {/* Animated Dots */}
            <div className="flex mt-1">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1, 
                    delay: dot * 0.2 
                  }}
                  className="w-1 h-1 bg-primary rounded-full mx-0.5"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SiteLaunchLoader;