import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageTransition } from '../components/common/PageTransition';
import { ChapterCard } from '../components/archive/ChapterCard';
import { EditorialImage } from '../components/common/EditorialImage';
import { useContent } from '../context/ContentContext';
import { EmptyState } from '../components/common/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ArrowLeft, BookOpen, Layers, ShieldCheck } from 'lucide-react';
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
    <PageTransition className="pt-24 sm:pt-28 pb-24 sm:pb-32">
      {/* Editorial Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 border-b border-[#222222] mb-8">
        <div className="flex items-center gap-3 text-xs font-mono text-[#A7A29B] uppercase tracking-wider">
          <Link to="/archive" className="hover:text-[#A88B65] flex items-center gap-1.5 transition-colors">
            <ArrowLeft size={13} />
            <span>Archive</span>
          </Link>
          <span>/</span>
          <span className="text-[#F5F1EA]">Series {series.number}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Full-Width Cinematic Series Cover Hero */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#151515] border border-[#2B2B2B] overflow-hidden mb-12 sm:mb-16">
          <EditorialImage
            src={series.coverImage}
            alt={series.title}
            aspectRatio="aspect-full w-full h-full"
            overlay
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

          {/* Hero Overlay Details */}
          <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 max-w-3xl z-10 space-y-3">
            <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono">
              SERIES {series.number} EDITION
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#F5F1EA] tracking-wide">
              {series.fullTitle || series.title}
            </h1>
          </div>
        </div>

        {/* Editorial Introduction & Series Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-16 border-b border-[#222222] mb-16">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest-xl text-[#A88B65] font-mono">
              CURATORIAL STATEMENT
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#F5F1EA] leading-snug">
              "An exploration of resilience, softness and strength. Designed for those who carry more than they reveal."
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-[#A7A29B] font-light text-base sm:text-lg leading-relaxed">
            <p>
              {series.extendedDescription || series.description}
            </p>
            <p>
              Divided across five sequential narrative chapters, Series 01 follows the progression of private vulnerability evolving into quiet structural fortitude. Each chapter examines a distinct psychological state, accompanied by architectural tailoring.
            </p>

            <div className="pt-2 flex flex-wrap gap-6 text-xs font-mono uppercase text-[#F5F1EA]">
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-[#A88B65]" />
                <span>{chapters.length} Chronicles Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#A88B65]" />
                <span>Heavyweight Construction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Five Chapter Cards Section */}
        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222222] pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono block mb-1">
                SEQUENTIAL CHAPTERS
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-light text-[#F5F1EA]">
                EXPLORE THE CHRONICLES
              </h3>
            </div>
            <p className="text-xs text-[#A7A29B] font-mono uppercase">
              SELECT A CHAPTER TO BEGIN READING
            </p>
          </div>

          {chapters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {chapters.map((chapter, index) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  seriesSlug={seriesSlug}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Chapters Available"
              description="No chapters have been published for this series yet."
            />
          )}
        </div>
      </div>
    </PageTransition>
  );
};
export default SeriesDetail;
