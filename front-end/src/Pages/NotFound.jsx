import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="max-w-xl w-full text-center z-10">
        <div className="flex items-center justify-center mb-4 select-none">
          <h1 className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter flex items-center">
            <span className="text-[#1A1A1A]">4</span>
            <span className="text-primary mx-[-0.2em]">0</span>
            <span className="text-[#1A1A1A]">4</span>
          </h1>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] uppercase tracking-tighter">
            Page Not Found
          </h2>
          <p className="text-gray-500 text-lg max-w-sm mx-auto font-medium leading-relaxed">
            The page you're looking for doesn't exist or has been moved to a new neighborhood.
          </p>
        </div>
        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 bg-[#1A1A1A] text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.15em] text-xs hover:bg-primary hover:text-[#1A1A1A] transition-all duration-300 shadow-xl shadow-black/5 active:scale-95"
          >
            <Home size={18} strokeWidth={2.5} />
            Back to Home
          </Link>
        </div>
        <div className="mt-24 flex items-center justify-center gap-4 opacity-10">
            <div className="h-[1px] w-12 bg-black"></div>
            <p className="font-black text-[10px] uppercase tracking-[0.4em] text-black">
                Error Code: 404
            </p>
            <div className="h-[1px] w-12 bg-black"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;