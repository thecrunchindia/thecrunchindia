import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, Utensils, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TypingPlaceholder from "../ui/TypingPlaceholder";

const SearchBar = ({
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  words,
  handleCloseSearch,
  isMobile,
  categories = [],
  allItems = [],
  onSelectItem
}) => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState({ categories: [], products: [] });

  useEffect(() => {
    const itemsArray = Array.isArray(allItems) ? allItems : (allItems?.results || []);
    const catsArray = Array.isArray(categories) ? categories : (categories?.results || []);

    if (searchQuery && searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase().trim();

      const matchedCats = catsArray.filter(cat =>
        (cat.name?.toLowerCase().includes(query)) && cat.id !== 'All'
      );

      const matchedProds = itemsArray.filter(item => {
        const itemName = item.name?.toLowerCase() || "";
        const catName = item.category_name?.toLowerCase() || "";
        return itemName.startsWith(query) || catName.startsWith(query);
      });

      setSuggestions({
        categories: matchedCats.slice(0, 3),
        products: matchedProds.slice(0, 8)
      });
    } else {
      setSuggestions({ categories: [], products: [] });
    }
  }, [searchQuery, categories, allItems]);

  const handleSelect = (type, data) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (type === 'category') {
      navigate(`/menu?category=${data.id}`);
    } else {
      if (onSelectItem) {
        onSelectItem(data);
      }
    }
    setSearchQuery("");
    handleCloseSearch();
  };

  const hasSuggestions = suggestions.categories.length > 0 || suggestions.products.length > 0;

  return (
    <div className="relative w-full">
      {!isMobile && !searchOpen ? (
        <button onClick={() => setSearchOpen(true)} className="cursor-pointer p-2 lg:p-3 hover:bg-gray-100 rounded-full text-gray-700 transition-all active:scale-90">
          <Search size={20} className="lg:size-[23px] text-black/80" />
        </button>
      ) : (
        <motion.div
          initial={isMobile ? {} : { width: 0, opacity: 0 }}
          animate={isMobile ? {} : { width: "clamp(250px, 35vw, 400px)", opacity: 1 }}
          exit={isMobile ? {} : { width: 0, opacity: 0 }}
          className={`${isMobile ? 'w-full' : 'absolute right-0 top-1/2 -translate-y-1/2'} flex items-center bg-white rounded-full px-4 py-2 border-2 border-primary/30 outline-none focus-within:border-[#f9a602] shadow-xl z-[120]`}
        >
          <Search size={18} className="text-black/80 shrink-0 mr-2" />
          <div className="relative flex-1 flex items-center ">
            {!searchQuery && (
              <div className="absolute left-0 text-[14px] sm:text-sm font-medium text-gray-600 pointer-events-none">
                Search <TypingPlaceholder words={words} />
              </div>
            )}
            <input
              type="text"
              className="bg-transparent outline-none text-sm w-full font-semibold z-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={!isMobile}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery) {
                  e.currentTarget.blur();
                  navigate(`/menu?search=${searchQuery}`);
                  handleCloseSearch();
                }
              }}
            />
          </div>
          {(searchQuery || !isMobile) && (
            <button onClick={handleCloseSearch} className="shrink-0 p-1 hover:bg-gray-100 rounded-full ml-1">
              <X size={16} className="text-gray-500" />
            </button>
          )}
        </motion.div>
      )}

      <AnimatePresence>
        {searchQuery.length > 1 && hasSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            className={`absolute ${isMobile ? 'top-full left-0 right-0' : 'top-[110%] right-0'} left-0 right-0 mt-0 sm:mt-6 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-[130] border border-gray-100 overflow-hidden md:w-[400px] md:left-auto`}
          >
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {suggestions.categories.length > 0 && (
                <div className="mb-2">
                  <h3 className="text-[10px] font-black uppercase text-gray-400 px-4 py-2 flex items-center gap-2">
                    <LayoutGrid size={12} /> Categories
                  </h3>
                  {suggestions.categories.map((cat) => (
                    <button
                      key={`cat-${cat.id}`}
                      onClick={() => handleSelect('category', cat)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                        <Utensils size={14} />
                      </div>
                      <span className="text-sm font-bold text-gray-700">{cat.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {suggestions.products.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-black uppercase text-gray-400 px-4 py-2 flex items-center gap-2">
                    <Clock size={12} /> Popular Dishes
                  </h3>
                  {suggestions.products.map((item) => (
                    <button
                      key={`item-${item.id}`}
                      onClick={() => handleSelect('product', item)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                    >
                      {item.image ? (
                        <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover shadow-sm shrink-0" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                          <Utensils size={16} className="text-gray-300" />
                        </div>
                      )}
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-bold text-gray-800 truncate">{item.name}</span>
                        <span className="text-[11px] font-bold text-primary">
                          {item.has_variants && item.variants?.length > 0
                            ? `₹${item.variants[0].offer_price || item.variants[0].actual_price}`
                            : `₹${item.offer_price || item.actual_price}`}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;