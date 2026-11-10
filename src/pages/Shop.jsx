import React, { useState, useMemo } from 'react';
import { PageTransition } from '../components/common/PageTransition';
import { ProductCard } from '../components/product/ProductCard';
import { useContent } from '../context/ContentContext';
import { EmptyState } from '../components/common/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Search, Filter, Sparkles, SlidersHorizontal, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Shop = () => {
  useDocumentTitle('The Shop – Luxury Garment Catalog');
  const { productsList, seriesList } = useContent();

  const [selectedSeries, setSelectedSeries] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Derive unique categories from products list
  const categories = useMemo(() => {
    const set = new Set();
    productsList.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [productsList]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return productsList
      .filter((p) => {
        // Only published products
        const isPublished = p.status === 'published' || p.published !== false;
        if (!isPublished) return false;

        // Series / Theme filter
        const matchesSeries =
          selectedSeries === 'all' ||
          p.seriesSlug === selectedSeries ||
          String(p.seriesId) === String(selectedSeries) ||
          p.collection?.toLowerCase().includes(selectedSeries.toLowerCase());

        // Category filter
        const matchesCategory =
          selectedCategory === 'all' ||
          p.category?.toLowerCase() === selectedCategory.toLowerCase();

        // Search query
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          p.name?.toLowerCase().includes(query) ||
          p.shortName?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query) ||
          p.collection?.toLowerCase().includes(query);

        return matchesSeries && matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
        if (sortBy === 'name-asc') return (a.name || '').localeCompare(b.name || '');
        // Default: featured first, then newest
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.id || 0) - (a.id || 0);
      });
  }, [productsList, selectedSeries, selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedSeries('all');
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <PageTransition className="pt-32 pb-24 sm:pt-40 sm:pb-32 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16 sm:space-y-20">
        {/* ================= SECTION 1: EDITORIAL SHOP HERO ================= */}
        <section className="border-b border-[#222222] pb-12 sm:pb-16 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono flex items-center gap-2">
              <Sparkles size={13} />
              <span>THE COLLECTION CATALOG</span>
            </span>
            <span className="text-xs font-mono text-[#A7A29B] uppercase tracking-wider">
              INVENTORY ARCHIVE • {productsList.length} GARMENTS FORGED
            </span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F1EA] tracking-wide uppercase leading-tight">
              WEAR YOUR <span className="italic font-normal text-[#A88B65]">BATTLES.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#A7A29B] font-light leading-relaxed">
              Every garment is physical armor sculpted for quiet resilience. Crafted from heavyweight natural fibers, structural silhouettes, and meticulous bespoke detailing—designed for those who fight without an audience.
            </p>
          </div>
        </section>

        {/* ================= SECTION 2: THEMATIC CONTROLS & FILTER BAR ================= */}
        <section className="space-y-6 bg-[#111111] border border-[#222222] p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7A29B]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection by garment name, silhouette, or fabric..."
                className="w-full pl-11 pr-4 py-3 bg-[#0A0A0A] border border-[#2B2B2B] focus:border-[#A88B65] text-[#F5F1EA] placeholder-[#666666] text-xs font-mono uppercase tracking-wider transition-colors focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#A7A29B] hover:text-[#F5F1EA]"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#A7A29B] uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                <SlidersHorizontal size={13} />
                <span>SORT:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0A0A0A] border border-[#2B2B2B] text-[#F5F1EA] text-xs font-mono uppercase px-4 py-3 tracking-wider focus:outline-none focus:border-[#A88B65]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Series & Category Pills */}
          <div className="pt-4 border-t border-[#222222] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Series / Theme Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-[#A7A29B] uppercase tracking-wider mr-1">
                THEME:
              </span>
              <button
                onClick={() => setSelectedSeries('all')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  selectedSeries === 'all'
                    ? 'bg-[#F5F1EA] text-[#0A0A0A] font-semibold'
                    : 'bg-[#151515] text-[#A7A29B] hover:text-[#F5F1EA] border border-[#2B2B2B]'
                }`}
              >
                ALL THEMES
              </button>
              {seriesList.map((s) => (
                <button
                  key={s.id || s.slug}
                  onClick={() => setSelectedSeries(s.slug)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                    selectedSeries === s.slug
                      ? 'bg-[#F5F1EA] text-[#0A0A0A] font-semibold'
                      : 'bg-[#151515] text-[#A7A29B] hover:text-[#F5F1EA] border border-[#2B2B2B]'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-[#A7A29B] uppercase tracking-wider mr-1">
                  CATEGORY:
                </span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === 'all'
                      ? 'bg-[#A88B65] text-white font-semibold'
                      : 'bg-[#151515] text-[#A7A29B] hover:text-[#F5F1EA] border border-[#2B2B2B]'
                  }`}
                >
                  ALL
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                      selectedCategory === cat
                        ? 'bg-[#A88B65] text-white font-semibold'
                        : 'bg-[#151515] text-[#A7A29B] hover:text-[#F5F1EA] border border-[#2B2B2B]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ================= SECTION 3: PRODUCT CATALOG GRID ================= */}
        <section className="space-y-8">
          <div className="flex items-center justify-between text-xs font-mono text-[#A7A29B] uppercase tracking-wider">
            <span>
              DISPLAYING {filteredProducts.length} {filteredProducts.length === 1 ? 'PIECE' : 'PIECES'}
            </span>
            {(selectedSeries !== 'all' || selectedCategory !== 'all' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-[#A88B65] hover:underline"
              >
                RESET ALL FILTERS
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id || product.slug} product={product} index={idx} />
              ))}
            </div>
          ) : (
            <div className="py-20 bg-[#151515] border border-[#2B2B2B]">
              <EmptyState
                title="NO GARMENTS MATCH YOUR CRITERIA"
                description={`We could not locate any pieces matching your current filters. Try refining your search query or selecting "All Themes".`}
                actionText="RESET FILTERS"
                onAction={handleResetFilters}
              />
            </div>
          )}
        </section>

        {/* ================= SECTION 4: THEMATIC ARCHIVE CONNECTION ================= */}
        <section className="py-16 sm:py-24 bg-[#151515] border border-[#2B2B2B] p-8 sm:p-14 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#222222] border border-[#333333] text-[11px] font-mono text-[#A88B65] uppercase">
            <ShieldCheck size={13} />
            <span>THE PHILOSOPHY OF GENTLE ARMOR</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F1EA] tracking-wide uppercase max-w-2xl mx-auto">
            "EVERY SCAR HOLDS A STORY. EVERY SILENCE HOLDS A STRENGTH."
          </h2>

          <p className="text-sm sm:text-base text-[#A7A29B] font-light max-w-xl mx-auto leading-relaxed">
            Every garment in our catalog is linked to a literary chapter in The Archive. Discover the chronicle behind the cut.
          </p>

          <div className="pt-4">
            <Link
              to="/archive"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#F5F1EA] text-[#0A0A0A] hover:bg-[#A88B65] hover:text-white text-xs uppercase tracking-widest-xl font-semibold transition-all duration-300 shadow-xl group"
            >
              <span>EXPLORE THE STORY ARCHIVE</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Shop;
