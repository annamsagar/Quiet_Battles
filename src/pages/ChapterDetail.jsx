import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageTransition } from '../components/common/PageTransition';
import { EditorialImage } from '../components/common/EditorialImage';
import { useContent } from '../context/ContentContext';
import { EmptyState } from '../components/common/EmptyState';
import { formatCurrency } from '../utils/formatCurrency';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ChapterDetail = () => {
  const { seriesSlug = 'series-01', chapterSlug = 'chapter-01' } = useParams();
  const { getChapterBySlug, getAllChaptersForSeries, getSeriesBySlug, getProductBySlug } = useContent();

  const chapter = getChapterBySlug(seriesSlug, chapterSlug);
  const series = getSeriesBySlug(seriesSlug);
  const allChapters = getAllChaptersForSeries(seriesSlug);

  useDocumentTitle(chapter ? `Chapter ${chapter.number} – ${chapter.title}` : 'Chapter Story');

  if (!chapter) {
    return (
      <div className="pt-40 pb-20">
        <EmptyState
          title="Chapter Not Found"
          description={`The chapter "${chapterSlug}" could not be found under series "${seriesSlug}".`}
          actionText="Return to Series"
          actionLink={`/archive/${seriesSlug}`}
        />
      </div>
    );
  }

  // Find index and previous / next chapters
  const currentIndex = allChapters.findIndex((c) => c.slug === chapterSlug);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  // Related product
  const relatedProduct = getProductBySlug(chapter.relatedProductSlug || 'gentle-armor');

  return (
    <PageTransition className="pt-24 sm:pt-28 pb-24 sm:pb-32">
      {/* Top Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 border-b border-[#222222] mb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-mono text-[#A7A29B] uppercase tracking-wider">
            <Link to="/archive" className="hover:text-[#A88B65] transition-colors">
              Archive
            </Link>
            <span>/</span>
            <Link to={`/archive/${seriesSlug}`} className="hover:text-[#A88B65] transition-colors">
              {series ? series.title : seriesSlug}
            </Link>
            <span>/</span>
            <span className="text-[#F5F1EA]">Chapter {chapter.number}</span>
          </div>

          <span className="text-xs font-mono text-[#A88B65]">
            CH. 0{chapter.number} OF 0{allChapters.length}
          </span>
        </div>
      </div>

      <article className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Quick Chapter Chronicle Switcher */}
        <div className="mb-12 p-3 sm:p-4 bg-[#151515] border border-[#2B2B2B]">
          <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-[#A7A29B] uppercase tracking-wider">
            <span>SERIES 01 CHRONICLES</span>
            <span className="text-[#A88B65]">SELECT CHAPTER</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {allChapters.map((c) => {
              const isActive = c.slug === chapterSlug;
              return (
                <Link
                  key={c.id}
                  to={`/archive/${seriesSlug}/${c.slug}`}
                  className={`p-2 sm:p-2.5 text-center border text-xs font-mono transition-all duration-200 ${
                    isActive
                      ? 'bg-[#A88B65] text-black border-[#A88B65] font-bold shadow-md'
                      : 'bg-[#0A0A0A] text-[#A7A29B] border-[#262626] hover:text-[#F5F1EA] hover:border-[#A88B65]/40'
                  }`}
                >
                  <span className="block text-[9px] opacity-80">CH. 0{c.number}</span>
                  <span className="block font-serif text-xs sm:text-sm truncate">{c.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
        {/* Chapter Header */}
        <header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#151515] border border-[#333333] text-[11px] font-mono text-[#A88B65] uppercase tracking-widest mb-6"
          >
            <span>CHAPTER {chapter.number}</span>
            <span>•</span>
            <span>{chapter.theme || 'NARRATIVE'}</span>
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

        {/* 1. Full-Width Chapter Cover Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#151515] border border-[#2B2B2B] overflow-hidden mb-16 sm:mb-20"
        >
          <EditorialImage
            src={chapter.coverImage}
            alt={chapter.title}
            aspectRatio="aspect-full w-full h-full"
            overlay
          />
        </motion.div>

        {/* 2. Opening Quote */}
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

        {/* 3. Main Editorial Story */}
        <div className="max-w-3xl mx-auto space-y-8 text-base sm:text-lg text-[#F5F1EA] leading-relaxed font-light mb-16 sm:mb-24">
          {chapter.mainStory ? (
            chapter.mainStory.split('\n\n').map((paragraph, idx) => (
              <p
                key={idx}
                className={idx === 0 ? 'first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-[#A88B65]' : ''}
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p>Every story begins in quiet conviction.</p>
          )}
        </div>

        {/* 4. Large Photography Section */}
        {chapter.secondaryImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="my-16 sm:my-24 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          >
            <div className="md:col-span-8 overflow-hidden border border-[#2B2B2B]">
              <EditorialImage
                src={chapter.secondaryImage}
                alt={`${chapter.title} Visual Study`}
                aspectRatio="aspect-[16/10]"
                zoomOnHover
              />
            </div>
            <div className="md:col-span-4 p-6 bg-[#151515] border border-[#2B2B2B] space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#A88B65]">
                VISUAL ESSAY
              </span>
              <p className="font-serif text-xl text-[#F5F1EA] italic leading-snug">
                "Texture and silence. The silhouette mirrors internal equilibrium."
              </p>
              <p className="text-xs text-[#A7A29B] font-mono uppercase">
                QUIET BATTLES ATELIER ARCHIVE
              </p>
            </div>
          </motion.div>
        )}

        {/* 5. Supporting Story */}
        {chapter.supportingStory && (
          <div className="max-w-3xl mx-auto space-y-6 text-[#A7A29B] leading-relaxed text-base sm:text-lg font-light mb-20">
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F1EA]">
              THE ANATOMY OF RESILIENCE
            </h3>
            {chapter.supportingStory.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* 6. Brand Philosophy Section */}
        <div className="bg-[#151515] border border-[#2B2B2B] p-8 sm:p-12 mb-20 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest-2xl text-[#A88B65]">
            QUIET BATTLES CREED
          </span>
          <p className="font-serif text-2xl sm:text-3xl text-[#F5F1EA] italic">
            "We do not wear clothes to hide who we are. We wear armor to honor who we have become."
          </p>
        </div>

        {/* 7. Related Product */}
        {relatedProduct && (
          <div className="my-20 pt-16 border-t border-[#222222]">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs uppercase tracking-widest-xl text-[#A88B65] font-mono">
                COMPLEMENTARY ARMOR
              </span>
              <span className="text-xs text-[#A7A29B] font-mono uppercase">
                SERIES 01 ARTIFACT
              </span>
            </div>

            <div className="bg-[#151515] border border-[#2B2B2B] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-48 aspect-[3/4] bg-[#0A0A0A] flex-shrink-0 overflow-hidden border border-[#333333]">
                <img
                  src={relatedProduct.images[0]}
                  alt={relatedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-3 text-left">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#A88B65]">
                  {relatedProduct.collection}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F1EA]">
                  {relatedProduct.name}
                </h4>
                <p className="text-sm text-[#A7A29B] font-light max-w-xl">
                  {relatedProduct.description}
                </p>
                <div className="text-xl font-mono text-[#F5F1EA]">
                  {formatCurrency(relatedProduct.price)}
                </div>
              </div>

              <div className="w-full md:w-auto">
                <Link
                  to={`/products/${relatedProduct.slug}`}
                  className="inline-flex w-full md:w-auto px-8 py-3.5 bg-[#F5F1EA] text-[#0A0A0A] text-xs uppercase tracking-widest-xl font-semibold hover:bg-[#A88B65] hover:text-white transition-all duration-300 items-center justify-center gap-2"
                >
                  <span>VIEW PRODUCT</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 8. Previous & Next Chapter Navigation */}
        <nav className="mt-20 pt-12 border-t border-[#222222] grid grid-cols-1 sm:grid-cols-2 gap-6">
          {prevChapter ? (
            <Link
              to={`/archive/${seriesSlug}/${prevChapter.slug}`}
              className="p-6 bg-[#151515] border border-[#2B2B2B] hover:border-[#A88B65] transition-colors flex items-center gap-4 group"
            >
              <ChevronLeft size={24} className="text-[#A88B65] group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                  PREVIOUS CHAPTER
                </span>
                <span className="font-serif text-lg text-[#F5F1EA] group-hover:text-[#A88B65] transition-colors">
                  {prevChapter.title}
                </span>
              </div>
            </Link>
          ) : (
            <div className="p-6 border border-[#222222] opacity-40 flex items-center gap-4">
              <ChevronLeft size={24} />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest block">FIRST CHAPTER</span>
                <span className="font-serif text-lg">Inaugural Entry</span>
              </div>
            </div>
          )}

          {nextChapter ? (
            <Link
              to={`/archive/${seriesSlug}/${nextChapter.slug}`}
              className="p-6 bg-[#151515] border border-[#2B2B2B] hover:border-[#A88B65] transition-colors flex items-center justify-between text-right group"
            >
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                  NEXT CHAPTER
                </span>
                <span className="font-serif text-lg text-[#F5F1EA] group-hover:text-[#A88B65] transition-colors">
                  {nextChapter.title}
                </span>
              </div>
              <ChevronRight size={24} className="text-[#A88B65] group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <Link
              to={`/archive/${seriesSlug}`}
              className="p-6 bg-[#151515] border border-[#2B2B2B] hover:border-[#A88B65] transition-colors flex items-center justify-between text-right group"
            >
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                  COMPLETION
                </span>
                <span className="font-serif text-lg text-[#F5F1EA] group-hover:text-[#A88B65] transition-colors">
                  Return to Series Index
                </span>
              </div>
              <ChevronRight size={24} className="text-[#A88B65]" />
            </Link>
          )}
        </nav>
      </article>
    </PageTransition>
  );
};
export default ChapterDetail;
