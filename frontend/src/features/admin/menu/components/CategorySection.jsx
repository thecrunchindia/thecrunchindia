import React from "react";
import { Plus, RefreshCcw, AlertCircle } from "lucide-react"; 
import { useCategory } from "../hooks/useCategory";
import CategoryList from "./CategoryList";
import CategoryFormModal from "./CategoryFormModal";

const CategorySection = () => {
  const { 
    categories, isCatModalOpen, setIsCatModalOpen, 
    addCategory, deleteCategory, handleEditCategory, 
    editingCategory, closeModal, loading, fetching, fetchError, fetchCategories 
  } = useCategory();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">
          Categories
        </h2>
        <button 
          onClick={() => setIsCatModalOpen(true)}
          className="cursor-pointer flex items-center gap-2 bg-white border-2 border-slate-900 text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-slate-900 hover:text-white transition-all"
        >
          <Plus size={14} /> Add Category
        </button>
      </div>

      {/* --- Error Handling Display --- */}
      {fetchError ? (
        <div className="w-full py-8 px-4 0 rounded-[2rem] gap-3 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-red-100  text-red-600 rounded-full flex items-center justify-center mb-3">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-sm font-black  text-slate-900 uppercase"> {fetchError || "We couldn't load the categories. Please check your connection."}</h3>
          <button 
            onClick={fetchCategories} 
            className="cursor-pointer flex items-center gap-2 bg-white border border-red-200 text-red-600 px-5 py-2 rounded-full text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all shadow-sm shadow-red-100"
          >
            <RefreshCcw size={12} /> Retry Loading
          </button>
        </div>
      ) : (
   
        <CategoryList 
          categories={categories} 
          onEdit={handleEditCategory} 
          onDelete={deleteCategory} 
          error={fetchError}
          fetching={fetching}
        />
      )}

      {isCatModalOpen && (
        <CategoryFormModal 
          onClose={closeModal}
          onSave={addCategory}
          loading={loading}
          editingCategory={editingCategory}
          error={fetchError}
        />
      )}
    </div>
  );
};

export default CategorySection;