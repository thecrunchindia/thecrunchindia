import { useState } from 'react';
import { toast } from 'sonner';
import api from '../../../../api/axios'; 
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

export const useOrder = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const placeOrder = async (selectedAddress, cartItems, finalPayable) => {
    // 1. Stock Validation
    const hasStockError = cartItems.some(item => item.isOutOfStock);
    if (hasStockError) {
      toast.error("Some items are out of stock. Please check your cart.");
      return { success: false };
    }

    // 2. Address Validation
    if (!selectedAddress) {
      toast.error("Please select a delivery address.");
      return { success: false };
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        address_id: selectedAddress.id,
        items: cartItems.map(item => ({
          product_id: item.item_id || item.id, 
          quantity: item.quantity,
          price: item.offer_price.toString()
        })),
        payment_method: "COD",
        total_amount: finalPayable
      };

      const [response] = await Promise.all([
        api.post('/orders/place-order/', orderPayload),
        new Promise(resolve => setTimeout(resolve, 2000)) 
      ]);

      if (response.status === 201 || response.status === 200) {
        toast.success("Order placed successfully!");
        return { success: true, data: response.data };
      }

      return { success: false };

    } catch (error) {
      console.error("Order Error:", error);
      const errorMsg = extractErrorMessages(error);
      toast.error(errorMsg || "Failed to place order.");
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { placeOrder, isSubmitting };
};