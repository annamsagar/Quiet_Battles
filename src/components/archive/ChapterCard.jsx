import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EditorialImage } from '../common/EditorialImage';
import { ArrowRight } from 'lucide-react';

export const ChapterCard = ({ chapter, seriesSlug = 'series-01', index = 0 }) => {
  const targetSlug = chapter.slug || `chapter-0${chapter.number}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="group bg-[#151515] border border-[#2B2B2B] hover:border-[#A88B65]/60 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl"
    >
      <div>
        {/* Editorial Cover Image */}
        <Link
          to={`/archive/${seriesSlug}/${targetSlug}`}
          className="relative block aspect-[4/3] overflow-hidden bg-[#0A0A0A]"
          aria-label={`Read Chapter ${chapter.number}: ${chapter.title}`}
        >
          <EditorialImage
            src={chapter.coverImage}
            alt={chapter.title}
            aspectRatio="aspect-full w-full h-full"
            zoomOnHover
            overlay
          />

          <div className="absolute top-4 left-4 z-10 bg-[#0A0A0A]/85 backdrop-blur-md px-3 py-1 border border-[#333333] text-[10px] font-mono tracking-widest text-[#A88B65] uppercase">
            CHAPTER {chapter.number || `0${index + 1}`}
          </div>
        </Link>

        {/* Content Details */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#A88B65]">
            {chapter.theme || 'NARRATIVE ENTRY'}
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F1EA] group-hover:text-[#A88B65] transition-colors duration-300">
            <Link to={`/archive/${seriesSlug}/${targetSlug}`}>
              {chapter.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-[#A7A29B] font-light leading-relaxed line-clamp-3">
            "{chapter.shortDescription || chapter.theme}"
          </p>
        </div>
      </div>

      {/* Footer / EXPLORE CHAPTER Button */}
      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-4 border-t border-[#222222] flex items-center justify-between">
        <Link
          to={`/archive/${seriesSlug}/${targetSlug}`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest-xl text-[#F5F1EA] group-hover:text-[#A88B65] font-semibold transition-colors"
        >
          <span>EXPLORE CHAPTER</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        <span className="font-mono text-[10px] text-neutral-500">
          0{chapter.number || index + 1} / 05
        </span>
      </div>
    </motion.div>
  );
};
export default ChapterCard;
