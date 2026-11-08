import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EditorialImage } from '../common/EditorialImage';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';

export const SeriesFeatureCard = ({ series }) => {
  const currentSeries = series || {
    number: '01',
    title: 'THE GENTLE ARMOR™',
    slug: 'series-01',
    description: 'An exploration of resilience, softness and strength. Designed for those who carry more than they reveal.',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    chapterCount: 5,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-[#151515] border border-[#2B2B2B] hover:border-[#A88B65]/60 transition-all duration-500 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Large Cinematic Image Container with Zoom */}
        <Link
          to={`/archive/${currentSeries.slug || 'series-01'}`}
          className="lg:col-span-7 relative block aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto overflow-hidden bg-[#0A0A0A]"
          aria-label={`Explore Series ${currentSeries.number}`}
        >
          <EditorialImage
            src={currentSeries.coverImage}
            alt={currentSeries.title}
            aspectRatio="aspect-full w-full h-full min-h-[360px]"
            zoomOnHover
            overlay
          />
          <div className="absolute top-5 left-5 z-10 bg-[#0A0A0A]/85 backdrop-blur-md px-3.5 py-1.5 border border-[#333333] text-[10px] font-mono tracking-widest text-[#A88B65] uppercase flex items-center gap-1.5">
            <Sparkles size={12} />
            <span>INAUGURAL EDITION</span>
          </div>
        </Link>

        {/* Content Details */}
        <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A88B65]">
              <span>SERIES {currentSeries.number || '01'}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Layers size={13} />
                <span>{currentSeries.chapterCount || 5} CHAPTERS</span>
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F5F1EA] tracking-wide group-hover:text-[#A88B65] transition-colors">
              <Link to={`/archive/${currentSeries.slug || 'series-01'}`}>
                {currentSeries.title}
              </Link>
            </h2>

            <p className="text-sm sm:text-base text-[#A7A29B] font-light leading-relaxed">
              "{currentSeries.description}"
            </p>
          </div>

          <div className="pt-6 border-t border-[#222222]">
            <Link
              to={`/archive/${currentSeries.slug || 'series-01'}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#F5F1EA] text-[#0A0A0A] hover:bg-[#A88B65] hover:text-white text-xs uppercase tracking-widest-xl font-semibold transition-all duration-300 shadow-xl group/btn"
            >
              <span>EXPLORE SERIES</span>
              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default SeriesFeatureCard;
