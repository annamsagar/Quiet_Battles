import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/common/PageTransition';
import { CartItem } from '../components/cart/CartItem';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { EmptyState } from '../components/common/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ShoppingBag, ArrowRight, ShieldAlert, ArrowLeft, Trash2, CheckCircle2 } from 'lucide-react';

export const Cart = () => {
  useDocumentTitle('Shopping Bag');
  const {
    cartItems,
    totalItemsCount,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const shippingFee = cartSubtotal > 2000 || cartSubtotal === 0 ? 0 : 150;
  const grandTotal = cartSubtotal + shippingFee;

  return (
    <PageTransition className="pt-32 pb-24 sm:pt-40 sm:pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Cart Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222222] pb-8 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono block mb-2">
              BAG REVIEW
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F1EA]">
              YOUR SHOPPING BAG
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#A7A29B]">
            <span>{totalItemsCount} {totalItemsCount === 1 ? 'ITEM' : 'ITEMS'} RESERVED</span>
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-neutral-500 hover:text-rose-400 transition-colors uppercase flex items-center gap-1"
              >
                <Trash2 size={13} />
                <span>CLEAR ALL</span>
              </button>
            )}
          </div>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8">
              <div className="divide-y divide-[#222222]">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.key}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              {/* Continue Shopping Action */}
              <div className="pt-8">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest-xl text-[#A7A29B] hover:text-[#A88B65] transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>CONTINUE BROWSING THE SHOP</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-4 bg-[#151515] border border-[#2B2B2B] p-6 sm:p-8 space-y-6 lg:sticky lg:top-28">
              <h3 className="text-xs uppercase tracking-widest-xl font-mono text-[#F5F1EA] pb-4 border-b border-[#222222]">
                ORDER SUMMARY
              </h3>

              <div className="space-y-3 text-sm text-[#A7A29B] font-mono">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-[#F5F1EA]">{formatCurrency(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-[#F5F1EA]">
                    {shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Taxes (GST Included)</span>
                  <span>₹0</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#222222] flex justify-between items-baseline font-mono">
                <span className="text-xs uppercase tracking-widest text-[#F5F1EA]">TOTAL</span>
                <span className="text-2xl text-[#F5F1EA] font-semibold">
                  {formatCurrency(grandTotal)}
                </span>
              </div>

              {/* Checkout Trigger */}
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-4 bg-[#F5F1EA] text-[#0A0A0A] hover:bg-[#A88B65] hover:text-white text-xs uppercase tracking-widest-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={14} />
              </button>

              <div className="p-3 bg-[#0A0A0A] border border-[#2B2B2B] text-[11px] font-mono text-[#A7A29B] leading-relaxed">
                <span className="text-[#A88B65] font-bold block mb-1">PROTOTYPE NOTICE</span>
                All cart calculations, item additions, and selections are fully functional and stored locally in your browser.
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            title="Your bag is silent"
            description="You have not added any pieces from our collections to your armor bag yet."
            actionText="Explore The Shop"
            actionLink="/shop"
            icon={ShoppingBag}
          />
        )}
      </div>

      {/* Demo Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#151515] border border-[#A88B65] max-w-md w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-3 text-[#A88B65] mb-4">
              <ShieldAlert size={28} />
              <h3 className="font-serif text-2xl text-[#F5F1EA]">
                Assessment Notice
              </h3>
            </div>

            <div className="space-y-4 text-sm text-[#A7A29B] leading-relaxed font-light mb-6">
              <p className="text-[#F5F1EA] font-mono text-xs uppercase bg-[#0A0A0A] p-3 border border-[#333333]">
                "Checkout functionality is not available in this assessment prototype."
              </p>
              <p>
                In accordance with the assessment requirements, real payment gateways and backend processing are intentionally omitted. Your cart state of <strong>{totalItemsCount} items</strong> ({formatCurrency(grandTotal)}) remains persisted in LocalStorage.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                className="w-full py-3 bg-[#F5F1EA] text-black text-xs uppercase tracking-widest font-mono font-semibold hover:bg-[#A88B65] hover:text-white transition-colors"
              >
                Understood, Return
              </button>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
};
export default Cart;
