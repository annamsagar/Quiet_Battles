import React from 'react';
import { motion } from 'framer-motion';
import { ChapterCard } from './ChapterCard';

export const ChapterGrid = ({ chapters = [], seriesSlug = 'series-01' }) => {
  return (
    <section className="py-16 sm:py-24 space-y-12">
      {/* Section Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222222] pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono block mb-2">
            COLLECTION CHRONICLES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F1EA]">
            FIVE STORIES. ONE JOURNEY.
          </h2>
        </div>
        <p className="text-xs text-[#A7A29B] font-mono uppercase">
          SELECT A CHAPTER TO ENTER THE STORY
        </p>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {chapters.map((chapter, index) => {
          // Asymmetric styling: give the first card a prominent double-column presence on wide screens if desired, or stylish offset
          const isFeatured = index === 0;
          return (
            <div
              key={chapter.id || chapter.slug}
              className={isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}
            >
              <ChapterCard
                chapter={chapter}
                seriesSlug={seriesSlug}
                index={index}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default ChapterGrid;

