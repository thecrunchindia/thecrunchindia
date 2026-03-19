import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, ShoppingBag, Utensils, 
  Star, Users, DollarSign, LogOut, Mail, 
  ChevronLeft, ChevronRight, X ,BookIcon,Settings
} from "lucide-react";
import logoWeb from "../../assets/Logo-web.png";
import logoCrunch from "../../assets/Logocrunch.png";
import { useAdminLogout } from "../../hooks/useAdminLogout";



const AdminSidebar = ({ isExpanded, setIsExpanded, user, isMobile, closeMobileMenu }) => {
  const isAdmin = user?.role === "admin";
  const { handleLogout } = useAdminLogout();
  
  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} />, show: true },
    { name: "Live Orders", path: "/admin/orders", icon: <ShoppingBag size={20} />, show: true },
    { name: "Menu", path: "/admin/menu", icon: <Utensils size={20} />, show: true },
    { name: "Bookings", path: "/admin/bookings", icon: <BookIcon size={20} />, show: true },
    { name: "Inbox", path: "/admin/inbox", icon: <Mail size={20} />, show: true }, 
    { name: "Reviews", path: "/admin/reviews", icon: <Star size={20} />, show: isAdmin},
    { name: "Customers", path: "/admin/customers", icon: <Users size={20} />, show: isAdmin },
    { name: "Revenue", path: "/admin/revenue", icon: <DollarSign size={20} />, show: isAdmin },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} />, show: isAdmin },
  ];

  const isFull = isMobile || isExpanded;

  return (
    <aside className={`h-[100dvh] bg-[#1A1A1A] flex flex-col z-[100] transition-all duration-500 ease-in-out relative
      ${isFull ? "w-60" : "w-24"}`}>
      
      {/* 1. HEADER SECTION */}
      <div className="h-24 flex items-center px-6 border-b border-white/5 flex-shrink-0">
        {isMobile ? (
          <div className="flex items-center justify-between w-full">
            <img src={logoWeb} alt="Logo" className="h-18 w-auto object-contain" />
            <button 
              onClick={closeMobileMenu} 
              className="p-2 text-primary bg-white/5 rounded-xl border border-white/10 active:scale-90 transition-all cursor-pointer"
            >
               <X size={20} />
            </button>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <img 
              src={isExpanded ? logoWeb : logoCrunch} 
              alt="Logo" 
              className={`transition-all duration-500 object-contain ${isExpanded ? "h-20 w-auto" : "h-12 w-12"}`} 
            />
          </div>
        )}
      </div>

      {/* 2. DESKTOP TOGGLE HANDLE */}
      {!isMobile && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-primary text-[#1A1A1A] rounded-full hidden lg:flex items-center justify-center shadow-lg z-[110] border-4 border-[#1A1A1A] hover:scale-110 transition-transform cursor-pointer"
        >
          {isExpanded ? <ChevronLeft size={14} strokeWidth={3} /> : <ChevronRight size={14} strokeWidth={3} />}
        </button>
      )}

      <nav className={`flex-1 px-4 py-2 space-y-1.5 sm:space-y-4 overflow-y-auto no-scrollbar ${!isFull ? "overflow-x-visible" : "overflow-x-hidden"}`}>
        {navLinks.map((link) => link.show && (
          <NavLink 
            key={link.path} 
            to={link.path} 
            onClick={() => isMobile && closeMobileMenu()} 
            className={({ isActive }) => `
              flex items-center transition-all duration-300 relative group rounded-2xl py-3 cursor-pointer
              ${isActive ? "bg-primary text-[#1A1A1A] shadow-xl" : "text-gray-400 hover:text-white hover:bg-white/5"} 
              ${isFull ? "px-6 gap-4" : "justify-center"}
            `}
          >
            <div className="flex-shrink-0 group-hover:scale-110 transition-transform">{link.icon}</div>
            
            {isFull ? (
              <span className="text-[13px] font-bold uppercase tracking-wider whitespace-nowrap">
                {link.name}
              </span>
            ) : (
              <div className="fixed left-[90px] bg-primary text-[#1A1A1A] text-[10px] font-black px-3 py-2 rounded-md 
                invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0
                transition-all duration-200 uppercase whitespace-nowrap z-[999] shadow-2xl pointer-events-none">
                {link.name}
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-primary rotate-45" />
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 bg-[#1A1A1A] flex-shrink-0 mb-safe">
        <button 
          onClick={handleLogout}
          className={`
            flex items-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white 
            rounded-2xl transition-all duration-300 py-4 cursor-pointer relative group
            ${isFull ? "px-6 w-full gap-4" : "justify-center w-full"}
          `}>
          <LogOut size={20} className="flex-shrink-0" />
          {isFull ? (
            <span className="text-[13px] font-bold uppercase tracking-wider">Logout</span>
          ) : (
            <div className="fixed left-[90px] bg-red-500 text-white text-[10px] font-black px-3 py-2 rounded-md 
              invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all 
              uppercase whitespace-nowrap z-[999] shadow-2xl pointer-events-none">
              Logout
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-red-500 rotate-45" />
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;