import React from 'react';
import { motion } from 'framer-motion';

export const ArchiveHero = () => {
  return (
    <div className="mb-14 sm:mb-20 border-b border-[#222222] pb-12 sm:pb-16 text-left">
      {/* Category / Breadcrumb Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono mb-4"
      >
        <span>QUIET BATTLES™</span>
        <span className="w-4 h-[1px] bg-[#A88B65]/60" />
        <span>THE ARCHIVE</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F5F1EA] uppercase leading-none"
      >
        THE ARCHIVE
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-4 sm:mt-5 text-lg sm:text-2xl font-serif italic text-[#F5F1EA]/90 max-w-2xl"
      >
        "Stories collected. Battles remembered. Identity preserved."
      </motion.p>

      {/* Subtle Editorial Introduction */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-4 text-sm sm:text-base text-[#A7A29B] font-light max-w-2xl leading-relaxed"
      >
        "Every collection begins with a thought. Every chapter carries a story. This is where our stories live."
      </motion.p>
    </div>
  );
};
export default ArchiveHero;
