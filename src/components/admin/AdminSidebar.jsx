import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  BookOpen,
  Shirt,
  ExternalLink,
  LogOut,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useContent } from '../../context/ContentContext';

export const AdminSidebar = ({ isOpen, onClose }) => {
  const { logout, currentUser } = useAdmin();
  const { resetToDefaultData } = useContent();

  const handleReset = () => {
    if (window.confirm('Reset all demo content (Series, Chapters, Products) to the default brand baseline?')) {
      resetToDefaultData();
      alert('Content reset to default baseline.');
    }
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest font-mono rounded transition-colors ${
      isActive
        ? 'bg-[#A88B65] text-black font-semibold'
        : 'text-[#A7A29B] hover:text-[#F5F1EA] hover:bg-[#222222]'
    }`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#111111] border-r border-[#222222] flex flex-col justify-between p-6 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          {/* Brand & Admin Badge */}
          <div className="border-b border-[#222222] pb-6">
            <Link to="/" className="block">
              <span className="font-serif text-lg tracking-[0.2em] text-[#F5F1EA] uppercase">
                QUIET BATTLES<span className="text-xs text-[#A88B65] ml-0.5">™</span>
              </span>
            </Link>
            <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-[#A88B65]">
              <ShieldCheck size={13} />
              <span>EDITORIAL CMS ENGINE</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <NavLink to="/admin/dashboard" className={navClass} onClick={onClose}>
              <LayoutDashboard size={16} />
              <span>DASHBOARD</span>
            </NavLink>
            <NavLink to="/admin/series" className={navClass} onClick={onClose}>
              <Layers size={16} />
              <span>SERIES</span>
            </NavLink>
            <NavLink to="/admin/chapters" className={navClass} onClick={onClose}>
              <BookOpen size={16} />
              <span>CHAPTERS</span>
            </NavLink>
            <NavLink to="/admin/products" className={navClass} onClick={onClose}>
              <Shirt size={16} />
              <span>PRODUCTS</span>
            </NavLink>
          </nav>

          {/* Quick External Link */}
          <div className="pt-4 border-t border-[#222222]">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-4 py-2.5 text-[11px] font-mono text-[#A7A29B] hover:text-[#A88B65] bg-[#161616] border border-[#2B2B2B] rounded transition-colors"
            >
              <span>VIEW LIVE STORE</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Footer info & Logout */}
        <div className="pt-6 border-t border-[#222222] space-y-4">
          <button
            type="button"
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 hover:text-amber-400 border border-[#2B2B2B] hover:border-amber-500/40 transition-colors"
            title="Restore baseline sample data"
          >
            <RotateCcw size={12} />
            <span>RESET DEMO DATA</span>
          </button>

          <div className="text-[11px] font-mono text-[#777777] truncate">
            {currentUser?.email || 'admin@quietbattles.demo'}
          </div>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1F1F1F] hover:bg-rose-950/40 text-neutral-300 hover:text-rose-300 text-xs font-mono uppercase tracking-wider border border-[#333333] transition-colors"
          >
            <LogOut size={13} />
            <span>SIGN OUT</span>
          </button>
        </div>
      </aside>
    </>
  );
};
