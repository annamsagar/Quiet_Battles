import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/common/PageTransition';
import { ArchiveHero } from '../components/archive/ArchiveHero';
import { SeriesFeatureCard } from '../components/archive/SeriesFeatureCard';
import { SeriesCard } from '../components/archive/SeriesCard';
import { useContent } from '../context/ContentContext';
import { EmptyState } from '../components/common/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Search, ArrowRight, Shirt } from 'lucide-react';

export const Archive = () => {
  useDocumentTitle('The Archive');
  const { seriesList } = useContent();

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Primary featured series (Series 01)
  const featuredSeries = seriesList.find((s) => s.slug === 'series-01') || seriesList[0];
  const otherSeries = seriesList.filter((s) => s.id !== featuredSeries?.id);

  const filteredOtherSeries = otherSeries.filter((series) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'published'
        ? series.status === 'published'
        : series.status === 'draft';

    const matchesSearch =
      searchQuery.trim() === '' ||
      series.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      series.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <PageTransition className="pt-32 pb-24 sm:pt-40 sm:pb-32 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* SECTION 1: ARCHIVE HERO */}
        <ArchiveHero />

        {/* SECTION 2: FEATURED SERIES (SERIES 01) */}
        <div className="mb-20 sm:mb-28">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono">
              FEATURED SERIES
            </span>
            <span className="text-xs font-mono text-neutral-500 uppercase">
              INAUGURAL RELEASE
            </span>
          </div>

          {featuredSeries && <SeriesFeatureCard series={featuredSeries} />}
        </div>

        {/* SECTION 3: OTHER ARCHIVAL EDITIONS & FILTER CONTROLS */}
        {otherSeries.length > 0 && (
          <div className="space-y-10 pt-12 border-t border-[#222222]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono block mb-1">
                  COLLECTION CHRONOLOGY
                </span>
                <h3 className="font-serif text-3xl font-light text-[#F5F1EA]">
                  ADDITIONAL EDITIONS
                </h3>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center border border-[#333333] bg-[#151515] p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1.5 transition-colors ${
                      filter === 'all' ? 'bg-[#A88B65] text-black font-semibold' : 'text-[#A7A29B]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('published')}
                    className={`px-3 py-1.5 transition-colors ${
                      filter === 'published' ? 'bg-[#A88B65] text-black font-semibold' : 'text-[#A7A29B]'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('draft')}
                    className={`px-3 py-1.5 transition-colors ${
                      filter === 'draft' ? 'bg-[#A88B65] text-black font-semibold' : 'text-[#A7A29B]'
                    }`}
                  >
                    Upcoming
                  </button>
                </div>

                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search editions..."
                    className="bg-[#151515] border border-[#333333] focus:border-[#A88B65] pl-8 pr-3 py-1.5 text-xs font-mono text-[#F5F1EA] outline-none"
                  />
                </div>
              </div>
            </div>

            {filteredOtherSeries.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {filteredOtherSeries.map((series, idx) => (
                  <SeriesCard key={series.id} series={series} index={idx} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No matching series"
                description="No additional editions match your filter criteria."
              />
            )}
          </div>
        )}

        {/* SECTION 4: THE SHOP CALLOUT */}
        <div className="pt-16 border-t border-[#222222]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 bg-[#111111] border border-[#222222]">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest-2xl text-[#A88B65] flex items-center justify-center sm:justify-start gap-1.5">
                <Shirt size={12} />
                <span>ATELIER PHYSICAL GARMENTS</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F1EA]">
                LOOKING FOR THE PHYSICAL COLLECTION?
              </h3>
              <p className="text-xs sm:text-sm text-[#A7A29B] font-light max-w-xl">
                Every literary edition in The Archive gives rise to an architectural garment collection. Browse all pieces in The Shop.
              </p>
            </div>
            <Link
              to="/shop"
              className="px-6 py-3.5 bg-[#F5F1EA] text-[#0A0A0A] hover:bg-[#A88B65] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shadow-lg group"
            >
              <span>VISIT THE SHOP</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
export default Archive;
