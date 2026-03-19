import React, { useState, useEffect } from "react";
import { useOutletContext, Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/common/AdminSidebar";
import AdminHeader from "../components/common/AdminHeader";
import { Menu } from "lucide-react";
import logoCrunch from "../assets/Logocrunch.png";
import api from "../api/axios";
import ShopStatus from "../components/common/ShopStatus";
import NotificationBadge from "../components/common/NotificationBadge";
import { useSettings } from "../features/admin/settings/hooks/useSettings";

const AdminLayout = () => {
  const { user } = useOutletContext();

  const settingsProps = useSettings();
  const { settings, toggleShopStatus, isLoading } = settingsProps;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) { window.location.href = '/admin/login'; return; }
      try { await api.get('/auth/verify-session/'); } catch (error) { }
    };
    verifySession();
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F8F8] text-[#1A1A1A] font-sans antialiased">
      <div className={`fixed inset-y-0 left-0 z-[100] transition-transform duration-500 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isExpanded ? "lg:w-60" : "lg:w-24"}`}>
        <AdminSidebar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          user={user}
          isMobile={isMobileMenuOpen}
          closeMobileMenu={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div className={`flex-1 flex flex-col min-w-0 h-screen transition-all duration-500 ${isExpanded ? "lg:ml-60" : "lg:ml-24"}`}>
        <header className="lg:hidden h-20 bg-[#1A1A1A] px-6 flex items-center justify-between sticky top-0 z-40 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative overflow-hidden">
              <img src={logoCrunch} alt="logo" className="w-full h-full" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user?.role === "admin" && (
              <ShopStatus
                isOpen={settings.isOpen}
                isManuallyOpen={settings.isManuallyOpen}
                onToggle={toggleShopStatus}
                isUpdating={isLoading}
                openingTime={settings.openingTime}
                closingTime={settings.closingTime}
              />
            )}
            <NotificationBadge />
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-white bg-white/10 p-2 rounded-xl active:scale-95 transition-transform"><Menu size={24} /></button>
          </div>
        </header>

        <div className="hidden lg:block flex-shrink-0">
          <AdminHeader user={user} shopData={{ settings, toggleShopStatus, isLoading }} />
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-white">
          <div className="max-w-7xl mx-auto">

            <Outlet context={{ user, ...settingsProps }} />

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;