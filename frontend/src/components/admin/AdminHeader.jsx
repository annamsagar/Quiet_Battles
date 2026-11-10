import React from 'react';
import { Menu, ExternalLink, Calendar, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

export const AdminHeader = ({ onToggleSidebar, title }) => {
  const { currentUser } = useAdmin();
  const location = useLocation();

  // Deduce header title dynamically if not explicitly provided
  const headerTitle =
    title ||
    (location.pathname.includes('/admin/series')
      ? 'SERIES MANAGEMENT'
      : location.pathname.includes('/admin/chapters')
      ? 'CHAPTER MANAGEMENT'
      : location.pathname.includes('/admin/products')
      ? 'PRODUCT INVENTORY'
      : 'DASHBOARD OVERVIEW');

  // Current formatted date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 bg-[#0E0E0E]/95 backdrop-blur-md border-b border-[#222222] px-6 py-3.5 flex items-center justify-between">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-neutral-400 hover:text-white"
          aria-label="Toggle Navigation Drawer"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="font-serif text-xl sm:text-2xl text-[#F5F1EA] font-light">
            {headerTitle}
          </h1>
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-[#A88B65]">
            <Calendar size={11} />
            <span>{currentDate}</span>
          </div>
        </div>
      </div>

      {/* Right: Date, Profile, Quick Actions, View Store */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Quick Add Menu */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/admin/products"
            className="p-1.5 text-[11px] font-mono uppercase bg-[#1A1A1A] hover:bg-[#252525] text-[#A7A29B] hover:text-[#F5F1EA] border border-[#333333] rounded transition-colors flex items-center gap-1"
            title="Create Product"
          >
            <Plus size={12} className="text-[#A88B65]" />
            <span>Product</span>
          </Link>
          <Link
            to="/admin/chapters"
            className="p-1.5 text-[11px] font-mono uppercase bg-[#1A1A1A] hover:bg-[#252525] text-[#A7A29B] hover:text-[#F5F1EA] border border-[#333333] rounded transition-colors flex items-center gap-1"
            title="Create Chapter"
          >
            <Plus size={12} className="text-[#A88B65]" />
            <span>Chapter</span>
          </Link>
        </div>

        {/* Profile Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#151515] border border-[#2B2B2B] rounded text-xs font-mono">
          <div className="w-5 h-5 rounded-full bg-[#A88B65] text-black font-bold flex items-center justify-center text-[10px]">
            {currentUser?.name ? currentUser.name[0] : 'A'}
          </div>
          <div className="text-left">
            <span className="text-[#F5F1EA] block text-[11px] font-semibold leading-none">
              {currentUser?.name || 'Editorial Lead'}
            </span>
            <span className="text-[9px] text-[#A88B65] leading-none block mt-0.5">
              {currentUser?.role || 'Creative Director'}
            </span>
          </div>
        </div>

        {/* View Live Store */}
        <Link
          to="/"
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 text-xs uppercase tracking-wider font-mono bg-[#1A1A1A] text-[#F5F1EA] hover:text-[#A88B65] border border-[#333333] flex items-center gap-1.5 transition-colors"
          title="Open public website in new tab"
        >
          <span>VIEW SITE</span>
          <ExternalLink size={12} />
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
