import React, { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";

const CategoryFormModal = ({ onClose, onSave, loading, error, editingCategory }) => {
  const [catName, setCatName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (editingCategory) {
      setCatName(editingCategory.name);
      setPreview(editingCategory.image);
    } else {
      setCatName("");
      setPreview(null);
      setImage(null);
    }
  }, [editingCategory]);

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({ name: catName, image });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-black uppercase text-slate-900 tracking-tight">
            {editingCategory ? "Edit" : "Add"} <span className="text-primary">Category</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-gray-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <p className="text-red-500 text-[10px] font-bold uppercase text-center bg-red-50 py-2 rounded-lg">{error}</p>}

          {/* Image Upload Container */}
          <div className="flex flex-col items-center justify-center">
            <div
              onClick={() => fileRef.current.click()}
              className="relative w-full max-w-[200px] sm:max-w-[240px] aspect-square bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-slate-950 transition-all overflow-hidden mx-auto group"
            >
              {preview ? (
                <img src={preview} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="preview" />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload size={24} className="text-slate-400 mb-2 group-hover:text-slate-900 transition-colors" />
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Category Image</p>
                </div>
              )}
              <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleImg} />
            </div>

            {/* Optional: Change Image label */}
            {preview && (
              <p className="text-[9px] font-black text-primary uppercase mt-2 tracking-widest cursor-pointer hover:underline" onClick={() => fileRef.current.click()}>
                Change Photo
              </p>
            )}
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 mb-1.5 block">Category Name</label>
            <input
              required
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-slate-950 transition-all placeholder:text-slate-400"
              placeholder="e.g. Desserts, Sea Food"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase text-[11px] tracking-widest hover:bg-primary transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : editingCategory ? "Update Category" : "Save Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;