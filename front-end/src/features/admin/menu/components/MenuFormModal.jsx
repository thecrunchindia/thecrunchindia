import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, ChevronDown, X, Loader2, Eye, EyeOff, Plus, Trash2 } from "lucide-react";

const MenuFormModal = ({
  formData,
  setFormData,
  onClose,
  onSubmit,
  editingId,
  categories,
  fileInputRef,
  handleImageChange,
  loading,
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const bannerInputRef = useRef(null);

  // MODIFIED: Only Character Limit for description (Professional approach)
  const MAX_CHARS = 150;
  const currentChars = formData.description ? formData.description.length : 0;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // സ്ക്രോൾ ചെയ്യുമ്പോൾ നമ്പർ മാറുന്നത് തടയാനുള്ള ഫങ്ക്ഷൻ
  const stopScrollChange = (e) => {
    e.target.blur();
  };

  // Validation Check
  let isPriceInvalid = false;
  if (formData.has_variants) {
    isPriceInvalid = formData.variants.some(
      (v) => v.offer_price && Number(v.offer_price) > Number(v.actual_price)
    );
  } else {
    isPriceInvalid = formData.offer_price && Number(formData.offer_price) > Number(formData.actual_price);
  }

  const inputClass =
    "w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-2.5 text-[12px] font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none placeholder:text-slate-400";
  const labelClass = "text-[9px] font-black text-slate-700 uppercase tracking-widest ml-1 mb-1.5 block";

  const sectionOptions = [
    { label: "Banner", value: "BANNER" },
    { label: "Combo Menu", value: "COMBO MENU" },
    { label: "Best Seller", value: "BEST SELLER" },
    { label: "Today's Special", value: "TODAY'S SPECIAL" },
    { label: "Others", value: "OTHERS" },
  ];

  // Variant Handlers
  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        { size_name: "", actual_price: "", offer_price: "", quantity: "", is_available: true },
      ],
    });
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] = value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center p-0 md:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={!loading ? onClose : undefined}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      <motion.div
        initial={isMobile ? { y: "100%" } : { opacity: 0, y: 20 }}
        animate={{ y: 0, opacity: 1 }}
        exit={isMobile ? { y: "100%" } : { opacity: 0, y: 20 }}
        className="relative bg-white w-full md:max-w-5xl rounded-t-[2rem] md:rounded-[1.5rem] shadow-2xl flex flex-col max-h-[92vh] md:max-h-[90vh] overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="px-6 py-4 md:px-8 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            disabled={loading}
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors group disabled:opacity-30"
          >
            <X size={20} className="text-slate-600 group-hover:text-slate-900" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white text-slate-900">
          <form id="product-form" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative items-start">
              
              {/* Left Side: Images */}
              <div className="md:col-span-4 space-y-4 md:sticky md:top-0 h-fit">
                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {formData.section === "BANNER" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1.5"
                      >
                        <label className={`${labelClass} text-blue-600`}>Banner Image</label>
                        <div
                          onClick={() => !loading && bannerInputRef.current.click()}
                          className="relative aspect-[16/6] rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-blue-600 transition-all"
                        >
                          {formData.bannerPreviewUrl ? (
                            <img src={formData.bannerPreviewUrl} className="w-full h-full object-cover" alt="Banner" />
                          ) : (
                            <div className="text-center p-2">
                              <ImageIcon size={20} className="text-blue-400 mx-auto mb-1" />
                              <p className="text-[8px] font-black text-blue-600 uppercase">Banner Image</p>
                            </div>
                          )}
                          <input type="file" ref={bannerInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, "banner")} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-1.5">
                    <label className={labelClass}>Product Image</label>
                    <div
                      onClick={() => !loading && fileInputRef.current.click()}
                      className={`relative ${
                        formData.section === "BANNER" ? "aspect-[16/10]" : "aspect-square"
                      } rounded-[1.2rem] border-2 border-dashed border-slate-400 bg-slate-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-slate-900 transition-all duration-300`}
                    >
                      {formData.previewUrl ? (
                        <img src={formData.previewUrl} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <div className="text-center p-4">
                          <ImageIcon size={formData.section === "BANNER" ? 24 : 32} className="text-slate-400 mx-auto mb-2" />
                          <p className="text-[10px] font-black text-slate-600 uppercase">Product Photo</p>
                        </div>
                      )}
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, "product")} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Dietary Type</label>
                  <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl gap-1 border border-slate-300">
                    <button
                      disabled={loading}
                      type="button"
                      onClick={() => setFormData({ ...formData, dietary_preference: "VEG" })}
                      className={`py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
                        formData.dietary_preference === "VEG" ? "bg-green-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-200 cursor-pointer"
                      }`}
                    >
                      Veg
                    </button>
                    <button
                      disabled={loading}
                      type="button"
                      onClick={() => setFormData({ ...formData, dietary_preference: "NON-VEG" })}
                      className={`py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
                        formData.dietary_preference === "NON-VEG" ? "bg-red-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-200 cursor-pointer"
                      }`}
                    >
                      Non-Veg
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="md:col-span-8 space-y-4">
                
                {/* Top Toggles Row */}
                <div className="flex justify-between items-center mb-3 mt-0 sm:-mt-4 gap-3">
                  <div
                    onClick={() => {
                      if (!loading) {
                        setFormData({
                          ...formData,
                          has_variants: !formData.has_variants,
                          actual_price: "", offer_price: "", quantity: "",
                          variants: formData.variants.length === 0 && !formData.has_variants 
                            ? [{ size_name: "", actual_price: "", offer_price: "", quantity: "", is_available: true }] 
                            : formData.variants
                        });
                      }
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
                      formData.has_variants ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className={`relative w-8 h-4 rounded-full transition-colors ${formData.has_variants ? "bg-blue-600" : "bg-slate-300"}`}>
                      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${formData.has_variants ? "right-0.5" : "left-0.5"}`} />
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-tight ${formData.has_variants ? "text-blue-700" : "text-slate-600"}`}>
                      Variants
                    </span>
                  </div>

                  <div
                    onClick={() => !loading && setFormData({ ...formData, is_available: !formData.is_available })}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
                      formData.is_available ? "border-green-200 bg-green-50" : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    {formData.is_available ? <Eye size={12} className="text-green-600" /> : <EyeOff size={12} className="text-slate-400" />}
                    <span className={`text-[9px] font-black uppercase tracking-tight ${formData.is_available ? "text-green-700" : "text-slate-500"}`}>
                      {formData.is_available ? "Available" : "Unavailable"}
                    </span>
                    <div className={`relative w-8 h-4 rounded-full transition-colors ${formData.is_available ? "bg-green-500" : "bg-slate-300"}`}>
                      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${formData.is_available ? "right-0.5" : "left-0.5"}`} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Menu Section</label>
                    <div className="relative">
                      <select disabled={loading} className={inputClass} required value={formData.section} onChange={(e) => setFormData({ ...formData, section: e.target.value })}>
                        {sectionOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Category</label>
                    <div className="relative">
                      <select disabled={loading} className={inputClass} required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>Product Name</label>
                  <input disabled={loading} required placeholder="Enter item name..." className={inputClass} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>

                {/* MODIFIED: Changed to Character Count & Limit only */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-end">
                    <label className={labelClass}>Description</label>
                    <span className={`text-[8px] font-black uppercase ${currentChars >= MAX_CHARS ? "text-red-500" : "text-slate-400"}`}>
                      {currentChars} / {MAX_CHARS} Characters
                    </span>
                  </div>
                  <textarea 
                    disabled={loading} 
                    required 
                    maxLength={MAX_CHARS} // HTML Native Character Limit
                    placeholder="Short description..." 
                    className={`${inputClass} h-20 md:h-24 resize-none py-3 ${currentChars >= MAX_CHARS ? 'border-red-300 focus:border-red-500' : ''}`} 
                    value={formData.description} 
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                  />
                </div>

                {/* Pricing / Variants Section */}
                <div>
                  {formData.has_variants ? (
                    <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      {formData.variants.map((variant, index) => {
                        const isVariantPriceInvalid = variant.offer_price && Number(variant.offer_price) > Number(variant.actual_price);
                        
                        return (
                          <div key={index} className="flex flex-col gap-2 p-3 bg-white rounded-xl border border-slate-200 relative group">
                            {formData.variants.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveVariant(index)}
                                className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1.5 rounded-full hover:bg-red-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-sm z-10"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="space-y-1">
                                <label className="text-[8px] font-bold text-slate-500 uppercase">Size/Name</label>
                                <input disabled={loading} required placeholder="e.g. FULL" className={`${inputClass} !py-1.5`} value={variant.size_name} onChange={(e) => handleVariantChange(index, "size_name", e.target.value)} />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[8px] font-bold text-slate-500 uppercase">MRP (₹)</label>
                                <input disabled={loading} type="number" min="0" onWheel={stopScrollChange} required placeholder="0" className={`${inputClass} !py-1.5`} value={variant.actual_price} onChange={(e) => handleVariantChange(index, "actual_price", e.target.value)} />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[8px] font-bold text-slate-500 uppercase">Offer Price (₹)</label>
                                <input disabled={loading} type="number" min="0" onWheel={stopScrollChange} placeholder="0" className={`${inputClass} !py-1.5 ${isVariantPriceInvalid ? "border-red-500 bg-red-50" : ""}`} value={variant.offer_price || ""} onChange={(e) => handleVariantChange(index, "offer_price", e.target.value)} />
                                {isVariantPriceInvalid && <span className="text-[7px] text-red-600 font-bold">Invalid</span>}
                              </div>
                              <div className="space-y-1">
                                <label className="text-[8px] font-bold text-slate-500 uppercase">Stock</label>
                                <input disabled={loading} type="number" min="0" onWheel={stopScrollChange} required placeholder="0" className={`${inputClass} !py-1.5`} value={variant.quantity} onChange={(e) => handleVariantChange(index, "quantity", e.target.value)} />
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <button
                        type="button"
                        onClick={handleAddVariant}
                        className="flex w-full justify-center items-center gap-1 text-[10px] font-black uppercase text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 px-2 py-2.5 mt-2 rounded-lg transition-colors"
                      >
                        <Plus size={14} /> Add more
                      </button>

                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className={labelClass}>MRP (₹)</label>
                        <input disabled={loading} type="number" min="0" onWheel={stopScrollChange} required={!formData.has_variants} placeholder="0" className={inputClass} value={formData.actual_price} onChange={(e) => setFormData({ ...formData, actual_price: e.target.value })} />
                      </div>
                      <div className="space-y-1.5">
                        <label className={labelClass}>Offer Price (₹)</label>
                        <input disabled={loading} type="number" min="0" onWheel={stopScrollChange} placeholder="0" className={`${inputClass} ${isPriceInvalid ? "border-red-500 bg-red-50 focus:border-red-600" : ""}`} value={formData.offer_price} onChange={(e) => setFormData({ ...formData, offer_price: e.target.value })} />
                        {isPriceInvalid && <p className="text-[8px] text-red-600 font-black uppercase ml-1">Must be less than MRP</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className={labelClass}>Stock</label>
                        <input disabled={loading} type="number" min="0" onWheel={stopScrollChange} required={!formData.has_variants} placeholder="0" className={inputClass} value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-200 flex gap-4 bg-slate-50 shrink-0">
          <button disabled={loading} type="button" onClick={onClose} className="px-8 py-3.5 rounded-xl text-[11px] font-black uppercase text-slate-600 border border-slate-300 bg-white hover:bg-slate-200 cursor-pointer disabled:opacity-50">
            Cancel
          </button>
          <button
            disabled={loading || isPriceInvalid}
            form="product-form"
            type="submit"
            className={`flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-black uppercase text-[11px] shadow-lg flex items-center justify-center gap-2 transition-all hover:bg-black active:scale-95 cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>{editingId ? "Saving Changes..." : "Creating Item..."}</span>
              </>
            ) : (
              <span>{editingId ? "Save Changes" : "Create New Item"}</span>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MenuFormModal;