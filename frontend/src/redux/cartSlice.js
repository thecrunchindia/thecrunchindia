import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios'; 
import { extractErrorMessages } from '../utils/extractErrorMessages'; 

const loadCart = () => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const saveToLocal = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const formatCartItems = (items) => {
  return (items || []).map(item => ({
    ...item,
    id: item.id, // Backend provides a unique id for each cart row
    item_id: item.item_id || item.id,
    variant_id: item.variant_id || null,
    // Add size to name if variant exists (eg: Mandi (full))
    name: item.size_name ? `${item.name} (${item.size_name})` : (item.name || item.item_name), 
    image: item.image || item.item_image,
    offer_price: item.offer_price?.toString() || "0",
  }));
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/orders/cart/');
      return response.data; 
    } catch (err) {
      return rejectWithValue(extractErrorMessages(err)); 
    }
  }
);

export const mergeCartOnLogin = createAsyncThunk(
  'cart/mergeCart',
  async (_, { rejectWithValue }) => {
    try {
      const localCart = loadCart();
      if (localCart.length === 0) {
        const response = await api.get('/orders/cart/');
        return response.data;
      }
      const itemsToMerge = localCart.map(item => ({
        item_id: item.item_id || item.id,
        variant_id: item.variant_id || null,
        quantity: item.quantity
      }));
      const response = await api.post('/orders/cart/merge/', { items: itemsToMerge });
      localStorage.removeItem('cart'); 
      return response.data; 
    } catch (err) {
      return rejectWithValue(extractErrorMessages(err));
    }
  }
);

export const syncCartUpdate = createAsyncThunk(
  'cart/syncUpdate',
  async ({ itemId, variantId = null, actionType, quantity = 1 }, { rejectWithValue }) => {
    try {
      const payload = {
        item_id: itemId,
        action: actionType,
        quantity: quantity
      };
      
      if (variantId) {
        payload.variant_id = variantId;
      }

      const response = await api.post('/orders/cart/update/', payload);
      return response.data; 
    } catch (err) {
      return rejectWithValue(extractErrorMessages(err));
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
    loading: false,
    error: null
  },
  reducers: {
    addToCart: (state, action) => {
      const { item, quantity } = action.payload;
      const cartItemId = item.id; 
      
      const existingItem = state.items.find((i) => i.id === cartItemId || (i.item_id === item.item_id && i.variant_id === item.variant_id));

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ 
          ...item, 
          id: cartItemId,
          item_id: item.item_id,
          variant_id: item.variant_id || null,
          quantity,
          name: item.name,
          image: item.image,
          offer_price: item.offer_price?.toString() || "0"
        });
      }
      saveToLocal(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
        saveToLocal(state.items);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToLocal(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        // FIX: Handle both response structures (with or without 'cart_data')
        const fetchedItems = action.payload?.cart_data?.items || action.payload?.items || [];
        state.items = formatCartItems(fetchedItems);
        saveToLocal(state.items); // Keep local storage in sync
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Sync Update
      .addCase(syncCartUpdate.fulfilled, (state, action) => {
        const syncedItems = action.payload?.cart_data?.items || action.payload?.items || [];
        state.items = formatCartItems(syncedItems);
        saveToLocal(state.items);
      })
      .addCase(syncCartUpdate.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Merge logic
      .addCase(mergeCartOnLogin.fulfilled, (state, action) => {
        const mergedItems = action.payload?.cart_data?.items || action.payload?.items || [];
        state.items = formatCartItems(mergedItems);
        saveToLocal(state.items);
      });
  }
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;