import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Instagram, Youtube, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#222222] text-[#F5F1EA] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#222222]">
          {/* Brand Manifesto Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-serif text-3xl font-light tracking-[0.2em] uppercase">
                QUIET BATTLES<span className="text-xs text-[#A88B65] ml-1">™</span>
              </span>
              <p className="text-xs uppercase tracking-widest-xl text-[#A88B65] font-medium">
                WEAR YOUR BATTLES.
              </p>
            </div>
            <p className="text-sm text-[#A7A29B] leading-relaxed max-w-md font-light">
              QUIET BATTLES represents inner strength, personal struggles, silent achievements, emotional resilience and individual identity. An international luxury streetwear imprint dedicated to those who fight without an audience.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#151515] border border-[#333333] text-[11px] font-mono text-[#A7A29B]">
                <Sparkles size={12} className="text-[#A88B65]" />
                SERIES 01: THE GENTLE ARMOR™ AVAILABLE
              </span>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest-xl text-[#F5F1EA] font-semibold">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase text-[#A7A29B]">
              <li>
                <Link to="/" className="hover:text-[#A88B65] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-[#A88B65] transition-colors">
                  The Archive
                </Link>
              </li>
              <li>
                <Link to="/archive/series-01" className="hover:text-[#A88B65] transition-colors">
                  Series 01 – The Gentle Armor
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#A88B65] transition-colors">
                  The Shop (Collections)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#A88B65] transition-colors">
                  About The Brand
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#A88B65] transition-colors">
                  Contact / Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Editorial Information */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest-xl text-[#F5F1EA] font-semibold">
              EDITIONS
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase text-[#A7A29B]">
              <li>
                <Link to="/archive/series-01/chapter-01" className="hover:text-[#A88B65] transition-colors">
                  Ch. 01 – The Silence
                </Link>
              </li>
              <li>
                <Link to="/archive/series-01/chapter-02" className="hover:text-[#A88B65] transition-colors">
                  Ch. 02 – The Weight
                </Link>
              </li>
              <li>
                <Link to="/archive/series-01/chapter-03" className="hover:text-[#A88B65] transition-colors">
                  Ch. 03 – The Resilience
                </Link>
              </li>
              <li>
                <Link to="/archive/series-01/chapter-04" className="hover:text-[#A88B65] transition-colors">
                  Ch. 04 – The Rebuilding
                </Link>
              </li>
              <li>
                <Link to="/archive/series-01/chapter-05" className="hover:text-[#A88B65] transition-colors">
                  Ch. 05 – The Gentle Armor
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Admin */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest-xl text-[#F5F1EA] font-semibold">
              COMMUNITY
            </h4>
            <div className="flex flex-col space-y-2.5 text-xs text-[#A7A29B]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#A88B65] transition-colors"
              >
                <Instagram size={14} />
                <span>Instagram</span>
                <ArrowUpRight size={12} className="opacity-60" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#A88B65] transition-colors"
              >
                <Youtube size={14} />
                <span>YouTube</span>
                <ArrowUpRight size={12} className="opacity-60" />
              </a>
              <div className="pt-4 border-t border-[#222222]">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs text-[#A88B65] hover:text-[#F5F1EA] transition-colors"
                >
                  <ShieldCheck size={14} />
                  <span>Admin CMS Demo</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Assessment note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] font-mono gap-4">
          <p>© 2026 QUIET BATTLES™. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Pholus Globos Facility Service Technical Assessment</span>
            <span className="hidden md:inline">•</span>
            <span className="text-[#A88B65]">Frontend Assessment Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

