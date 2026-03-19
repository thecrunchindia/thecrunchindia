import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import { useEffect } from 'react';
import api from "../../../../api/axios";
import { 
  removeFromCart, 
  updateQuantity, 
  syncCartUpdate, 
  fetchCart 
} from '../../../../redux/cartSlice';
import { toast } from 'sonner';

const useCart = () => {
  const dispatch = useDispatch();
  
  const { items: cartItems, loading, error: reduxError } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.location); 
  const token = localStorage.getItem('user_access');

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  const isStoreClosed = isOpen === false;

  const { 
    data: latestProducts = [], 
    isLoading: isStockLoading,
    isFetched: isStockFetched,
    error: stockError 
  } = useQuery({
    queryKey: ["cartItemsStock"],
    queryFn: async () => {
      try {
        const res = await api.get("/inventory/public/menu-items/");
        return Array.isArray(res.data) ? res.data : res.data.results || [];
      } catch (err) {
        return [];
      }
    },
    enabled: cartItems.length > 0,
    refetchInterval: 30000, 
  });

  const cartWithStockStatus = cartItems.map(item => {
    const targetId = item.item_id || item.id;
    const serverProduct = latestProducts.find(p => p.id === targetId);
    
    let currentAvailableStock = 0;

    if (serverProduct) {
      if (item.variant_id && serverProduct.has_variants) {
        const variant = serverProduct.variants?.find(v => v.id === item.variant_id);
        currentAvailableStock = variant ? variant.quantity : 0;
      } else {
        currentAvailableStock = serverProduct.quantity;
      }
    } else {
      currentAvailableStock = isStockLoading && !isStockFetched ? item.quantity : 0;
    }
    
    return {
      ...item,
      currentStock: currentAvailableStock,
      isOutOfStock: isStockFetched && item.quantity > currentAvailableStock
    };
  });

  const totalAmount = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.offer_price || 0);
    return acc + (price * item.quantity);
  }, 0);

  const incrementQty = (item) => {
    const itemId = item.item_id || item.id;
    if (item.quantity < item.currentStock) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
      if (token) dispatch(syncCartUpdate({ itemId, variantId: item.variant_id, actionType: 'add' })); 
    } else {
      toast.error(`Stock limit reached! Only ${item.currentStock} available.`);
    }
  };

  const decrementQty = (item) => {
    const itemId = item.item_id || item.id;
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
      if (token) dispatch(syncCartUpdate({ itemId, variantId: item.variant_id, actionType: 'decrease' }));
    }
  };

  const removeItem = (id, itemId, variantId = null) => {
    dispatch(removeFromCart(id));
    if (token) dispatch(syncCartUpdate({ itemId, variantId, actionType: 'remove' }));
    toast.success("Item removed from cart");
  };

  return {
    cartItems: cartWithStockStatus, 
    subTotal: totalAmount.toFixed(2),
    totalAmount,
    loading: loading || (isStockLoading && !isStockFetched), 
    error: reduxError || (stockError ? "Failed to sync stock" : null),
    isStoreClosed, 
    incrementQty,
    decrementQty,
    removeItem,
  };
};

export default useCart;