import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageTransition } from '../components/common/PageTransition';
import { EditorialImage } from '../components/common/EditorialImage';
import { SeriesIntroduction } from '../components/archive/SeriesIntroduction';
import { ChapterGrid } from '../components/archive/ChapterGrid';
import { useContent } from '../context/ContentContext';
import { EmptyState } from '../components/common/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const SeriesDetail = () => {
  const { seriesSlug = 'series-01' } = useParams();
  const { getSeriesBySlug, getChaptersBySeries } = useContent();

  const series = getSeriesBySlug(seriesSlug);
  const chapters = getChaptersBySeries(seriesSlug);

  useDocumentTitle(series ? series.fullTitle || series.title : 'Series Detail');

  if (!series) {
    return (
      <div className="pt-40 pb-20">
        <EmptyState
          title="Series Not Found"
          description={`We could not locate any series matching the path "${seriesSlug}".`}
          actionText="Back to Archive"
          actionLink="/archive"
        />
      </div>
    );
  }

  return (
    <PageTransition className="pt-24 sm:pt-28 pb-24 sm:pb-32 bg-[#0A0A0A]">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 border-b border-[#222222] mb-8 sm:mb-12">
        <div className="flex items-center gap-3 text-xs font-mono text-[#A7A29B] uppercase tracking-wider">
          <Link to="/archive" className="hover:text-[#A88B65] flex items-center gap-1.5 transition-colors">
            <ArrowLeft size={13} />
            <span>Archive</span>
          </Link>
          <span>/</span>
          <span className="text-[#F5F1EA]">Series {series.number}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16 sm:space-y-24">
        {/* SECTION 1 – SERIES HERO */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#151515] border border-[#2B2B2B] overflow-hidden">
          <EditorialImage
            src={series.coverImage}
            alt={series.title}
            aspectRatio="aspect-full w-full h-full"
            overlay
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

          {/* Hero Overlay Details */}
          <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 max-w-3xl z-10 space-y-3 sm:space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono block"
            >
              SERIES {series.number}
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#F5F1EA] tracking-wide uppercase leading-none"
            >
              {series.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-lg sm:text-2xl text-[#A7A29B] italic font-light"
            >
              "{series.supportingStatement || 'Strength does not always need to be loud.'}"
            </motion.p>
          </div>
        </div>

        {/* SECTION 2 – SERIES INTRODUCTION */}
        <SeriesIntroduction series={series} />

        {/* SECTION 3 – CHAPTER COLLECTION (All five chapters in asymmetric grid) */}
        <ChapterGrid chapters={chapters} seriesSlug={seriesSlug} />

        {/* SECTION 4 – CLOSING STATEMENT */}
        <section className="py-20 sm:py-28 text-center bg-[#151515] border border-[#2B2B2B] p-8 sm:p-14 space-y-6 shadow-2xl">
          <span className="text-xs uppercase font-mono tracking-widest-2xl text-[#A88B65]">
            INAUGURAL COLLECTION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F5F1EA] tracking-wide uppercase">
            "THE STORY CONTINUES."
          </h2>
          <p className="text-sm sm:text-base text-[#A7A29B] font-light max-w-lg mx-auto leading-relaxed">
            Five chronicles exploring the silence, weight, resilience, rebuilding, and armor of the human soul.
          </p>
          <div className="pt-4">
            <Link
              to="/archive"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#F5F1EA] text-[#0A0A0A] hover:bg-[#A88B65] hover:text-white text-xs uppercase tracking-widest-xl font-semibold transition-all duration-300 shadow-xl group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>RETURN TO THE ARCHIVE</span>
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};
export default SeriesDetail;
