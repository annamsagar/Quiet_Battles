import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageTransition } from '../components/common/PageTransition';
import { EditorialImage } from '../components/common/EditorialImage';
import { EditorialStorySection } from '../components/archive/EditorialStorySection';
import { RelatedProductSection } from '../components/archive/RelatedProductSection';
import { ChapterNavigation } from '../components/archive/ChapterNavigation';
import { useContent } from '../context/ContentContext';
import { EmptyState } from '../components/common/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const ChapterDetail = () => {
  const { seriesSlug = 'series-01', chapterSlug = 'the-silence' } = useParams();
  const {
    getChapterBySlug,
    getChaptersBySeries,
    getSeriesBySlug,
    getProductBySlug,
  } = useContent();

  const chapter = getChapterBySlug(seriesSlug, chapterSlug);
  const series = getSeriesBySlug(seriesSlug);
  const allChapters = getChaptersBySeries(seriesSlug);

  useDocumentTitle(
    chapter ? `Chapter ${chapter.number} – ${chapter.title}` : 'Chapter Story'
  );

  if (!chapter) {
    return (
      <div className="pt-40 pb-20 bg-[#0A0A0A]">
        <EmptyState
          title="Chapter Not Found"
          description={`The chapter "${chapterSlug}" could not be found under series "${seriesSlug}". It may be archived or unpublished.`}
          actionText="Return to Series"
          actionLink={`/archive/${seriesSlug}`}
        />
      </div>
    );
  }

  // Find index and previous / next chapters in sequence
  const currentIndex = allChapters.findIndex(
    (c) => c.slug === chapter.slug || c.id === chapter.id
  );
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  // Related product
  const relatedProduct = getProductBySlug(
    chapter.relatedProductSlug || 'gentle-armor'
  );

  return (
    <PageTransition className="pt-24 sm:pt-28 pb-24 sm:pb-32 bg-[#0A0A0A]">
      {/* Top Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 border-b border-[#222222] mb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-mono text-[#A7A29B] uppercase tracking-wider">
            <Link to="/archive" className="hover:text-[#A88B65] transition-colors">
              Archive
            </Link>
            <span>/</span>
            <Link
              to={`/archive/${seriesSlug}`}
              className="hover:text-[#A88B65] transition-colors"
            >
              {series ? series.title : 'Series 01'}
            </Link>
            <span>/</span>
            <span className="text-[#F5F1EA]">
              Chapter {chapter.number || '01'}
            </span>
          </div>

          <span className="text-xs font-mono text-[#A88B65]">
            CH. 0{chapter.number || currentIndex + 1} OF 0{allChapters.length}
          </span>
        </div>
      </div>

      <article className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* SECTION 1 – CHAPTER HERO */}
        <header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#151515] border border-[#333333] text-[11px] font-mono text-[#A88B65] uppercase tracking-widest"
          >
            <span>SERIES {series?.number || '01'} / CHAPTER {chapter.number}</span>
            <span>•</span>
            <span>{chapter.theme}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F1EA] tracking-wide uppercase leading-tight"
          >
            {chapter.title}
          </motion.h1>
        </header>

        {/* Cinematic Chapter Cover Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#151515] border border-[#2B2B2B] overflow-hidden mb-16 sm:mb-20 shadow-2xl"
        >
          <EditorialImage
            src={chapter.coverImage}
            alt={chapter.title}
            aspectRatio="aspect-full w-full h-full"
            overlay
          />
        </motion.div>

        {/* Opening Quote Banner */}
        {chapter.openingQuote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="my-14 sm:my-20 text-center max-w-3xl mx-auto"
          >
            <div className="w-12 h-[2px] bg-[#A88B65] mx-auto mb-8" />
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-light italic text-[#F5F1EA] leading-relaxed">
              "{chapter.openingQuote}"
            </blockquote>
            <div className="w-12 h-[2px] bg-[#A88B65] mx-auto mt-8" />
          </motion.div>
        )}

        {/* SECTIONS 2, 3, 4, 5, 6 – INTRODUCTION, FULL IMAGE, STORY, OVERSIZED QUOTE, BRAND CONNECTION */}
        <EditorialStorySection chapter={chapter} />

        {/* SECTION 7 – RELATED PRODUCT */}
        <RelatedProductSection product={relatedProduct} />

        {/* SECTION 8 – CHAPTER NAVIGATION */}
        <ChapterNavigation
          prevChapter={prevChapter}
          nextChapter={nextChapter}
          seriesSlug={seriesSlug}
          allChapters={allChapters}
          currentChapterSlug={chapter.slug}
        />
      </article>
    </PageTransition>
  );
};
export default ChapterDetail;
