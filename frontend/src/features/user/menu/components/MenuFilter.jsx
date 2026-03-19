import { ChevronDown, UtensilsCrossed } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom'; 
import DietToggle from './DietToggle';

const MenuFilter = ({ categories, activeCategory, setActiveCategory, filterType, setFilterType }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    
    const newParams = new URLSearchParams(searchParams);
    
    newParams.delete('search'); 
    
    if (categoryId === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', categoryId);
    }
    
    navigate(`/menu?${newParams.toString()}`);
  };

  const handleDietChange = (val) => {
    setFilterType(val);
    
  };

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 md:py-6 px-4">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-row items-center justify-between gap-3">
          
          <div className="hidden md:flex items-center gap-3 md:w-64">
            <div className="bg-black text-white p-2.5 rounded-2xl shadow-lg shadow-black/5">
              <UtensilsCrossed size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-[0.15em] text-black leading-none">Our Menu</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Fresh & Hot</span>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="hidden md:block">
              <DietToggle filterType={filterType} setFilterType={handleDietChange} />
            </div>

            <div className="md:hidden w-full relative">
              <select 
                value={filterType}
                onChange={(e) => handleDietChange(e.target.value)}
                className="w-full bg-white border border-primary/60 rounded-xl px-4 py-3 text-[10px] font-black outline-none focus:border-[#f9a602] shadow-xl appearance-none cursor-pointer"
              >
                <option value="All">All Diets</option>
                <option value="Veg">Veg Only</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex-1 md:flex-none md:w-64 relative">
            <div className="relative w-full">
              <select 
                value={String(activeCategory)} 
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-white border border-primary/60 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 text-[10px] md:text-xs font-black outline-none focus:border-[#f9a602] shadow-xl appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MenuFilter;