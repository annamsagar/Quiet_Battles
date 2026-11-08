import React from 'react';
import { Menu, ShieldAlert, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

export const AdminHeader = ({ onToggleSidebar, title = 'Editorial Management' }) => {
  const { currentUser } = useAdmin();

  return (
    <header className="sticky top-0 z-30 bg-[#0E0E0E]/95 backdrop-blur-md border-b border-[#222222] px-6 py-4 flex items-center justify-between">
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
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] border border-[#333333] text-[11px] font-mono text-[#A88B65]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>FRONTEND CMS ACTIVE</span>
        </div>

        <Link
          to="/"
          className="px-3.5 py-1.5 text-xs uppercase tracking-widest font-mono bg-[#1A1A1A] text-[#F5F1EA] hover:text-[#A88B65] border border-[#333333] flex items-center gap-1.5 transition-colors"
        >
          <span>VIEW SITE</span>
          <ExternalLink size={12} />
        </Link>
      </div>
    </header>
  );
};
