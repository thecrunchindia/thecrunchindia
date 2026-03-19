import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileTabs, OrderHistory, AddressBook, ProfileOverview, UserReviews } from "../../features/user/profile";

const Profile = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) setActiveTab(tab);
  }, [location]);

  return (
    <div className="min-h-screen bg-white  pt-3 md:pt-12 pb-20 px- sm:px-4">
      <div className="max-w-[1440px] mx-auto">
        {/* Main Container */}
        <div className="bg-white   md:rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 overflow-hidden">

          {/* Navigation Tabs */}
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Dynamic Content Area */}
          <div className="p-6 md:p-12 lg:p-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {activeTab === "profile" && <ProfileOverview />}
                {activeTab === "orders" && <OrderHistory />}
                {activeTab === "address" && <AddressBook />}
                {activeTab === 'review' && (
                  <UserReviews setActiveTab={setActiveTab} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;