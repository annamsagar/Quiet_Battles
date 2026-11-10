import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeading = ({
  number,
  tag,
  title,
  subtitle,
  centered = false,
  className = '',
  light = false,
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {/* Category / Series Tag / Number */}
      {(tag || number) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`flex items-center gap-3 text-xs uppercase tracking-widest-xl font-medium mb-3 ${
            centered ? 'justify-center' : ''
          } text-[#A88B65]`}
        >
          {number && <span className="font-mono">{number}</span>}
          {number && tag && <span className="w-4 h-[1px] bg-[#A88B65]/60" />}
          {tag && <span>{tag}</span>}
        </motion.div>
      )}

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] ${
          light ? 'text-neutral-900' : 'text-[#F5F1EA]'
        }`}
      >
        {title}
      </motion.h2>

      {/* Subtitle / Quote / Description */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`mt-4 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-neutral-600' : 'text-[#A7A29B]'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

