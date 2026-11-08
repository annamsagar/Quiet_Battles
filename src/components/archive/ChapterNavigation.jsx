import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

export const ChapterNavigation = ({
  prevChapter,
  nextChapter,
  seriesSlug = 'series-01',
  allChapters = [],
  currentChapterSlug,
}) => {
  return (
    <nav className="mt-20 pt-14 border-t border-[#222222] space-y-10">
      {/* Quick Chronicle Switcher Bar */}
      {allChapters.length > 0 && (
        <div className="p-4 bg-[#151515] border border-[#2B2B2B]">
          <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-[#A7A29B] uppercase tracking-wider">
            <span>SERIES 01 CHRONICLES</span>
            <span className="text-[#A88B65]">SELECT CHAPTER</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {allChapters.map((c) => {
              const isActive =
                c.slug === currentChapterSlug || c.aliases?.includes(currentChapterSlug);
              return (
                <Link
                  key={c.id || c.slug}
                  to={`/archive/${seriesSlug}/${c.slug}`}
                  className={`p-2.5 text-center border text-xs font-mono transition-all duration-200 ${
                    isActive
                      ? 'bg-[#A88B65] text-black border-[#A88B65] font-bold shadow-md'
                      : 'bg-[#0A0A0A] text-[#A7A29B] border-[#262626] hover:text-[#F5F1EA] hover:border-[#A88B65]/40'
                  }`}
                >
                  <span className="block text-[9px] opacity-80">CH. {c.number}</span>
                  <span className="block font-serif text-xs sm:text-sm truncate">{c.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Sequential Previous / Next Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {prevChapter ? (
          <Link
            to={`/archive/${seriesSlug}/${prevChapter.slug}`}
            className="p-6 bg-[#151515] border border-[#2B2B2B] hover:border-[#A88B65] transition-colors flex items-center gap-4 group"
          >
            <ChevronLeft
              size={24}
              className="text-[#A88B65] group-hover:-translate-x-1 transition-transform flex-shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                PREVIOUS CHAPTER
              </span>
              <span className="font-serif text-lg text-[#F5F1EA] group-hover:text-[#A88B65] transition-colors truncate block">
                CH. {prevChapter.number} – {prevChapter.title}
              </span>
            </div>
          </Link>
        ) : (
          <div className="p-6 border border-[#222222] opacity-40 flex items-center gap-4">
            <ChevronLeft size={24} className="flex-shrink-0" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest block">
                FIRST CHAPTER
              </span>
              <span className="font-serif text-lg">Inaugural Entry</span>
            </div>
          </div>
        )}

        {nextChapter ? (
          <Link
            to={`/archive/${seriesSlug}/${nextChapter.slug}`}
            className="p-6 bg-[#151515] border border-[#2B2B2B] hover:border-[#A88B65] transition-colors flex items-center justify-between text-right group"
          >
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                NEXT CHAPTER
              </span>
              <span className="font-serif text-lg text-[#F5F1EA] group-hover:text-[#A88B65] transition-colors truncate block">
                CH. {nextChapter.number} – {nextChapter.title}
              </span>
            </div>
            <ChevronRight
              size={24}
              className="text-[#A88B65] group-hover:translate-x-1 transition-transform flex-shrink-0 ml-4"
            />
          </Link>
        ) : (
          <Link
            to={`/archive/${seriesSlug}`}
            className="p-6 bg-[#151515] border border-[#2B2B2B] hover:border-[#A88B65] transition-colors flex items-center justify-between text-right group"
          >
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                CHRONICLE COMPLETE
              </span>
              <span className="font-serif text-lg text-[#F5F1EA] group-hover:text-[#A88B65] transition-colors">
                Return to Series Overview
              </span>
            </div>
            <ChevronRight size={24} className="text-[#A88B65] flex-shrink-0 ml-4" />
          </Link>
        )}
      </div>

      {/* Return to Archive Link */}
      <div className="text-center pt-4">
        <Link
          to={`/archive/${seriesSlug}`}
          className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-[#A7A29B] hover:text-[#A88B65] transition-colors"
        >
          <ArrowLeft size={13} />
          <span>RETURN TO SERIES 01 OVERVIEW</span>
        </Link>
      </div>
    </nav>
  );
};
export default ChapterNavigation;

