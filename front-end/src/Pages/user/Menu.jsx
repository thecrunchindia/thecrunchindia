import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { 
  useMenu, 
  MenuHeader, 
  MenuFilter, 
  MenuItemLists, 
  MenuSkeleton, 
  ErrorMenu 
} from '../../features/user/menu';
import ProductModal from "../../components/common/ProductModal"; 

const MenuPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const { 
    categories, activeCategory, setActiveCategory, 
    filterType, setFilterType, filteredItems,
    isLoading, error, refetch 
  } = useMenu();

  useEffect(() => {
    const handlePopState = () => {
      if (selectedItem) {
        setSelectedItem(null); 
      }
    };

    if (selectedItem) {
      window.history.pushState({ modalOpen: true }, "");
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedItem]);

  // MODIFIED: Added isNavigatingToCart parameter
  const handleCloseModal = (isNavigatingToCart = false) => {
    if (window.history.state?.modalOpen && !isNavigatingToCart) {
      window.history.back();
    }
    setSelectedItem(null);
  };
  // ---------------------------------------------------

  return (
    <div className="min-h-screen bg-white">
      <MenuHeader />
      
      <MenuFilter 
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      <AnimatePresence>
        {selectedItem && (
          <ProductModal 
            item={selectedItem} 
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>

      {error ? (
        <ErrorMenu 
          message={error.message} 
          onRetry={() => refetch()} 
        />
      ) : isLoading ? (
        <MenuSkeleton />
      ) : (
        <MenuItemLists 
          items={filteredItems} 
          onItemClick={(item) => setSelectedItem(item)}
        />
      )}
    </div>
  );
};

export default MenuPage;