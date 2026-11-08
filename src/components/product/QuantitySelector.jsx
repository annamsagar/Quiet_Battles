import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const QuantitySelector = ({ quantity = 1, onQuantityChange, max = 10, min = 1 }) => {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="space-y-2">
      <span className="text-xs uppercase tracking-widest-xl text-[#F5F1EA] font-mono font-medium block">
        QUANTITY
      </span>
      <div className="inline-flex items-center border border-[#333333] bg-[#151515]">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={quantity <= min}
          className="p-3 text-[#A7A29B] hover:text-[#F5F1EA] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>

        <span className="w-12 text-center font-mono text-sm text-[#F5F1EA] font-medium select-none">
          {quantity}
        </span>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={quantity >= max}
          className="p-3 text-[#A7A29B] hover:text-[#F5F1EA] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};
