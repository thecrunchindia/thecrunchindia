  import React, { useState } from 'react';
  import { Download, Loader2 } from 'lucide-react';
  import {useCustomer, CustomerFilters, CustomerTable} from "../../features/admin/customer";

  const Customers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [isFilterOpen, setIsFilterOpen] = useState(false); 
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [userToToggle, setUserToToggle] = useState(null);

    const { 
      customers, isLoading, isError,totalCount, isMoreLoading, hasMore, loadMore, handleShowLess, 
      toggleBlockStatus, exportToCSV, isExporting, error, resetList 
    } = useCustomer(searchTerm, statusFilter);

    return (
      <div className="px-0.5  sm:px-2 pt-0 sm:pt-4 w-full min-h-screen font-sans text-[#2D3748] flex flex-col" onClick={() => setIsFilterOpen(false)}>
        <div id="top-of-customers"></div>
        
        {/* HEADER */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4  py-5">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-3xl font-black uppercase tracking-tight text-[#1A202C]">
                CUSTOMERS<span className="text-[#f9a602]">.</span>
              </h1>
              <p className="hidden md:block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">Management Portal</p>
            </div>
            
            <button 
              onClick={exportToCSV}
              disabled={isExporting || isLoading}
              className="flex items-center gap-2 px-4 md:px-8 py-3 bg-[#1A202C] text-white rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-bold transition-all active:scale-95 disabled:opacity-50"
            >
              {isExporting ? <Loader2 size={16} className="animate-spin text-[#f9a602]" /> : <Download size={16} className="text-[#f9a602]" />}
              <span className="hidden sm:inline">EXPORT CSV</span>
              <span className="sm:hidden">EXPORT</span>
            </button>
          </div>
        </div>

        <div className="max-w-[1440px] w-full mx-auto pt-8 pb-24">
          
          {/* FILTERS COMPONENT */}
          <CustomerFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              loadedCount={customers.length} 
              totalCount={totalCount}
              isLoading={isLoading}
          />

          {/* TABLE COMPONENT */}
          <CustomerTable 
            customers={customers}
            isLoading={isLoading}
            isError={isError}
            error={error}
            onRetry={resetList}
            onToggleStatus={(customer) => { setUserToToggle(customer); setShowBlockModal(true); }}
            hasMore={hasMore}
            loadMore={loadMore}
            isMoreLoading={isMoreLoading}
            onShowLess={handleShowLess}
          />
        </div>
        
        {/* BLOCK MODAL */}
        {showBlockModal && userToToggle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/10 backdrop-blur-md" onClick={() => setShowBlockModal(false)}>
            <div className="bg-white rounded-[2rem] p-6 max-w-[400px] w-full animate-in zoom-in-95 duration-200 border border-gray-100 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-center mb-6">Confirm Status Change?</h3>
              <p className="text-sm text-gray-500 text-center mb-8 font-medium">Are you sure you want to change the status for {userToToggle.first_name}?</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => { toggleBlockStatus(userToToggle.id); setShowBlockModal(false); }} className={`py-4 font-bold rounded-xl text-white ${userToToggle.is_blocked ? 'bg-emerald-500' : 'bg-red-500'}`}>YES, PROCEED</button>
                <button onClick={() => setShowBlockModal(false)} className="py-4 bg-gray-50 text-gray-500 font-bold rounded-xl">CANCEL</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Customers;