import React, { useState } from "react";
import { Plus, PackageOpen, RefreshCcw, AlertCircle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useMenu } from "../hooks/useMenu";
import { useCategory } from "../hooks/useCategory";
import MenuFilters from "./MenuFilters";
import MenuGrid from "./MenuGrid";
import MenuFormModal from "./MenuFormModal";
import ProductCardSkeleton from "./ProductCardSkeleton"; 
import { AnimatePresence } from "framer-motion";

const ProductSection = () => {
  const [activeSection, setActiveSection] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLowStock, setIsLowStock] = useState(false);
  const [showUnavailable, setShowUnavailable] = useState(false);

  const { categories, fetchCategories } = useCategory();
  
  const { 
    items, totalCount, formData, setFormData, editingId, loading, 
    fetching, isLoading, error, fileInputRef, handleImageChange, 
    handleSubmit, handleEdit, handleDelete, resetForm,
    page, setPage, hasNextPage, hasPreviousPage 
  } = useMenu({ activeSection, activeCategory, searchQuery,isLowStock ,showUnavailable});
  
  const sections = ["All", "BANNER", "COMBO MENU", "BEST SELLER", "TODAY'S SPECIAL", "OTHERS"];

  const handleOpenAdd = () => {
    fetchCategories();
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 border-t-2 border-slate-50 pt-10 min-h-[400px]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Menu Items</h2>
          {!isLoading && !error && (
            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">
             Total - {totalCount} Items
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="order-first md:order-last">
            <button 
              onClick={handleOpenAdd} 
              className="w-full md:w-auto cursor-pointer bg-slate-900 text-white px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} strokeWidth={3} /> Add New Item
            </button>
          </div>

          <div className="flex-1 order-last md:order-first">
            <MenuFilters 
              sections={sections} 
              activeSection={activeSection} 
              setActiveSection={setActiveSection}
              categories={categories} 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              isLowStock={isLowStock}
              setIsLowStock={setIsLowStock}
              showUnavailable={showUnavailable}
              setShowUnavailable={setShowUnavailable}
            />
          </div>
        </div>
      </div>

      {isLoading && items.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-red-50 bg-red-50/10 rounded-3xl text-center">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-slate-900 font-black uppercase tracking-tight mb-2">{error}</h3>
          <button onClick={() => window.location.reload()} className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-xl text-[10px] font-black uppercase shadow-sm hover:bg-slate-50 transition-all">
            <RefreshCcw size={14} /> Try To Reconnect
          </button>
        </div>
      ) : items.length > 0 ? (
        <>
          <div className="transition-opacity duration-200 opacity-100">
            <MenuGrid 
              items={items} 
              onEdit={(item) => { handleEdit(item); setIsModalOpen(true); }} 
              onDelete={handleDelete} 
            />
          </div>

          {/* Pagination Controls */}
<div className="flex flex-col items-center justify-center gap-5 py-12 border-t border-slate-50">
  <div className="flex items-center gap-2 md:gap-3">
    
    {/* First Page Button */}
    <button 
      onClick={() => { setPage(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      disabled={page === 1 || fetching}
      className="p-2.5 rounded-2xl border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:border-slate-900 hover:text-slate-900 text-slate-500 transition-all cursor-pointer shadow-md active:scale-90"
      title="First Page"
    >
      <ChevronsLeft size={18} strokeWidth={2.5} />
    </button>

    {/* Previous Button */}
    <button 
      onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      disabled={!hasPreviousPage || fetching}
      title="Previous Page"
      className="p-2.5 rounded-2xl border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:border-slate-900 hover:text-slate-900 text-slate-500 transition-all cursor-pointer shadow-md active:scale-90"
    >
      <ChevronLeft size={18} strokeWidth={2.5} />
    </button>

    {/* Page Status Indicator */}
    <div className="relative min-w-[120px] flex items-center justify-center bg-slate-900 px-6 py-3 rounded-2xl shadow-xl shadow-slate-200">
      {fetching ? (
        <div className="flex items-center gap-2">
          <RefreshCcw size={12} className="animate-spin text-white" />
          <span className="text-[10px] font-black uppercase tracking-tighter text-white">Loading</span>
        </div>
      ) : (
        <div className="flex flex items-center gap-1 ">
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
            Page {page} of {Math.ceil(totalCount / 20) || 1}
          </span>

        </div>
      )}
    </div>

    {/* Next Button */}
    <button 
      onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      disabled={!hasNextPage || fetching}
      title="Next Page"
      className="p-2.5 rounded-2xl border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:border-slate-900 hover:text-slate-900 text-slate-600 transition-all cursor-pointer shadow-md active:scale-90"
    >
      <ChevronRight size={18} strokeWidth={2.5} />
    </button>

    {/* Last Page Button */}
    <button 
      onClick={() => { 
        const lastPage = Math.ceil(totalCount / 12);
        setPage(lastPage); 
        window.scrollTo({ top: 0, behavior: "smooth" }); 
      }}
      disabled={!hasNextPage || fetching}
      className="p-2.5 rounded-2xl border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:border-slate-900 hover:text-slate-900 text-slate-600 transition-all cursor-pointer shadow-md active:scale-90"
      title="Last Page"
    >
      <ChevronsRight size={18} strokeWidth={2.5} />
    </button>
  </div>

  
</div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-100 rounded-3xl text-center">
          <PackageOpen size={40} className="text-slate-200 mb-3 mx-auto" />
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">No products found</p>
        </div>
      )}

      <AnimatePresence>
  {isModalOpen && (
    <MenuFormModal 
      formData={formData} 
      setFormData={setFormData} 
      editingId={editingId}
      categories={categories} 
      fileInputRef={fileInputRef}
      handleImageChange={handleImageChange} 
      loading={loading}
      onClose={() => { resetForm(); setIsModalOpen(false); }} 
      onSubmit={async (e) => {
        const success = await handleSubmit(e);
        
        if (success) {
          if (editingId) {
            setIsModalOpen(false);
          } else {
            resetForm(); 
          }
        }
      }}
    />
  )}
</AnimatePresence>
    </div>
  );
};

export default ProductSection;