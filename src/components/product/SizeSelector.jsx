import React from 'react';

export const SizeSelector = ({
  sizes = ['S', 'M', 'L', 'XL', 'XXL'],
  selectedSize,
  onSelectSize,
  errorMessage,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-widest-xl text-[#F5F1EA] font-mono font-medium">
          SELECT SIZE
        </span>
        <span className="text-[#A7A29B] font-mono text-[11px]">
          FITS OVERSIZED / RELAXED
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`py-3 text-center text-xs sm:text-sm font-mono uppercase tracking-wider border transition-all duration-200 focus:outline-none ${
                isSelected
                  ? 'bg-[#F5F1EA] text-[#0A0A0A] font-bold border-[#F5F1EA] shadow-md'
                  : 'bg-[#151515] text-[#A7A29B] border-[#333333] hover:border-[#A88B65] hover:text-[#F5F1EA]'
              }`}
              aria-label={`Select size ${size}`}
              aria-pressed={isSelected}
            >
              {size}
            </button>
          );
        })}
      </div>

      {errorMessage && (
        <p className="text-xs text-rose-400 font-mono tracking-wide mt-1 animate-pulse">
          * {errorMessage}
        </p>
      )}
    </div>
  );
};
