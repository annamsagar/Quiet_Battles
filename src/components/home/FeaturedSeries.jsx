import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EditorialImage } from '../common/EditorialImage';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';

export const FeaturedSeries = ({ series }) => {
  const currentSeries = series || {
    id: 'series-01',
    number: '01',
    title: 'THE GENTLE ARMOR™',
    slug: 'series-01',
    description: 'An exploration of resilience, softness and strength. Designed for those who carry more than they reveal.',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    chapterCount: 5,
  };

  return (
    <section className="py-24 sm:py-32 bg-[#151515] border-b border-[#222222] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono block mb-3"
          >
            CURRENT EDITION / 2026
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F5F1EA] tracking-tight uppercase"
          >
            THE FIRST CHAPTER BEGINS.
          </motion.h2>
        </div>

        {/* Featured Hero Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#0A0A0A] border border-[#2B2B2B]">
          {/* Visual Column */}
          <div className="lg:col-span-7 relative group overflow-hidden">
            <EditorialImage
              src={currentSeries.coverImage}
              alt={currentSeries.title}
              aspectRatio="aspect-[16/10] lg:aspect-auto lg:h-full"
              className="w-full h-full min-h-[380px]"
              zoomOnHover
              overlay
            />
            <div className="absolute top-6 left-6 z-10 bg-[#0A0A0A]/80 backdrop-blur-md px-4 py-1.5 border border-[#333333] text-[11px] font-mono uppercase tracking-widest text-[#A88B65]">
              SERIES {currentSeries.number || '01'}
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest-xl text-[#A7A29B] font-mono">
                  COLLECTION INAUGURAL
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F5F1EA]">
                  {currentSeries.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#A7A29B] leading-relaxed font-light">
                {currentSeries.description}
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4 border-t border-[#222222]">
                <div className="flex items-center gap-2 text-xs text-[#A7A29B] font-mono uppercase">
                  <Layers size={14} className="text-[#A88B65]" />
                  <span>5 Narratives</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#A7A29B] font-mono uppercase">
                  <BookOpen size={14} className="text-[#A88B65]" />
                  <span>Heavyweight Wear</span>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <Link
                to={`/archive/${currentSeries.slug || 'series-01'}`}
                className="w-full py-4 px-8 bg-[#F5F1EA] text-[#0A0A0A] text-xs uppercase tracking-widest-xl font-semibold hover:bg-[#A88B65] hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>EXPLORE SERIES</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
