import React, { useState } from 'react';
import { ShoppingBag, Check, AlertCircle } from 'lucide-react';

export const AddToCartButton = ({ onAddToCart, disabled = false, isAdded = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    if (disabled) return;
    setIsSubmitting(true);
    await onAddToCart();
    setTimeout(() => {
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isSubmitting}
      className={`w-full py-4 px-8 text-xs uppercase tracking-widest-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
        isAdded
          ? 'bg-[#A88B65] text-white border border-[#A88B65]'
          : 'bg-[#F5F1EA] text-[#0A0A0A] hover:bg-[#A88B65] hover:text-white border border-transparent'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      aria-label="Add to shopping cart"
    >
      {isAdded ? (
        <>
          <Check size={16} />
          <span>ADDED TO ARMOR BAG</span>
        </>
      ) : (
        <>
          <ShoppingBag size={16} />
          <span>ADD TO CART</span>
        </>
      )}
    </button>
  );
};

