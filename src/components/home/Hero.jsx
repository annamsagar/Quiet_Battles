import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background Image with Cinematic Subtle Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1800&auto=format&fit=crop"
            alt="QUIET BATTLES Luxury Editorial"
            className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.1] scale-100 animate-slow-zoom"
          />
        </motion.div>

        {/* Cinematic Multi-Layer Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/70" />
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center">
        {/* Subtle Brand Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest-2xl text-[#A88B65] font-mono mb-4 sm:mb-6"
        >
          <span className="w-6 sm:w-10 h-[1px] bg-[#A88B65]" />
          <span>AUTUMN / WINTER 2026</span>
          <span className="w-6 sm:w-10 h-[1px] bg-[#A88B65]" />
        </motion.div>

        {/* Main Brand Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.12em] uppercase text-[#F5F1EA] drop-shadow-2xl leading-none"
        >
          QUIET BATTLES<span className="text-xl sm:text-3xl text-[#A88B65] ml-1">™</span>
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-4 sm:mt-6"
        >
          <span className="font-sans text-sm sm:text-lg md:text-xl uppercase tracking-widest-xl text-[#F5F1EA] font-semibold">
            WEAR YOUR BATTLES.
          </span>
        </motion.div>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#A7A29B] font-light max-w-xl mx-auto leading-relaxed"
        >
          "Every scar carries a story. Every silence holds a strength. Wear what made you."
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <Link
            to="/archive"
            className="w-full sm:w-auto px-8 py-4 bg-[#F5F1EA] text-[#0A0A0A] text-xs uppercase tracking-widest-xl font-semibold hover:bg-[#A88B65] hover:text-white transition-all duration-300 text-center flex items-center justify-center gap-2 group shadow-lg"
          >
            <span>EXPLORE THE ARCHIVE</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/products/gentle-armor"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#F5F1EA]/40 text-[#F5F1EA] text-xs uppercase tracking-widest-xl font-medium hover:border-[#A88B65] hover:text-[#A88B65] hover:bg-black/30 transition-all duration-300 text-center"
          >
            DISCOVER THE COLLECTION
          </Link>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Prompt Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-neutral-400"
      >
        <span className="text-[10px] uppercase tracking-widest-2xl font-mono text-[#A7A29B]">
          SCROLL
        </span>
        <ArrowDown size={14} className="animate-bounce text-[#A88B65]" />
      </motion.div>
    </section>
  );
};
