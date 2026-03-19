import React, { useState, useEffect } from 'react';
import { Header, OrderTabs, NewOrders, PreparingOrders, OnTheWayOrders, HistoryOrders } from '../../features/admin/order';

const Orders = () => {
  const tabs = ['NEW ORDERS', 'PREPARING', 'ON THE WAY', 'HISTORY'];
  const [activeTab, setActiveTab] = useState('NEW ORDERS');


  const renderSection = () => {
    switch (activeTab) {
      case 'NEW ORDERS': return <NewOrders />;
      case 'PREPARING': return <PreparingOrders />;
      case 'ON THE WAY': return <OnTheWayOrders />;
      case 'HISTORY': return <HistoryOrders />;
      default: return <NewOrders />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="px-0.5 pt-4 sm:px-2 pt-0 sm:pt-8 max-w-7xl mx-auto">

        {/* --- HEADER SECTION --- */}
        <Header />

        {/* --- TABS SECTION --- */}
        <div className="mb-6 md:mb-10 border  border-gray-200 bg-white  shadow-xl rounded-xl flex justify-center">
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
            <OrderTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="mt-4">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Orders;