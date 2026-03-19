import ShopStatus from "./ShopStatus";
import NotificationBadge from "./NotificationBadge";

const AdminHeader = ({ user , shopData}) => {

  const isAdmin = user?.role === "admin";


  return (
    <header className="h-24 bg-[#1A1A1A] border-b border-white/5 sticky top-0 z-40 px-6 md:px-10 flex items-center justify-end shadow-2xl">
      
      <div className="flex items-center gap-6">
        
    {isAdmin && (
          <ShopStatus 
            isOpen={shopData?.settings?.isOpen} 
            isManuallyOpen={shopData?.settings?.isManuallyOpen}
            onToggle={shopData?.toggleShopStatus} 
            isUpdating={shopData?.isLoading}
            openingTime={shopData?.settings?.openingTime}
            closingTime={shopData?.settings?.closingTime}
          />
        )}
          <NotificationBadge />

        {/* --- PROFILE SECTION --- */}
        <div className="flex items-center gap-5 pl-8 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-black text-white leading-tight uppercase tracking-widest ">
              {user?.role === "admin" ? "Admin" : "Staff"} <span className="text-primary not-italic">Mode</span>
            </p>
            
            <div className="flex justify-end mt-1">
                <p className="text-[9px] font-black text-[#1A1A1A] bg-primary px-2 py-0.5 rounded-md uppercase tracking-[0.1em]">
                   {user?.role === "admin" ? "Administrator" : "Employee"}
                </p>
            </div>
          </div>

          <div className="relative group">
            <div className="w-12 h-12 rounded-full bg-primary border-[3px] border-[#1A1A1A] shadow-[0_0_20px_rgba(250,204,21,0.2)] group-hover:rotate-3 transition-all duration-500 overflow-hidden cursor-pointer">
              <img 
                src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user?.name || 'Pepper'}&backgroundColor=f9a602`} 
                alt="profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-[3px] border-[#1A1A1A] rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;