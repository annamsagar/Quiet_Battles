import React from 'react';
import { motion } from 'framer-motion';

export const BrandStatement = () => {
  return (
    <section className="py-28 sm:py-40 bg-[#0A0A0A] relative overflow-hidden border-b border-[#222222]">
      {/* Subtle Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,139,101,0.06)_0,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono mb-6"
        >
          AN UNCOMPROMISING DECLARATION
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light text-[#F5F1EA] tracking-tight uppercase leading-[0.95]">
            YOUR STORY.
          </div>
          <div className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light text-[#A88B65] tracking-tight uppercase leading-[0.95]">
            YOUR STRENGTH.
          </div>
          <div className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light text-[#F5F1EA] tracking-tight uppercase leading-[0.95]">
            YOUR ARMOR.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 sm:mt-16 max-w-lg mx-auto"
        >
          <div className="w-16 h-[1px] bg-[#A88B65] mx-auto mb-6" />
          <p className="text-xs sm:text-sm uppercase tracking-widest-xl text-[#A7A29B] font-mono">
            QUIET BATTLES™ • CRAFTED FOR THE UNSEEN
          </p>
        </motion.div>
      </div>
    </section>
  );
};
export default BrandStatement;

