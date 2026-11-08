import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="py-6 border-b border-[#222222] flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 sm:gap-6 flex-1">
        <Link
          to={`/products/${item.slug}`}
          className="w-20 sm:w-24 aspect-[3/4] bg-[#151515] border border-[#333333] flex-shrink-0 overflow-hidden"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </Link>

        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#A88B65]">
            {item.category || 'COLLECTION'}
          </span>
          <h4 className="font-serif text-lg sm:text-xl font-light text-[#F5F1EA]">
            <Link to={`/products/${item.slug}`} className="hover:text-[#A88B65] transition-colors">
              {item.name}
            </Link>
          </h4>

          <div className="flex items-center gap-4 text-xs font-mono text-[#A7A29B]">
            <span>SIZE: <strong className="text-[#F5F1EA]">{item.size}</strong></span>
            <span>•</span>
            <span>PRICE: <strong className="text-[#F5F1EA]">{formatCurrency(item.price)}</strong></span>
          </div>
        </div>
      </div>

      {/* Quantity & Pricing Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        {/* Quantity Toggle */}
        <div className="flex items-center border border-[#333333] bg-[#151515]">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.key, item.quantity - 1)}
            className="p-2 text-[#A7A29B] hover:text-[#F5F1EA] transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={13} />
          </button>
          <span className="w-10 text-center font-mono text-xs text-[#F5F1EA]">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.key, item.quantity + 1)}
            className="p-2 text-[#A7A29B] hover:text-[#F5F1EA] transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={13} />
          </button>
        </div>

        {/* Item Subtotal */}
        <div className="text-right min-w-[90px]">
          <div className="text-sm sm:text-base font-mono font-medium text-[#F5F1EA]">
            {formatCurrency(itemTotal)}
          </div>
          <span className="text-[10px] text-neutral-500 font-mono">SUBTOTAL</span>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => onRemove(item.key)}
          className="p-2 text-[#A7A29B] hover:text-rose-400 transition-colors"
          title="Remove item"
          aria-label={`Remove ${item.name} from cart`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
