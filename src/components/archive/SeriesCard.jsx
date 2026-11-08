import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EditorialImage } from '../common/EditorialImage';
import { ArrowRight, Layers, Calendar } from 'lucide-react';

export const SeriesCard = ({ series, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-[#151515] border border-[#2B2B2B] hover:border-[#A88B65]/60 transition-all duration-500 overflow-hidden flex flex-col"
    >
      {/* Cover Image Container with Zoom Effect */}
      <Link
        to={`/archive/${series.slug}`}
        className="relative block overflow-hidden aspect-[16/10] sm:aspect-[16/9]"
        aria-label={`View ${series.title}`}
      >
        <EditorialImage
          src={series.coverImage}
          alt={series.title}
          aspectRatio="aspect-full h-full w-full"
          zoomOnHover
          overlay
        />
        {/* Series Badge */}
        <div className="absolute top-4 left-4 z-10 bg-[#0A0A0A]/85 backdrop-blur-md px-3.5 py-1.5 border border-[#333333] text-[11px] font-mono tracking-widest text-[#A88B65] uppercase">
          SERIES {series.number}
        </div>

        {series.status === 'draft' && (
          <div className="absolute top-4 right-4 z-10 bg-[#222222]/90 backdrop-blur-md px-3 py-1 border border-amber-500/40 text-[10px] font-mono tracking-widest text-amber-400 uppercase">
            UPCOMING RELEASE
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-8 sm:p-10 flex flex-col justify-between flex-1">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono text-[#A7A29B] uppercase">
            <span className="flex items-center gap-1.5">
              <Layers size={13} className="text-[#A88B65]" />
              {series.chapterCount || 5} CHAPTERS
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#A88B65]" />
              {series.releaseYear || '2026'}
            </span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#F5F1EA] group-hover:text-[#A88B65] transition-colors duration-300">
            <Link to={`/archive/${series.slug}`}>
              {series.fullTitle || series.title}
            </Link>
          </h3>

          <p className="text-sm sm:text-base text-[#A7A29B] font-light leading-relaxed">
            {series.description}
          </p>
        </div>

        <div className="pt-8 mt-6 border-t border-[#222222] flex items-center justify-between">
          <Link
            to={`/archive/${series.slug}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest-xl text-[#F5F1EA] group-hover:text-[#A88B65] font-medium transition-colors"
          >
            <span>EXPLORE SERIES</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>

          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            EDITION {series.number}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

