import React, { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
      return [];
    }
  });

  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to persist cart to localStorage:', e);
    }
  }, [cartItems]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  /**
   * Add item to cart
   * @param {Object} product
   * @param {string} size
   * @param {number} quantity
   */
  const addToCart = (product, size, quantity = 1) => {
    if (!product || !size) return false;

    setCartItems((prevItems) => {
      const itemKey = `${product.id}-${size}`;
      const existingIndex = prevItems.findIndex((item) => item.key === itemKey);

      let updated;
      if (existingIndex > -1) {
        updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
      } else {
        const newItem = {
          key: itemKey,
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          size: size,
          quantity: quantity,
          image: product.images?.[0] || '',
          category: product.category,
        };
        updated = [newItem, ...prevItems];
      }
      return updated;
    });

    setLastAddedItem({ ...product, selectedSize: size, selectedQuantity: quantity });
    showToast(`Added ${quantity}x "${product.name}" (${size}) to your cart.`);
    return true;
  };

  /**
   * Update quantity of an item
   * @param {string} key
   * @param {number} newQuantity
   */
  const updateQuantity = (key, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(key);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity: newQuantity } : item))
    );
  };

  /**
   * Remove item from cart
   * @param {string} key
   */
  const removeFromCart = (key) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
    showToast('Item removed from cart.');
  };

  /**
   * Clear entire cart
   */
  const clearCart = () => {
    setCartItems([]);
  };

  // Computations
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemsCount,
        cartSubtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        lastAddedItem,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

