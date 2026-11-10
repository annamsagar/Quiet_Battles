import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useCart } from '../context/CartContext';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PublicLayout = () => {
  const { pathname } = useLocation();
  const { toastMessage } = useCart();

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F1EA] selection:bg-[#A88B65] selection:text-black">
      <Navbar />

      {/* Main Outlet with appropriate padding offset for fixed header */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />

      {/* Toast Notification for Cart Actions */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className="bg-[#151515] border border-[#A88B65]/60 text-[#F5F1EA] px-5 py-3 shadow-2xl flex items-center gap-3 backdrop-blur-md">
            <CheckCircle2 size={18} className="text-[#A88B65] flex-shrink-0" />
            <p className="text-xs uppercase tracking-wider font-mono">{toastMessage}</p>
            <Link
              to="/cart"
              className="ml-2 text-xs uppercase tracking-widest text-[#A88B65] underline hover:text-white flex items-center gap-1 font-semibold"
            >
              <ShoppingBag size={12} />
              View
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

