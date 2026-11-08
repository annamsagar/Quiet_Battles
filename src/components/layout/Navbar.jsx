import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Shield, Lock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAdmin } from '../../context/AdminContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount } = useCart();
  const { isAuthenticated } = useAdmin();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    `text-xs uppercase tracking-widest-xl font-medium transition-colors duration-300 relative py-1 ${
      isActive
        ? 'text-[#F5F1EA] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#A88B65]'
        : 'text-[#A7A29B] hover:text-[#F5F1EA]'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `text-lg font-serif tracking-wider uppercase transition-colors duration-300 py-3 flex items-center justify-between border-b border-[#222222] ${
      isActive ? 'text-[#A88B65]' : 'text-[#F5F1EA] hover:text-[#A88B65]'
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#222222] py-4 shadow-2xl'
            : isHomePage
            ? 'bg-transparent py-6 border-b border-white/5'
            : 'bg-[#0A0A0A] py-5 border-b border-[#222222]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* LEFT: BRAND MONOGRAM & NAME */}
          <Link
            to="/"
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="QUIET BATTLES™ Home"
          >
            <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.2em] text-[#F5F1EA] group-hover:text-[#A88B65] transition-colors duration-300 uppercase">
              QUIET BATTLES<span className="text-[10px] align-top text-[#A88B65] ml-0.5">™</span>
            </span>
          </Link>

          {/* CENTER: DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-10">
            <NavLink to="/" className={navLinkClass}>
              HOME
            </NavLink>
            <NavLink to="/archive" className={navLinkClass}>
              ARCHIVE
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              ABOUT
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              CONTACT
            </NavLink>
          </nav>

          {/* RIGHT: SHOP, CART & ADMIN BADGE */}
          <div className="flex items-center gap-6">
            <NavLink
              to="/products/gentle-armor"
              className={({ isActive }) =>
                `hidden sm:inline-block text-xs uppercase tracking-widest-xl font-medium transition-colors duration-300 ${
                  isActive ? 'text-[#F5F1EA]' : 'text-[#A7A29B] hover:text-[#F5F1EA]'
                }`
              }
            >
              SHOP
            </NavLink>

            {/* Shopping Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 text-[#F5F1EA] hover:text-[#A88B65] transition-colors duration-300 flex items-center gap-2 group"
              aria-label={`Shopping cart with ${totalItemsCount} items`}
            >
              <div className="relative">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#A88B65] text-[#0A0A0A] text-[10px] font-bold font-mono w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-xs uppercase tracking-widest-xl font-medium text-[#A7A29B] group-hover:text-[#F5F1EA]">
                CART
              </span>
            </Link>

            {/* Admin quick indicator if logged in */}
            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                title="Admin CMS Active"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-widest font-mono text-[#A88B65] border border-[#A88B65]/40 rounded hover:bg-[#A88B65]/10 transition-colors"
              >
                <Shield size={12} />
                <span>CMS</span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#F5F1EA] hover:text-[#A88B65] transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SLIDE-OUT NAVIGATION DRAWER */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#0E0E0E] z-50 p-8 flex flex-col justify-between border-l border-[#222222] transform transition-transform duration-500 ease-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#222222] mb-8">
            <span className="font-serif text-lg tracking-[0.2em] text-[#F5F1EA] uppercase">
              QUIET BATTLES™
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 text-[#A7A29B] hover:text-white"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            <NavLink to="/" className={mobileNavLinkClass}>
              <span>01 / HOME</span>
            </NavLink>
            <NavLink to="/archive" className={mobileNavLinkClass}>
              <span>02 / ARCHIVE</span>
            </NavLink>
            <NavLink to="/archive/series-01" className={mobileNavLinkClass}>
              <span>03 / SERIES 01</span>
            </NavLink>
            <NavLink to="/products/gentle-armor" className={mobileNavLinkClass}>
              <span>04 / SHOP COLLECTION</span>
            </NavLink>
            <NavLink to="/about" className={mobileNavLinkClass}>
              <span>05 / ABOUT</span>
            </NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass}>
              <span>06 / CONTACT</span>
            </NavLink>
            <NavLink to="/cart" className={mobileNavLinkClass}>
              <span>07 / SHOPPING CART</span>
              {totalItemsCount > 0 && (
                <span className="text-xs bg-[#A88B65] text-black px-2 py-0.5 rounded font-mono">
                  {totalItemsCount}
                </span>
              )}
            </NavLink>
          </nav>
        </div>

        {/* Drawer Footer */}
        <div className="pt-6 border-t border-[#222222]">
          <p className="text-xs text-[#A7A29B] tracking-widest uppercase mb-4">
            WEAR YOUR BATTLES.
          </p>
          <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span>© 2026 QUIET BATTLES</span>
            <Link
              to="/admin/login"
              className="text-[#A88B65] hover:underline flex items-center gap-1"
            >
              <Lock size={12} />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
