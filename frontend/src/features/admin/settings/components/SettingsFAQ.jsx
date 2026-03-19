import React, { useState } from 'react';
import { useFAQ } from '../hooks/useFAQ';
import { Plus, Trash2, Edit2, Save, X, Loader2, MessageSquare, Info, AlertCircle, RefreshCw } from 'lucide-react';

const SettingsFAQ = () => {
  const { 
    faqs, 
    loading, 
    error, 
    createFAQ, 
    updateFAQ, 
    deleteFAQ, 
    isCreating, 
    isUpdating 
  } = useFAQ();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });

  const isLimitReached = faqs?.length >= 5;

  const handleSave = () => {
    if (!formData.question.trim() || !formData.answer.trim()) return;
    
    if (editingId) {
      updateFAQ({ id: editingId, data: formData }, { 
        onSuccess: () => { 
          setEditingId(null); 
          setFormData({question:'', answer:''}); 
        } 
      });
    } else {
      createFAQ(formData, { 
        onSuccess: () => { 
          setIsAdding(false); 
          setFormData({question:'', answer:''}); 
        } 
      });
    }
  };

  const confirmDelete = () => {
    if (!faqToDelete) return;
    setDeletingId(faqToDelete.id);
    
    deleteFAQ(faqToDelete.id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setFaqToDelete(null);
      },
      onSettled: () => setDeletingId(null)
    });
  };

  const openDeleteModal = (faq) => {
    setFaqToDelete(faq);
    setShowDeleteModal(true);
  };

  const startEdit = (faq) => {
    setIsAdding(false);
    setEditingId(faq.id);
    setFormData({ question: faq.question, answer: faq.answer });
  };

  // 1. Skeleton Loader
  if (loading) return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center px-1">
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
        <div className="h-9 w-28 bg-slate-200 rounded-xl"></div>
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-5 border border-slate-100 rounded-xl bg-slate-50/50 h-24"></div>
        ))}
      </div>
    </div>
  );

  // 2. Error Message with Retry
  if (error) return (
    <div className="flex flex-col items-center justify-center p-10   text-center space-y-4">
      <div className="p-3 bg-rose-100 text-rose-500 rounded-full">
        <AlertCircle size={32} />
      </div>
      <div>
        <h3 className="font-black uppercase text-slate-900 text-sm tracking-tight">{typeof error === 'object' ? error.message : error || "Failed to load FAQs"}</h3>
      </div>
      <button 
        onClick={() => window.location.reload()}
        className="cursor-pointer flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
      >
        <RefreshCw size={14} /> Retry Now
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
        <div>
          <h2 className="font-black uppercase tracking-tighter text-slate-900 text-sm md:text-base">
            FAQs <span className="text-gray-500 ml-1">({faqs?.length || 0}/5)</span>
          </h2>
          <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            Manage your common questions
          </p>
        </div>
        
        {!isLimitReached && !isAdding && !editingId && (
          <button 
            onClick={() => setIsAdding(true)}
            className="cursor-pointer flex items-center gap-2 bg-black text-white px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase hover:bg-[#f9a602] hover:text-black transition-all shadow-sm active:scale-95"
          >
            <Plus size={14} /> Add New
          </button>
        )}
      </div>

      <div className="grid gap-3">
        {/* Form: Add or Edit */}
        {(isAdding || editingId) && (
          <div className="p-4 md:p-6 border-2 border-dashed border-slate-200 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50/50 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="space-y-3">
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3.5 text-gray-500" size={16} />
                <input 
                  required
                  disabled={isCreating || isUpdating}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 ring-primary/60 outline-none text-xs md:text-sm font-bold disabled:bg-slate-100"
                  placeholder="Question..."
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                />
              </div>
              <div className="relative">
                <Info className="absolute left-3 top-3.5 text-gray-500" size={16} />
                <textarea 
                  required
                  disabled={isCreating || isUpdating}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 ring-primary/60 outline-none text-xs md:text-sm font-medium min-h-[100px] disabled:bg-slate-100"
                  placeholder="The answer goes here..."
                  value={formData.answer}
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={handleSave} 
                disabled={isCreating || isUpdating}
                className="cursor-pointer flex-1 bg-black text-white p-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
              >
                {(isCreating || isUpdating) ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )} 
                {editingId ? (isUpdating ? 'Updating...' : 'Update FAQ') : (isCreating ? 'Saving...' : 'Save FAQ')}
              </button>
              <button 
                disabled={isCreating || isUpdating}
                onClick={() => { setIsAdding(false); setEditingId(null); setFormData({question:'', answer:''}) }}
                className="cursor-pointer px-4 bg-white border border-slate-400 rounded-xl text-slate-500 hover:bg-slate-50 disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs?.map((faq) => (
            editingId !== faq.id && (
              <div key={faq.id} className="p-4 md:p-5 border border-slate-200 rounded-xl bg-white hover:shadow-md transition-all group border-b-2">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  
                  {/* Mobile Buttons */}
                  <div className="flex justify-end gap-3 md:hidden border-b border-slate-100 pb-2">
                    <button 
                      disabled={isUpdating}
                      onClick={() => startEdit(faq)}
                      className="cursor-pointer p-2 text-gray-500 bg-white border border-slate-300 shadow-sm hover:text-blue-500 rounded-lg"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => openDeleteModal(faq)}
                      className="cursor-pointer p-2 text-gray-500 bg-white border border-slate-300 shadow-sm hover:text-red-500 rounded-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="space-y-1.5 flex-1">
                    <p className="font-black text-[11px] md:text-sm uppercase text-slate-900 leading-tight">
                      <span className="text-[#f9a602] mr-1">Q.</span> {faq.question}
                    </p>
                    <p className="text-slate-500 text-[10px] md:text-xs font-medium italic">
                      {faq.answer}
                    </p>
                  </div>

                  {/* Desktop Buttons */}
                  <div className="hidden md:flex gap-5">
                    <button 
                      disabled={isUpdating}
                      onClick={() => startEdit(faq)}
                      className="cursor-pointer p-2 text-gray-500 bg-white border border-slate-300 shadow-md hover:text-blue-500 hover:bg-blue-50 rounded-lg disabled:opacity-30"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button 
                      onClick={() => openDeleteModal(faq)}
                      className="cursor-pointer p-2 text-gray-500 bg-white border border-slate-300 shadow-md hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {faqs?.length === 0 && !isAdding && (
          <div className="text-center py-12 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-100">
            No questions found
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[400px] rounded-[2rem] p-8 shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
            <div className="p-4 bg-rose-50 text-rose-500 rounded-full mb-4">
              <AlertCircle size={32} />
            </div>
            <h4 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-2">Delete FAQ?</h4>
            <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
              Are you sure you want to delete this question? 
            </p>
            <div className="flex gap-3 w-full">
              <button 
                disabled={deletingId}
                onClick={() => { setShowDeleteModal(false); setFaqToDelete(null); }} 
                className="cursor-pointer flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-gray-600 bg-slate-200 border border-slate-300 rounded-2xl hover:bg-slate-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                disabled={deletingId}
                onClick={confirmDelete} 
                className="cursor-pointer flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-white bg-rose-500 rounded-2xl shadow-lg shadow-rose-200 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {deletingId ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  'Confirm'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsFAQ;