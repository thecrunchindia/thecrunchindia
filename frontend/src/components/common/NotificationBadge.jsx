import React, { useState, useRef, useEffect } from "react";
import { Bell, ShoppingBag, Calendar, Mail, ChevronRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../hooks/useNotifications"; 

const NotificationBadge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  const { notifications, markAsRead, isLoading } = useNotifications();

  const getNotificationConfig = (type) => {
    switch (type) {
      case "order":
        return { link: "/admin/orders", icon: <ShoppingBag size={14} />, bgColor: "bg-emerald-500/10", textColor: "text-emerald-500" };
      case "booking":
        return { link: "/admin/bookings", icon: <Calendar size={14} />, bgColor: "bg-blue-500/10", textColor: "text-blue-500" };
      case "inbox":
        return { link: "/admin/inbox", icon: <Mail size={14} />, bgColor: "bg-primary/10", textColor: "text-primary" };
      default:
        return { link: "/admin/dashboard", icon: <Bell size={14} />, bgColor: "bg-gray-500/10", textColor: "text-gray-500" };
    }
  };

  const totalUnread = notifications.reduce((acc, item) => acc + item.count, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (notif) => {
    const config = getNotificationConfig(notif.type);
    markAsRead(notif.type); 
    navigate(config.link);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer relative p-2.5 md:p-3.5 bg-white/5 border border-white/10 text-white hover:border-primary transition-all duration-300 group rounded-xl md:rounded-2xl active:scale-95"
      >
        <Bell className={`w-[18px] h-[18px] md:w-[20px] md:h-[20px] transition-transform text-primary ${isOpen ? 'rotate-12' : 'group-hover:rotate-12'}`} />
        
        {totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 min-w-[16px] md:min-w-[20px] h-4 md:h-5 bg-primary text-[#1A1A1A] text-[8px] md:text-[10px] font-black px-1 flex items-center justify-center rounded-md md:rounded-lg border-2 border-[#1A1A1A] shadow-lg">
            {totalUnread}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-65 md:w-80 bg-[#1A1A1A] border border-primary/50  rounded-[1.5rem] shadow-2xl overflow-hidden z-[110] animate-in fade-in zoom-in duration-200 origin-top-right">
          <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live Updates</h4>
            {isLoading && <Loader2 size={12} className="animate-spin text-primary" />}
          </div>

          <div className="max-h-[350px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notif) => {
                const config = getNotificationConfig(notif.type);
                return (
                  <button
                    key={notif.type}
                    onClick={() => handleAction(notif)}
                    className="cursor-pointer w-full flex items-center justify-between p-4 hover:bg-white/5 border-b border-white/5 transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${config.bgColor} flex items-center justify-center ${config.textColor} group-hover:scale-110 transition-transform`}>
                        {config.icon}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-200 group-hover:text-white transition-colors leading-tight italic">
                          {notif.message}
                        </p>
                        <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest mt-1 block">
                          Click to manage
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-gray-600 group-hover:text-primary transition-colors" />
                  </button>
                );
              })
            ) : (
              <div className="p-10 text-center">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">No new notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBadge;