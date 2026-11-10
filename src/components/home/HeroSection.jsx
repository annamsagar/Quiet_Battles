import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('brand-introduction');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[640px] flex items-end justify-start overflow-hidden bg-[#0A0A0A]">
      {/* Background Cinematic Image with Ken Burns / Slow Zoom Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1.03, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1920&auto=format&fit=crop"
            alt="QUIET BATTLES Editorial Campaign Model in Minimalist Dark Streetwear"
            className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-[1.12] animate-slow-zoom"
          />
        </motion.div>

        {/* Multi-layered Vignette & Dark Gradients for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/30 to-transparent" />
      </div>

      {/* Hero Content Aligned to Lower-Left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-2xl text-left space-y-4 sm:space-y-6">
          {/* Collection / Season Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono"
          >
            <span className="w-8 h-[1px] bg-[#A88B65]" />
            <span>AUTUMN / WINTER 2026</span>
          </motion.div>

          {/* Large Editorial Typography: Brand & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="space-y-2 sm:space-y-3"
          >
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#F5F1EA] tracking-wide uppercase leading-none">
              QUIET BATTLES<span className="text-xl sm:text-2xl text-[#A88B65] ml-1">™</span>
            </h1>
            <p className="font-sans text-base sm:text-xl md:text-2xl uppercase tracking-widest-xl text-[#F5F1EA] font-semibold">
              WEAR YOUR BATTLES.
            </p>
          </motion.div>

          {/* Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="text-sm sm:text-base md:text-lg text-[#A7A29B] font-light leading-relaxed max-w-lg"
          >
            "Every scar carries a story. Every silence holds a strength. Wear what made you."
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <Link
              to="/archive"
              className="px-8 py-4 bg-[#F5F1EA] text-[#0A0A0A] text-xs uppercase tracking-widest-xl font-semibold hover:bg-[#A88B65] hover:text-white transition-all duration-300 text-center flex items-center justify-center gap-2 group shadow-xl"
            >
              <span>EXPLORE THE ARCHIVE</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/products/gentle-armor"
              className="px-8 py-4 bg-black/40 backdrop-blur-sm border border-[#F5F1EA]/40 text-[#F5F1EA] text-xs uppercase tracking-widest-xl font-medium hover:border-[#A88B65] hover:text-[#A88B65] hover:bg-black/60 transition-all duration-300 text-center"
            >
              <span>DISCOVER THE COLLECTION</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Interactive Scroll Down Indicator */}
      <motion.button
        type="button"
        onClick={scrollToNextSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 right-8 sm:right-12 z-20 hidden md:flex flex-col items-center gap-2 text-neutral-400 hover:text-[#A88B65] transition-colors focus:outline-none group cursor-pointer"
        aria-label="Scroll to introduction"
      >
        <span className="text-[10px] uppercase tracking-widest-2xl font-mono text-[#A7A29B] group-hover:text-[#A88B65] transition-colors">
          SCROLL
        </span>
        <ArrowDown size={14} className="animate-bounce text-[#A88B65]" />
      </motion.button>
    </section>
  );
};
export default HeroSection;

