import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-28 sm:py-36 bg-[#111111] border-b border-[#222222] relative overflow-hidden">
      {/* Background Subtle Gradient Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,139,101,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-8">
        
        {/* Monogram Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-12 h-12 rounded-full border border-[#333333] bg-[#0A0A0A] mx-auto flex items-center justify-center text-[#A88B65] shadow-lg"
        >
          <Compass size={20} strokeWidth={1.5} />
        </motion.div>

        {/* Brand Tagline Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono block"
        >
          IN CONCLUSION
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F1EA] tracking-wide uppercase leading-tight"
        >
          WEAR WHAT MADE YOU.
        </motion.h2>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-xl text-[#A7A29B] font-light max-w-xl mx-auto leading-relaxed"
        >
          "Your battles are part of your story. Let them become part of your identity."
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/archive"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#222222] text-[#F5F1EA] hover:bg-[#333333] border border-[#333333] text-xs uppercase tracking-widest-xl font-semibold transition-all duration-300 group"
          >
            <span>EXPLORE THE ARCHIVE</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#F5F1EA] text-[#0A0A0A] text-xs uppercase tracking-widest-xl font-semibold hover:bg-[#A88B65] hover:text-white transition-all duration-300 shadow-2xl group"
          >
            <span>VISIT THE SHOP</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-8 text-[11px] font-mono uppercase tracking-widest text-neutral-500"
        >
          QUIET BATTLES™ • SERIES 01: THE GENTLE ARMOR™
        </motion.div>
      </div>
    </section>
  );
};
export default FinalCTA;

