import React from 'react';
import { motion } from 'framer-motion';

export const EditorialSection = () => {
  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[620px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0A0A0A] border-b border-[#222222]">
      {/* Full-Width Artistic Fashion Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1.01 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=2000&auto=format&fit=crop"
            alt="Artistic Dark Editorial Fashion Portrait"
            className="w-full h-full object-cover object-center filter brightness-[0.52] contrast-[1.15]"
            loading="lazy"
          />
        </motion.div>

        {/* Subtle Dark Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/45 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px]" />
      </div>

      {/* Elegant Serif Overlay Text */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono mb-6 sm:mb-8"
        >
          EDITORIAL STATEMENT / 2026
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#F5F1EA] tracking-wide uppercase leading-[1.15] drop-shadow-2xl"
        >
          "NOT EVERY BATTLE<br />
          NEEDS AN AUDIENCE."
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="w-20 h-[1px] bg-[#A88B65] mx-auto mt-8 sm:mt-10"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xs uppercase tracking-widest-xl text-[#A7A29B] font-mono mt-4"
        >
          QUIET BATTLES ATELIER
        </motion.p>
      </div>
    </section>
  );
};
export default EditorialSection;
